"use client";

import { FormProvider } from "react-hook-form";
import * as React from "react";
import { StoreSubmission } from "@/app/api/__generated__/models/storeSubmission";
import { StoreSubmissionEditRequest } from "@/app/api/__generated__/models/storeSubmissionEditRequest";
import { FormField } from "@/components/molecules/Form/Form";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Select } from "@/components/atoms/Select/Select";
import { Text } from "@/components/atoms/Text/Text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/molecules/Accordion/Accordion";

import { CharCountedTextarea } from "../../PublishAgentModal/components/AgentInfoStep/components/CharCountedTextarea";
import { ThumbnailImages } from "../../PublishAgentModal/components/AgentInfoStep/components/ThumbnailImages";
import { SUB_HEADING_MAX } from "../../PublishAgentModal/components/AgentInfoStep/helpers";

import { useEditAgentForm } from "./useEditAgentForm";
import {
  Album01Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  SparklesIcon,
  Store01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

const DESCRIPTION_MAX = 1000;
const CHANGES_SUMMARY_MAX = 500;

interface EditAgentFormProps {
  submission: StoreSubmissionEditRequest & {
    store_listing_version_id: string | undefined;
    graph_id: string;
  };
  onClose: () => void;
  onSuccess: (submission: StoreSubmission) => void;
}

export function EditAgentForm({
  submission,
  onClose,
  onSuccess,
}: EditAgentFormProps) {
  const t = useT();
  const {
    form,
    images,
    categoryOptions,
    categoriesUnavailable,
    categoryPlaceholder,
    isSubmitting,
    handleFormSubmit,
    handleImagesChange,
  } = useEditAgentForm({ submission, onSuccess, onClose });

  const [openAccordion, setOpenAccordion] = React.useState("basics");

  const watched = form.watch();
  const errors = form.formState.errors;

  const basicsHasError = !!(
    errors.title ||
    errors.subheader ||
    errors.category
  );
  const experienceHasError = !!(
    errors.description ||
    errors.youtubeLink ||
    errors.agentOutputDemo
  );
  const thumbnailsHasError = !!errors.root;

  const basicsComplete =
    !basicsHasError &&
    !!watched.title &&
    !!watched.subheader &&
    !!watched.category;
  const experienceComplete = !experienceHasError && !!watched.description;
  const thumbnailsComplete = !thumbnailsHasError && images.length > 0;

  const isSubmitDisabled =
    Object.keys(form.formState.errors).length > 0 || isSubmitting;

  return (
    <div className="mx-auto flex w-full flex-col">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-5 pb-5"
        >
          <section className="rounded-[18px] border border-warning-border bg-warning-surface p-4">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-warning-foreground shadow-[0_1px_2px_rgba(15,15,20,0.04)]">
                <Icon icon={InformationCircleIcon} size={18} />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <Text
                  // TODO(tokens): no exact role for text-amber-950 #451a03
                  variant="body-medium"
                  as="h3"
                  className="text-amber-950"
                >
                  {t("marketplace3.edit.updateNote")}
                </Text>
                <Text
                  // TODO(tokens): no exact role for text-amber-800 #92400e
                  variant="small"
                  className="text-amber-800"
                >
                  {t("marketplace3.edit.updateNoteBody")}
                </Text>
              </div>
            </div>
            <FormField
              control={form.control}
              name="changes_summary"
              render={({ field }) => (
                <CharCountedTextarea
                  max={CHANGES_SUMMARY_MAX}
                  value={field.value ?? ""}
                >
                  <Input
                    id={field.name}
                    labelVariant="body"
                    label={t("marketplace3.edit.whatChanged")}
                    labelTooltip={t("marketplace3.edit.whatChangedTooltip")}
                    type="textarea"
                    rows={1}
                    placeholder={t("marketplace3.edit.whatChangedPlaceholder")}
                    error={form.formState.errors.changes_summary?.message}
                    required
                    wrapperClassName="!mb-0"
                    {...field}
                  />
                </CharCountedTextarea>
              )}
            />
          </section>

          <Accordion
            type="single"
            collapsible
            value={openAccordion}
            onValueChange={setOpenAccordion}
            className="overflow-hidden rounded-[14px] border border-border-base bg-surface shadow-[0_1px_2px_rgba(15,15,20,0.04)] [&>*+*]:border-t [&>*+*]:border-border-base"
          >
            <AccordionItem value="basics" className="border-0 px-4">
              <AccordionTrigger className="hover:no-underline">
                <Text
                  variant="body-medium-tight"
                  as="span"
                  className="flex items-center gap-2 text-textBlack"
                >
                  <Icon
                    icon={Store01Icon}
                    size={18}
                    className="text-foreground-tertiary"
                  />
                  {t("marketplace3.edit.listingBasics")}
                  {basicsHasError ? (
                    <Icon
                      icon={AlertCircleIcon}
                      size={16}
                      // TODO(tokens): no exact role for text-rose-500 #f43f5e
                      className="text-rose-500"
                    />
                  ) : basicsComplete ? (
                    <Icon
                      icon={CheckmarkCircle02Icon}
                      size={16}
                      className="text-brand"
                    />
                  ) : null}
                </Text>
              </AccordionTrigger>
              <AccordionContent className="px-1 pb-4 pt-0">
                <div className="grid gap-x-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <Input
                        id={field.name}
                        labelVariant="body"
                        label={t("marketplace3.edit.titleLabel")}
                        labelTooltip={t("marketplace3.edit.titleTooltip")}
                        type="text"
                        placeholder={t("marketplace3.edit.titlePlaceholder")}
                        error={form.formState.errors.title?.message}
                        {...field}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subheader"
                    render={({ field }) => (
                      <CharCountedTextarea
                        max={SUB_HEADING_MAX}
                        value={field.value ?? ""}
                      >
                        <Input
                          id={field.name}
                          labelVariant="body"
                          label={t("marketplace3.edit.tagline")}
                          labelTooltip={t("marketplace3.edit.taglineTooltip")}
                          type="text"
                          placeholder={t(
                            "marketplace3.edit.taglinePlaceholder",
                          )}
                          error={form.formState.errors.subheader?.message}
                          required
                          {...field}
                        />
                      </CharCountedTextarea>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      id={field.name}
                      labelVariant="body"
                      label={t("marketplace3.edit.category")}
                      labelTooltip={t("marketplace3.edit.categoryTooltip")}
                      placeholder={categoryPlaceholder}
                      disabled={categoriesUnavailable}
                      value={field.value}
                      onValueChange={field.onChange}
                      error={form.formState.errors.category?.message}
                      options={categoryOptions}
                    />
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="thumbnails" className="border-0 px-4">
              <AccordionTrigger className="hover:no-underline">
                <Text
                  variant="body-medium-tight"
                  as="span"
                  className="flex items-center gap-2 text-textBlack"
                >
                  <Icon
                    icon={Album01Icon}
                    size={18}
                    className="text-foreground-tertiary"
                  />
                  {t("marketplace3.edit.thumbnails")}
                  {thumbnailsHasError ? (
                    <Icon
                      icon={AlertCircleIcon}
                      size={16}
                      // TODO(tokens): no exact role for text-rose-500 #f43f5e
                      className="text-rose-500"
                    />
                  ) : thumbnailsComplete ? (
                    <Icon
                      icon={CheckmarkCircle02Icon}
                      size={16}
                      className="text-brand"
                    />
                  ) : null}
                </Text>
              </AccordionTrigger>
              <AccordionContent className="px-1 pb-4 pt-0">
                <ThumbnailImages
                  agentId={submission.graph_id}
                  onImagesChange={handleImagesChange}
                  initialImages={Array.from(
                    new Set(submission.image_urls || []),
                  )}
                  initialSelectedImage={submission.image_urls?.[0] || null}
                  errorMessage={form.formState.errors.root?.message}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience" className="border-0 px-4">
              <AccordionTrigger className="hover:no-underline">
                <Text
                  variant="body-medium-tight"
                  as="span"
                  className="flex items-center gap-2 text-textBlack"
                >
                  <Icon
                    icon={SparklesIcon}
                    size={18}
                    className="text-foreground-tertiary"
                  />
                  {t("marketplace3.edit.experience")}
                  {experienceHasError ? (
                    <Icon
                      icon={AlertCircleIcon}
                      size={16}
                      // TODO(tokens): no exact role for text-rose-500 #f43f5e
                      className="text-rose-500"
                    />
                  ) : experienceComplete ? (
                    <Icon
                      icon={CheckmarkCircle02Icon}
                      size={16}
                      className="text-brand"
                    />
                  ) : null}
                </Text>
              </AccordionTrigger>
              <AccordionContent className="px-1 pb-4 pt-0">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <CharCountedTextarea
                      max={DESCRIPTION_MAX}
                      value={field.value ?? ""}
                    >
                      <Input
                        id={field.name}
                        labelVariant="body"
                        label={t("marketplace3.edit.description")}
                        labelTooltip={t("marketplace3.edit.descriptionTooltip")}
                        type="textarea"
                        rows={2}
                        placeholder={t(
                          "marketplace3.edit.descriptionPlaceholder",
                        )}
                        error={form.formState.errors.description?.message}
                        {...field}
                      />
                    </CharCountedTextarea>
                  )}
                />

                <div className="grid gap-x-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="youtubeLink"
                    render={({ field }) => (
                      <Input
                        id={field.name}
                        labelVariant="body"
                        label={t("marketplace3.edit.youtube")}
                        labelTooltip={t("marketplace3.edit.youtubeTooltip")}
                        type="url"
                        placeholder={t("marketplace3.edit.youtubePlaceholder")}
                        error={form.formState.errors.youtubeLink?.message}
                        {...field}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agentOutputDemo"
                    render={({ field }) => (
                      <Input
                        id={field.name}
                        labelVariant="body"
                        label={t("marketplace3.edit.outputDemo")}
                        labelTooltip={t("marketplace3.edit.outputDemoTooltip")}
                        type="url"
                        placeholder={t("marketplace3.edit.youtubePlaceholder")}
                        error={form.formState.errors.agentOutputDemo?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col-reverse gap-3 border-t border-border-base pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              size="small"
              className="w-full sm:w-auto"
            >
              {t("marketplace3.edit.cancel")}
            </Button>
            <Button
              type="submit"
              size="small"
              disabled={isSubmitDisabled}
              loading={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting
                ? t("marketplace3.edit.saving")
                : t("marketplace3.edit.updateSubmission")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
