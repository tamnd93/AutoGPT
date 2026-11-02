"use client";

import { Text } from "@/components/atoms/Text/Text";
import { Button } from "@/components/atoms/Button/Button";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { Input } from "@/components/atoms/Input/Input";
import { useState } from "react";
import { useT } from "@/lib/i18n";

interface Props {
  isOpen: boolean;
  onSubmit: (comment: string) => void;
  onCancel: () => void;
}

export function FeedbackModal({ isOpen, onSubmit, onCancel }: Props) {
  const t = useT();
  const [comment, setComment] = useState("");

  function handleSubmit() {
    if (!comment.trim()) return;
    onSubmit(comment);
    setComment("");
  }

  function handleClose() {
    onCancel();
    setComment("");
  }

  return (
    <Dialog
      title={t("chatRuntime1.feedbackModal.title")}
      controlled={{
        isOpen,
        set: (open) => {
          if (!open) handleClose();
        },
      }}
    >
      <Dialog.Content>
        <div className="mx-auto w-[95%] space-y-4">
          <Text variant="body-tight" as="p" className="text-muted-foreground">
            {t("chatRuntime1.feedbackModal.intro")}
          </Text>
          <Input
            bare
            type="textarea"
            placeholder={t("chatRuntime1.feedbackModal.placeholder")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={2000}
            className="resize-none"
          />
          <div className="flex items-center justify-between">
            <Text
              variant="small-tight"
              as="p"
              className="text-muted-foreground"
            >
              {comment.length}/2000
            </Text>
            <div className="flex gap-2">
              <Button variant="outline" size="small" onClick={handleClose}>
                {t("chatRuntime1.feedbackModal.cancel")}
              </Button>
              <Button
                size="small"
                onClick={handleSubmit}
                disabled={!comment.trim()}
              >
                {t("chatRuntime1.feedbackModal.submit")}
              </Button>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
