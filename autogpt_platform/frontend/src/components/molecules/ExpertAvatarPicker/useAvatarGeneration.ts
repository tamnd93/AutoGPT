import {
  useGenerateExpertAvatar,
  useGetExpertAvatarGeneration,
} from "@/app/api/__generated__/endpoints/experts/experts";
import type { ExpertAvatarRequest } from "@/app/api/__generated__/models/expertAvatarRequest";
import { useLocale } from "@/lib/i18n";
import { getMessage } from "@/lib/i18n/translate";
import { useRef, useState } from "react";

export function useAvatarGeneration() {
  const locale = useLocale();
  const [jobID, setJobID] = useState("");
  const requestVersion = useRef(0);
  const mutation = useGenerateExpertAvatar<Error>({
    mutation: { retry: false },
  });
  const query = useGetExpertAvatarGeneration(jobID, {
    query: {
      enabled: Boolean(jobID),
      retry: false,
      refetchInterval: (query) => {
        if (query.state.error) return false;
        const response = query.state.data;
        return !response ||
          (response.status === 200 && response.data.status === "pending")
          ? 2000
          : false;
      },
    },
  });
  const job = query.data?.status === 200 ? query.data.data : undefined;
  const isGenerating =
    mutation.isPending ||
    Boolean(jobID && !query.isError && (!job || job.status === "pending"));
  const error =
    mutation.error?.message ??
    (query.isError
      ? getMessage(locale, "shared6.avatar.generationFailed")
      : job?.error);

  function generate(request: ExpertAvatarRequest) {
    const version = ++requestVersion.current;
    setJobID("");
    mutation.mutate(
      { data: request },
      {
        onSuccess: (response) => {
          if (
            version === requestVersion.current &&
            response.status === 202 &&
            response.data.id
          )
            setJobID(response.data.id);
        },
      },
    );
  }

  function reset() {
    requestVersion.current += 1;
    setJobID("");
    mutation.reset();
  }

  return { generate, reset, isGenerating, error, job };
}
