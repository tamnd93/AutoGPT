import { toastIfPlanRequired } from "@/components/contextual/PaywallToast/helpers";
import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { postV2CreateStoreSubmission } from "@/app/api/__generated__/endpoints/store/store";
import { okData } from "@/app/api/helpers";
import * as Sentry from "@sentry/nextjs";
import { useT } from "@/lib/i18n";
import {
  PublishAgentFormData,
  PublishAgentInfoInitialData,
  publishAgentSchemaFactory,
} from "./helpers";

export interface Props {
  onBack: () => void;
  onSuccess: (submissionData: any) => void;
  selectedAgentId: string | null;
  selectedAgentVersion: number | null;
  initialData?: PublishAgentInfoInitialData;
  isMarketplaceUpdate?: boolean;
}

export function useAgentInfoStep({
  onBack: _onBack,
  onSuccess,
  selectedAgentId,
  selectedAgentVersion,
  initialData,
  isMarketplaceUpdate = false,
}: Props) {
  const [agentId, setAgentId] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const t = useT();

  const form = useForm<PublishAgentFormData>({
    resolver: zodResolver(publishAgentSchemaFactory(isMarketplaceUpdate, t)),
    defaultValues: {
      changesSummary: "",
      title: "",
      subheader: "",
      slug: "",
      youtubeLink: "",
      category: "",
      description: "",
      recommendedScheduleCron: "",
      instructions: "",
      agentOutputDemo: "",
    },
  });

  useEffect(() => {
    if (initialData?.agent_id) {
      setAgentId(initialData.agent_id);
      setImages(
        Array.from(
          new Set([
            ...(initialData?.thumbnailSrc ? [initialData.thumbnailSrc] : []),
            ...(initialData.additionalImages || []),
          ]),
        ),
      );
      form.reset({
        changesSummary: isMarketplaceUpdate
          ? ""
          : initialData.changesSummary || "",
        title: initialData.title,
        subheader: initialData.subheader,
        slug: initialData.slug.toLocaleLowerCase().trim(),
        youtubeLink: initialData.youtubeLink,
        category: initialData.category,
        description: isMarketplaceUpdate ? "" : initialData.description,
        recommendedScheduleCron: initialData.recommendedScheduleCron || "",
        instructions: initialData.instructions || "",
        agentOutputDemo: initialData.agentOutputDemo || "",
      });
    }
  }, [initialData, form]);

  // Ensure agentId is set from selectedAgentId if initialData doesn't have it
  useEffect(() => {
    if (selectedAgentId && !agentId) {
      setAgentId(selectedAgentId);
    }
  }, [selectedAgentId, agentId]);

  const handleImagesChange = useCallback(
    (newImages: string[]) => {
      setImages(newImages);
      if (newImages.length > 0) {
        form.clearErrors("root");
      }
    },
    [form],
  );

  async function handleFormSubmit(data: PublishAgentFormData) {
    // Validate that at least one image is present
    if (images.length === 0) {
      form.setError("root", {
        type: "manual",
        message: t("marketplace3.edit.imageRequired"),
      });
      return;
    }

    // Validate that an agent is selected before submission
    if (!selectedAgentId || !selectedAgentVersion) {
      toast({
        title: t("marketplace3.publish.selectionRequiredTitle"),
        description: t("marketplace3.publish.selectionRequiredBody"),
        variant: "destructive",
      });
      return;
    }

    const filteredCategories = [data.category].filter(Boolean);

    setIsSubmitting(true);

    try {
      const response = okData(
        await postV2CreateStoreSubmission({
          slug: (data.slug || "").replace(/\s+/g, "-"),
          graph_id: selectedAgentId,
          graph_version: selectedAgentVersion,
          name: data.title || "",
          sub_heading: data.subheader || "",
          description: data.description,
          instructions: data.instructions || undefined,
          categories: filteredCategories,
          image_urls: images,
          video_url: data.youtubeLink || undefined,
          agent_output_demo_url: data.agentOutputDemo || undefined,
          recommended_schedule_cron: data.recommendedScheduleCron || undefined,
          changes_summary: data.changesSummary || undefined,
        }),
      );

      onSuccess(response);
    } catch (error) {
      if (toastIfPlanRequired(error, t("marketplace3.publish.planPublishing")))
        return;
      Sentry.captureException(error);
      toast({
        title: t("marketplace3.publish.submitErrorTitle"),
        description:
          (error instanceof Error ? error.message : undefined) ||
          t("marketplace3.publish.submitErrorBody"),
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    agentId,
    images,
    isSubmitting,
    initialImages: images,
    initialSelectedImage: initialData?.thumbnailSrc || null,
    handleImagesChange,
    handleSubmit: form.handleSubmit(handleFormSubmit),
  };
}
