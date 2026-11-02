"use client";

import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";
import Link from "next/link";

import { ConnectionPickerPanel } from "./ConnectionPickerPanel";
import { listedConnections } from "./helpers";
import { useConnectionPicker } from "./useConnectionPicker";

interface Props {
  /** See `ConnectionPicker`: the connection is fixed, only the tier is open. */
  connectionLocked?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** The connection picker's sheet as a dialog, opened from the composer's +. */
export function ConnectionPickerDialog({
  connectionLocked = false,
  open,
  onOpenChange,
}: Props) {
  // Mounted while closed too: the hook also drops a lapsed Advanced tier,
  // which has to happen whether or not anyone opens the sheet.
  const picker = useConnectionPicker();
  const t = useT();

  return (
    <Dialog
      title={t("chatInput1.picker.dialogTitle")}
      controlled={{ isOpen: open, set: onOpenChange }}
      styling={{ maxWidth: "26rem" }}
    >
      <Dialog.Content>
        <DialogBody picker={picker} connectionLocked={connectionLocked} />
      </Dialog.Content>
    </Dialog>
  );
}

interface BodyProps {
  picker: ReturnType<typeof useConnectionPicker>;
  connectionLocked: boolean;
}

function DialogBody({ picker, connectionLocked }: BodyProps) {
  const t = useT();
  const { offers, active, isLoading, isError } = picker;

  if (isLoading && offers.length === 0) {
    return <Skeleton className="h-32 w-full rounded-xl" />;
  }

  if (isError) {
    return (
      <p className="text-sm text-foreground-secondary">
        {t("chatInput1.picker.unavailable")}
      </p>
    );
  }

  if (offers.length === 0) {
    return (
      <p className="text-sm text-foreground-secondary">
        {t("chatInput1.picker.noConnection")}{" "}
        <Link href="/settings/integrations" className="underline">
          {t("chatInput1.picker.setOneUp")}
        </Link>
      </p>
    );
  }

  // Asked for from the menu, so the dialog always says what the chat runs
  // on: with nothing to choose, it still lists the active connection.
  const listed = listedConnections(offers, connectionLocked);
  const rows = listed.length > 0 ? listed : active ? [active] : offers;

  return <ConnectionPickerPanel picker={picker} rows={rows} />;
}
