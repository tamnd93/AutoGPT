"use client";

import { FormProvider } from "react-hook-form";
import { CronExpressionDialog } from "@/components/contextual/CronScheduler/cron-scheduler-dialog";
import { FormField } from "@/components/molecules/Form/Form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/molecules/Accordion/Accordion";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Select } from "@/components/atoms/Select/Select";
import { Text } from "@/components/atoms/Text/Text";
import { useStoreCategories } from "@/hooks/useStoreCategories";
import { humanizeCronExpression } from "@/lib/cron-expression-utils";
import { InformationTooltip } from "@/components/molecules/InformationTooltip/InformationTooltip";
import * as React from "react";
import { StepHeader } from "../StepHeader";
import { StepFooter } from "../StepFooter";
import { ThumbnailImages } from "./components/ThumbnailImages";
import { CharCountedTextarea } from "./components/CharCountedTextarea";
import { Props, useAgentInfoStep } from "./useAgentInfoStep";
import { SUB_HEADING_MAX } from "./helpers";
import {
  Album01Icon,
  AlertCircleIcon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  SparklesIcon,
  Store01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useLocale, useT } from "@/lib/i18n";

const DESCRIPTION_MAX = 1000;
const INSTRUCTIONS_MAX = 2000;

export function AgentInfoStep({
  onBack,
  onSuccess,
  selectedAgentId,
  selectedAgentVersion,
  initialData,
  isMarketplaceUpdate,
}: Props) {
  const t = useT();
  const locale = useLocale();
  const {
    form,
    agentId,
    images,
    initialImages,
    initialSelectedImage,
    handleImagesChange,
    handleSubmit,
    isSubmitting,
  } = useAgentInfoStep({
    onBack,
    onSuccess,
    selectedAgentId,
    selectedAgentVersion,
    initialData,
    isMarketplaceUpdate,
  });

  const { categories, isUnavailable, placeholder } = useStoreCategories();

  const [cronScheduleDialogOpen, setCronScheduleDialogOpen] =
    React.useState(false);
  const [openAccordion, setOpenAccordion] = React.useState("");
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setOpenAccordion((current) => current || "basics");
    }, 320);
    return () => window.clearTimeout(timer);
  }, []);

  const handleScheduleChange = (cronExpression: string) => {
    form.setValue("recommendedScheduleCron", cronExpression);
  };

  const categoryOptions = categories.map((category) => ({
    value: category.value,
    label: category.label,
  }));

  const isSubmitDisabled =
    Object.keys(form.formState.errors).length > 0 || isSubmitting;

  const watched = form.watch();
  const errors = form.formState.errors;
  const basicsHasError = !!(
    errors.title ||
    errors.slug ||
    errors.subheader ||
    errors.category
  );
  const experienceHasError = !!(
    errors.description ||
    errors.instructions ||
    errors.youtubeLink ||
    errors.agentOutputDemo
  );
  const thumbnailsHasError = !!errors.root;
  const basicsComplete =
    !basicsHasError &&
    !!watched.title &&
    !!watched.slug &&
    !!watched.subheader &&
    !!watched.category;
  const thumbnailsComplete = !thumbnailsHasError && images.length > 0;
  const experienceComplete =
    !experienceHasError &&
    !!watched.description &&
    !!watched.youtubeLink &&
    !!watched.agentOutputDemo;

  const title = isMarketplaceUpdate
    ? t("marketplace3.publish.describeUpdate")
    : t("marketplace3.publish.buildListing");
  const description = isMarketplaceUpdate
    ? t("marketplace3.publish.describeUpdateBody")
    : t("marketplace3.publish.buildListingBody");

  return (
    <div className="mx-auto flex w-full flex-col">
      <StepHeader title={title} description={description} currentStep="info" />

      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pb-5">
          {isMarketplaceUpdate && (
            <section className="rounded-[18px] border border-warning-border bg-warning-surface p-4">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-warning-foreground shadow-[0_1px_2px_rgba(15,15,20,0.04)]">
                  <Icon icon={InformationCircleIcon} size={18} />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <Text
                    variant="body-medium"
                    as="h3"
                    // TODO(tokens): no exact role for text-amber-950 #451a03
                    className="text-amber-950"
                  >
                    {t("marketplace3.edit.updateNote")}
                  </Text>
                  <Text
                    // TODO(tokens): no exact role for text-amber-800 #92400e
                    variant="small"
                    className="text-amber-800"
                  >
                    {t("marketplace3.publish.updateNoteBody")}
                  </Text>
                </div>
              </div>
              <FormField
                control={form.control}
                name="changesSummary"
                render={({ field }) => (
                  <Input
                    id={field.name}
                    labelVariant="body"
                    label={t("marketplace3.edit.whatChanged")}
                    labelTooltip={t("marketplace3.edit.whatChangedTooltip")}
                    type="textarea"
                    rows={1}
                    placeholder={t("marketplace3.edit.whatChangedPlaceholder")}
                    error={form.formState.errors.changesSummary?.message}
                    required
                    wrapperClassName="!mb-0"
                    {...field}
                  />
                )}
              />
            </section>
          )}

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
                  name="slug"
                  render={({ field }) => (
                    <Input
                      id={field.name}
                      labelVariant="body"
                      label={t("marketplace3.publish.slug")}
                      labelTooltip={t("marketplace3.publish.slugTooltip")}
                      type="text"
                      placeholder={t("marketplace3.publish.slugPlaceholder")}
                      error={form.formState.errors.slug?.message}
                      {...field}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <Select
                      id={field.name}
                      labelVariant="body"
                      label={t("marketplace3.edit.category")}
                      labelTooltip={t("marketplace3.edit.categoryTooltip")}
                      placeholder={placeholder}
                      disabled={isUnavailable}
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
                  agentId={agentId}
                  onImagesChange={handleImagesChange}
                  initialImages={initialImages}
                  initialSelectedImage={initialSelectedImage}
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

                <FormField
                  control={form.control}
                  name="instructions"
                  render={({ field }) => (
                    <CharCountedTextarea
                      max={INSTRUCTIONS_MAX}
                      value={field.value ?? ""}
                    >
                      <Input
                        id={field.name}
                        labelVariant="body"
                        label={t("marketplace3.publish.instructions")}
                        labelTooltip={t(
                          "marketplace3.publish.instructionsTooltip",
                        )}
                        type="textarea"
                        rows={2}
                        placeholder={t(
                          "marketplace3.publish.instructionsPlaceholder",
                        )}
                        error={form.formState.errors.instructions?.message}
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

                <FormField
                  control={form.control}
                  name="recommendedScheduleCron"
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1">
                          <Text
                            variant="body"
                            as="span"
                            className="text-foreground-base"
                          >
                            {t("marketplace3.publish.recommendedSchedule")}
                          </Text>
                          <InformationTooltip
                            description={t(
                              "marketplace3.publish.recommendedScheduleTooltip",
                            )}
                            iconSize={20}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCronScheduleDialogOpen(true)}
                        // TODO(tokens): no exact role for focus:border-purple-400 #925cf7, focus:ring-purple-400 #925cf7
                        className="flex h-[2.875rem] w-full items-center gap-2 rounded-xl border border-border-base bg-surface px-4 py-2.5 text-left text-foreground-base shadow-none transition-colors hover:border-border-strong focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                      >
                        <Icon
                          icon={Calendar03Icon}
                          size={16}
                          className="shrink-0 text-foreground-tertiary"
                        />
                        <Text
                          variant="body-tight"
                          as="span"
                          tone={field.value ? "inherit" : "subtle"}
                          className="truncate"
                        >
                          {field.value
                            ? humanizeCronExpression(field.value, locale)
                            : t("marketplace3.publish.setSchedule")}
                        </Text>
                      </button>
                    </div>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <StepFooter
            secondary={
              <Button
                type="button"
                onClick={onBack}
                variant="secondary"
                size="small"
                className="w-full sm:w-auto"
              >
                {t("marketplace3.publish.back")}
              </Button>
            }
            primary={
              <Button
                type="submit"
                size="small"
                disabled={isSubmitDisabled}
                loading={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting
                  ? t("marketplace3.publish.submitting")
                  : t("marketplace3.publish.submitForReview")}
              </Button>
            }
          />
        </form>
      </FormProvider>

      <CronExpressionDialog
        open={cronScheduleDialogOpen}
        setOpen={setCronScheduleDialogOpen}
        onSubmit={handleScheduleChange}
        defaultCronExpression={form.getValues("recommendedScheduleCron") || ""}
        title={t("marketplace3.publish.recommendedScheduleTitle")}
      />
    </div>
  );
}
