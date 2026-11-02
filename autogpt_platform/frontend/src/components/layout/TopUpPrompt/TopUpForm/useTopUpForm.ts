import { useToastOnFail } from "@/components/molecules/Toast/use-toast";
import { useCheckoutRedirect } from "@/hooks/useCheckoutRedirect";
import useCredits from "@/hooks/useCredits";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useT } from "@/lib/i18n";

export function useTopUpForm() {
  const t = useT();
  const topUpSchema = z.object({
    amount: z
      .number({
        coerce: true,
        invalid_type_error: t("billing2.topUp.enterAmount"),
      })
      .int(t("billing2.topUp.wholeDollars"))
      .min(5, t("billing2.topUp.minimum")),
  });
  const toastOnFail = useToastOnFail();
  const { requestTopUp } = useCredits();

  const [isRequesting, setIsRequesting] = useState(false);
  const checkoutRedirect = useCheckoutRedirect();
  const isLoading = isRequesting || checkoutRedirect.isRedirectingHere;

  const form = useForm<z.infer<typeof topUpSchema>>({
    resolver: zodResolver(topUpSchema),
  });

  async function submitTopUp(data: z.infer<typeof topUpSchema>) {
    if (isLoading || checkoutRedirect.isRedirecting) return;
    setIsRequesting(true);
    await requestTopUp(Math.round(data.amount * 100))
      .then(() => checkoutRedirect.markRedirecting())
      .catch(toastOnFail("request top-up"))
      .finally(() => setIsRequesting(false));
  }

  return {
    form,
    isLoading,
    // Any checkout on the page leaving for Stripe, not just this one.
    isRedirecting: checkoutRedirect.isRedirecting,
    submitTopUp,
  };
}
