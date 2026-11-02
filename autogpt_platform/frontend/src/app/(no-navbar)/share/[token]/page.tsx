"use client";

import { RunOutputs } from "@/app/(platform)/library/agents/[id]/components/NewAgentLibraryView/components/selected-views/SelectedRunView/components/RunOutputs";
import { okData } from "@/app/api/helpers";
import { useGetV1GetSharedExecution } from "@/app/api/__generated__/endpoints/default/default";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Alert, AlertDescription } from "@/components/molecules/Alert/Alert";
import { CookieSettingsLink } from "@/components/molecules/CookieSettingsLink/CookieSettingsLink";
import { InfoIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { ShareActions } from "../components/ShareHeader/ShareActions";
import { ShareHeader } from "../components/ShareHeader/ShareHeader";
import { useT } from "@/lib/i18n";

// Wraps the page in the shared header + a scrollable container.
// Header is the same component used by the chat share viewer so the
// two routes stay visually consistent.
function ExecutionShareChrome({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <ShareHeader title={title} actions={<ShareActions />} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
      <CookieSettingsLink className="mb-1 shrink-0 self-center" />
    </div>
  );
}

export default function SharePage() {
  const t = useT();
  const params = useParams();
  const token = params.token as string;

  const {
    data: executionData,
    isLoading: loading,
    error,
  } = useGetV1GetSharedExecution(token, { query: { select: okData } });

  const is404 = !loading && !executionData;

  if (loading) {
    return (
      <ExecutionShareChrome>
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-muted-foreground">
              {t("sharing1.shareExec.loading")}
            </p>
          </div>
        </div>
      </ExecutionShareChrome>
    );
  }

  if (error || is404 || !executionData) {
    return (
      <ExecutionShareChrome>
        <div className="flex items-center justify-center py-16">
          <div className="mx-auto w-full max-w-md p-6">
            <Card variant="outlined" className="border-dashed">
              <CardContent className="pt-6">
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <InfoIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      {is404
                        ? t("sharing1.shareExec.notFoundTitle")
                        : t("sharing1.shareExec.errorTitle")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {is404
                        ? t("sharing1.shareExec.notFoundBody")
                        : t("sharing1.shareExec.errorBody")}
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => window.location.reload()}
                      className="text-sm text-primary hover:underline"
                    >
                      {t("sharing1.shareExec.tryAgain")}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="mt-8 text-center text-xs text-muted-foreground">
              <p>{t("sharing1.shareError.poweredBy")}</p>
            </div>
          </div>
        </div>
      </ExecutionShareChrome>
    );
  }

  return (
    <ExecutionShareChrome title={executionData.graph_name}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              {t("sharing1.shareExec.publicNotice")}
            </AlertDescription>
          </Alert>
        </div>

        <Card variant="outlined" className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">
              {executionData.graph_name}
            </CardTitle>
            {executionData.graph_description && (
              <p className="mt-2 text-muted-foreground">
                {executionData.graph_description}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">
                  {t("sharing1.shareExec.status")}
                </span>
                <span className="ml-2 capitalize">
                  {executionData.status.toLowerCase()}
                </span>
              </div>
              <div>
                <span className="font-medium">
                  {t("sharing1.shareExec.created")}
                </span>
                <span className="ml-2">
                  {new Date(executionData.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardHeader>
            <CardTitle>{t("sharing1.shareExec.output")}</CardTitle>
          </CardHeader>
          <CardContent>
            <RunOutputs outputs={executionData.outputs} shareToken={token} />
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>{t("sharing1.shareError.poweredBy")}</p>
        </div>
      </div>
    </ExecutionShareChrome>
  );
}
