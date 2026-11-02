import { toastIfPlanRequired } from "@/components/contextual/PaywallToast/helpers";
import * as Sentry from "@sentry/nextjs";
import {
  getGetV2ListMySubmissionsQueryKey,
  usePutV2EditStoreSubmission,
} from "@/app/api/__generated__/endpoints/store/store";
import { StoreSubmission } from "@/app/api/__generated__/models/storeSubmission";
import { StoreSubmissionEditRequest } from "@/app/api/__generated__/models/storeSubmissionEditRequest";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useStoreCategories } from "@/hooks/useStoreCategories";
import { validateYouTubeUrl } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { SUB_HEADING_MAX } from "../../PublishAgentModal/components/AgentInfoStep/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface useEditAgentFormProps {
  submission: StoreSubmissionEditRequest & {
    store_listing_version_id: string | undefined;
    graph_id: string;
  };
  onSuccess: (submission: StoreSubmission) => void;
  onClose: () => void;
}

export const useEditAgentForm = ({
  submission,
  onSuccess,
  onClose,
}: useEditAgentFormProps) => {
  const t = useT();
  const editAgentSchema = z.object({
    title: z
      .string()
      .min(1, t("marketplace3.zod.titleRequired"))
      .max(100, t("marketplace3.zod.titleTooLong")),
    subheader: z
      .string()
      .trim()
      .min(1, t("marketplace3.zod.taglineRequired"))
      .max(
        SUB_HEADING_MAX,
        t("marketplace3.zod.taglineTooLong", { max: SUB_HEADING_MAX }),
      ),
    youtubeLink: z
      .string()
      .refine(validateYouTubeUrl, t("marketplace3.zod.youtubeInvalid")),
    category: z.string().min(1, t("marketplace3.zod.categoryRequired")),
    description: z
      .string()
      .min(1, t("marketplace3.zod.descriptionRequired"))
      .max(1000, t("marketplace3.zod.descriptionTooLong")),
    changes_summary: z
      .string()
      .min(1, t("marketplace3.zod.changesRequired"))
      .max(500, t("marketplace3.zod.changesTooLong")),
    agentOutputDemo: z
      .string()
      .refine(validateYouTubeUrl, t("marketplace3.zod.youtubeInvalid")),
  });

  type EditAgentFormData = z.infer<typeof editAgentSchema>;

  const [images, setImages] = React.useState<string[]>(
    Array.from(new Set(submission.image_urls || [])), // Remove duplicates
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { mutateAsync: editSubmission } = usePutV2EditStoreSubmission();

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    categories,
    isUnavailable: categoriesUnavailable,
    placeholder: categoryPlaceholder,
  } = useStoreCategories();

  const form = useForm<EditAgentFormData>({
    resolver: zodResolver(editAgentSchema),
    defaultValues: {
      title: submission.name,
      subheader: submission.sub_heading,
      youtubeLink: submission.video_url || "",
      category: submission.categories?.[0] || "",
      description: submission.description,
      changes_summary: submission.changes_summary || "",
      agentOutputDemo: submission.agent_output_demo_url || "",
    },
  });

  const categoryOptions = categories.map((category) => ({
    value: category.value,
    label: category.label,
  }));

  const handleImagesChange = React.useCallback((newImages: string[]) => {
    setImages(newImages);
  }, []);

  async function handleFormSubmit(data: EditAgentFormData) {
    // Validate that at least one image is present
    if (images.length === 0) {
      form.setError("root", {
        type: "manual",
        message: t("marketplace3.edit.imageRequired"),
      });
      return;
    }

    const filteredCategories = [data.category].filter(Boolean);
    setIsSubmitting(true);

    try {
      const response = await editSubmission({
        storeListingVersionId: submission.store_listing_version_id!,
        data: {
          name: data.title,
          sub_heading: data.subheader,
          description: data.description,
          image_urls: images,
          video_url: data.youtubeLink || "",
          agent_output_demo_url: data.agentOutputDemo || "",
          categories: filteredCategories,
          changes_summary: data.changes_summary,
        },
      });

      // Extract the StoreSubmission from the response
      if (response.status === 200 && response.data) {
        toast({
          title: t("marketplace3.edit.updatedTitle"),
          description: t("marketplace3.edit.updatedBody"),
          duration: 3000,
          variant: "default",
        });

        queryClient.invalidateQueries({
          queryKey: getGetV2ListMySubmissionsQueryKey(),
        });

        // Call onSuccess and explicitly close the modal
        onSuccess(response.data);
        onClose();
      } else {
        throw new Error(t("marketplace3.edit.failedUpdate"));
      }
    } catch (error) {
      if (toastIfPlanRequired(error, t("marketplace3.publish.planPublishing")))
        return;
      Sentry.captureException(error);
      toast({
        title: t("marketplace3.edit.errorTitle"),
        description: t("marketplace3.edit.errorBody"),
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    images,
    isSubmitting,
    handleFormSubmit,
    handleImagesChange,
    categoryOptions,
    categoriesUnavailable,
    categoryPlaceholder,
  };
};
