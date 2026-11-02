"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Select } from "@/components/atoms/Select/Select";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { MultiToggle } from "@/components/molecules/MultiToggle/MultiToggle";
import { CheckmarkCircle02Icon, Store01Icon } from "@hugeicons/core-free-icons";
import { usePublishSkillButton } from "./usePublishSkillButton";
import { useT } from "@/lib/i18n";

interface Props {
  skillName: string;
}

export function PublishSkillButton({ skillName }: Props) {
  const t = useT();
  const {
    isOpen,
    setIsOpen,
    open,
    submitted,
    isPublishing,
    canSubmit,
    category,
    setCategory,
    categoryOptions,
    providers,
    setProviders,
    providerItems,
    submit,
  } = usePublishSkillButton({ skillName });

  return (
    <>
      <Button
        variant="icon"
        size="icon"
        onClick={open}
        data-testid="skill-publish-button"
        aria-label={t("skills1.publish.aria")}
      >
        <Icon icon={Store01Icon} className="h-4 w-4" />
      </Button>

      <Dialog
        controlled={{ isOpen, set: setIsOpen }}
        styling={{ maxWidth: "32rem" }}
        title={t("skills1.publish.title")}
      >
        <Dialog.Content>
          {submitted ? (
            <div
              className="flex items-start gap-2"
              data-testid="skill-publish-submitted"
            >
              <Icon
                icon={CheckmarkCircle02Icon}
                size={18}
                // TODO(tokens): no exact role for text-emerald-600 #059669
                className="mt-0.5 text-emerald-600"
              />
              <Text variant="body">
                {t("skills1.publish.submitted")}
              </Text>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Text variant="body" className="!text-foreground-tertiary">
                {t("skills1.publish.introPrefix")}{" "}
                <strong>{skillName}</strong>
                {t("skills1.publish.introSuffix")}
              </Text>
              <Select
                id="skill-category"
                label={t("skills1.publish.category")}
                placeholder={t("skills1.publish.categoryPlaceholder")}
                value={category}
                onValueChange={setCategory}
                options={categoryOptions}
              />
              <div className="flex flex-col gap-2">
                <Text variant="large-medium">
                  {t("skills1.publish.worksWith")}
                </Text>
                <Text variant="small" className="!text-foreground-tertiary">
                  {t("skills1.publish.worksWithHint")}
                </Text>
                <MultiToggle
                  items={providerItems}
                  selectedValues={providers}
                  onChange={setProviders}
                  aria-label={t("skills1.publish.integrationsAria")}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={submit}
                  disabled={!canSubmit}
                  loading={isPublishing}
                  data-testid="skill-publish-submit"
                >
                  {t("skills1.publish.submit")}
                </Button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog>
    </>
  );
}
