import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { CreditTransaction } from "@/lib/autogpt-server-api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/molecules/Dialog/components/DialogPrimitives";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select/components/SelectPrimitives";
import { Textarea } from "@/components/atoms/Textarea/Textarea";
import { useT } from "@/lib/i18n";

interface RefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: CreditTransaction[];
  formatCredits: (credit: number) => string;
  refundCredits: (transaction_key: string, reason: string) => Promise<void>;
}

export const RefundModal = ({
  isOpen,
  onClose,
  transactions,
  formatCredits,
  refundCredits,
}: RefundModalProps) => {
  const t = useT();
  const [selectedTransactionId, setSelectedTransactionId] =
    useState<string>("");
  const [refundReason, setRefundReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setSelectedTransactionId("");
    setRefundReason("");
    setError(null);
    onClose();
  };

  const handleRefundRequest = () => {
    setError(null);

    const selectedTransaction = transactions.find(
      (t) => t.transaction_key === selectedTransactionId,
    );

    if (!selectedTransaction) {
      setError(t("profile4.refund.selectError"));
      return;
    }

    if (refundReason.trim().length < 20) {
      setError(t("profile4.refund.reasonError"));
      return;
    }

    refundCredits(selectedTransactionId, refundReason).finally(() =>
      handleClose(),
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("profile4.refund.title")}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            {error && (
              <Text
                variant="body-tight"
                as="div"
                className="flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </Text>
            )}

            {transactions.length === 0 ? (
              <Text
                variant="body-tight"
                // TODO(tokens): no exact role (text-gray-500 #6B7280)
                className="text-gray-500"
              >
                {t("profile4.refund.noneEligible")}
              </Text>
            ) : (
              <div className="space-y-2">
                <Text variant="body-medium-tight" as="label" tone="inherit">
                  {t("profile4.refund.selectLabel")}
                </Text>
                <Select
                  value={selectedTransactionId}
                  onValueChange={setSelectedTransactionId}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("profile4.refund.selectPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {transactions.map((transaction) => (
                      <SelectItem
                        key={transaction.transaction_key}
                        value={transaction.transaction_key}
                      >
                        {new Date(transaction.transaction_time).toLocaleString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          },
                        )}{" "}
                        - {formatCredits(transaction.amount)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="refundReason">
                <Text variant="body-medium-tight" as="span" tone="inherit">
                  {t("profile4.refund.reasonLabel")}
                </Text>
              </label>
              <Textarea
                id="refundReason"
                placeholder={t("profile4.refund.reasonPlaceholder")}
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="legacy-outline" onClick={handleClose}>
            {t("profile4.common.cancel")}
          </Button>
          <Button variant="legacy-default" onClick={handleRefundRequest}>
            {t("profile4.refund.title")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
