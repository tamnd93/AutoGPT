"use client";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { Text } from "@/components/atoms/Text/Text";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { getPostLogoutPath } from "@/lib/auth/account-banned";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import { useT } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const LOGOUT_REDIRECT_DELAY_MS = 400;

function wait(ms: number): Promise<void> {
  return new Promise(function resolveAfterDelay(resolve) {
    setTimeout(resolve, ms);
  });
}

export default function LogoutPage() {
  const t = useT();
  const { logOut } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const hasStartedRef = useRef(false);

  useEffect(
    function handleLogoutEffect() {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      async function runLogout() {
        try {
          await logOut();
        } catch {
          toast({
            title: t("auth1.logout.failed"),
            variant: "destructive",
          });
        } finally {
          await wait(LOGOUT_REDIRECT_DELAY_MS);
          router.replace(getPostLogoutPath(window.location.search));
        }
      }

      void runLogout();
    },
    [logOut, router, toast],
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <LoadingSpinner size="large" />
        <Text variant="body" className="text-center">
          {t("auth1.logout.loggingOut")}
        </Text>
      </div>
    </div>
  );
}
