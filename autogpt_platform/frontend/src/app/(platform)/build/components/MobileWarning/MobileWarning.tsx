"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useMobileWarning } from "./useMobileWarning";
import { SmartPhone01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export function MobileWarning() {
  const t = useT();
  const { isOpen, dismiss, suppress } = useMobileWarning();

  return (
    <Dialog
      title={t("build3.mobile.title")}
      controlled={{
        isOpen,
        set: (next) => {
          if (!next) dismiss();
        },
      }}
    >
      <Dialog.Content>
        <div className="flex flex-col items-center gap-4 px-1 py-2 text-center">
          <Icon
            // TODO(tokens): no exact role: text-amber-600 #D97706
            icon={SmartPhone01Icon}
            className="h-10 w-10 text-amber-600"
          />
          <Text variant="body" tone="body">
            {t("build3.mobile.body")}
          </Text>
          <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
            <Button variant="secondary" size="small" onClick={dismiss}>
              {t("build3.mobile.continueAnyway")}
            </Button>
            <Button variant="ghost" size="small" onClick={suppress}>
              {t("build3.mobile.dontShow")}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
