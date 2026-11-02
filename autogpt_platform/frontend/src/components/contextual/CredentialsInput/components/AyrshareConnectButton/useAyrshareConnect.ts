import { useContext, useState } from "react";

import { getV1GetAyrshareSsoUrl } from "@/app/api/__generated__/endpoints/integrations/integrations";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { CredentialsActionsContext } from "@/providers/agent-credentials/credentials-provider";
import { useT } from "@/lib/i18n";

export function useAyrshareConnect() {
  const t = useT();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const credentialsActions = useContext(CredentialsActionsContext);

  async function connect() {
    setIsLoading(true);
    try {
      const { data, status } = await getV1GetAyrshareSsoUrl();
      if (status !== 200) {
        throw new Error(data.detail);
      }
      // The SSO endpoint provisions the managed Ayrshare credential as a
      // side effect — reload the credentials context so the block's
      // dropdown picks it up without a page refresh.
      credentialsActions?.reload();
      const popup = window.open(data.sso_url, "_blank", "popup=true");
      if (!popup) {
        throw new Error(t("credentials1.ayrshare.popupBlocked"));
      }
      toast({
        title: t("credentials1.ayrshare.successTitle"),
        description: t("credentials1.ayrshare.successBody"),
      });
    } catch (error) {
      toast({
        title: t("credentials1.ayrshare.errorTitle"),
        description: t("credentials1.ayrshare.errorBody", {
          error: String(error),
        }),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { connect, isLoading };
}
