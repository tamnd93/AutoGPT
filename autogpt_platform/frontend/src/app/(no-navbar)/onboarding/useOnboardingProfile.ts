import { postV1SubmitOnboardingProfile } from "@/app/api/__generated__/endpoints/onboarding/onboarding";
import type { User } from "@/lib/auth/types";
import { useT } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { accountDisplayName, normalizeOnboardingProfile } from "./helpers";
import { useOnboardingWizardStore } from "./store";

export function useOnboardingProfile({
  user,
  enabled,
}: {
  user: User | null;
  enabled: boolean;
}) {
  const t = useT();
  const saveError = t("onboarding3.profile.saveFailed");
  const userID = user?.id ?? null;
  const activeUserID = useRef(userID);
  activeUserID.current = userID;
  const submission = useRef<{
    key: string;
    abort: AbortController;
    promise: Promise<void>;
  } | null>(null);
  const [failure, setFailure] = useState<{
    userID: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    return () => {
      submission.current?.abort.abort();
      submission.current = null;
    };
  }, [userID]);

  useEffect(() => {
    if (enabled && accountDisplayName(user))
      void ensureSaved().catch(() => undefined);
  }, [enabled, user]);

  async function ensureSaved() {
    if (
      !enabled ||
      !userID ||
      activeUserID.current !== userID ||
      useOnboardingWizardStore.getState().userID !== userID
    ) {
      throw new Error("Your account changed. Please reload onboarding.");
    }
    const { role, painPoints } = normalizeOnboardingProfile(
      useOnboardingWizardStore.getState(),
    );
    const userName = accountDisplayName(user);
    if (!role.trim() || !userName) {
      setFailure({ userID, message: saveError });
      throw new Error(saveError);
    }
    const profile = {
      user_name: userName,
      user_role: role,
      pain_points: painPoints,
    };
    const key = JSON.stringify({ userID, profile });
    if (submission.current?.key === key) return submission.current.promise;
    submission.current?.abort.abort();
    const abort = new AbortController();
    setFailure(null);
    function isCurrent() {
      return (
        submission.current?.abort === abort &&
        !abort.signal.aborted &&
        activeUserID.current === userID &&
        useOnboardingWizardStore.getState().userID === userID
      );
    }
    async function save() {
      const result = await postV1SubmitOnboardingProfile(profile, {
        signal: abort.signal,
      });
      if (!isCurrent()) throw new Error("Your account changed.");
      if (result.status !== 200) throw new Error(saveError);
    }
    const promise = save().catch((error: unknown) => {
      if (isCurrent()) {
        submission.current = null;
        setFailure({ userID, message: saveError });
      }
      throw error;
    });
    submission.current = { key, abort, promise };
    return promise;
  }

  return {
    ensureSaved,
    error: failure?.userID === userID ? failure.message : null,
  };
}
