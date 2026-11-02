import { useGetV2GetLibraryAgentByGraphId } from "@/app/api/__generated__/endpoints/library/library";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { Text } from "@/components/atoms/Text/Text";
import { Alert, AlertDescription } from "@/components/molecules/Alert/Alert";
import { isValidUUID } from "@/lib/utils";
import Link from "next/link";
import { parseAsString, useQueryStates } from "nuqs";
import { useT } from "@/lib/i18n";

export const WebhookDisclaimer = ({ nodeId }: { nodeId: string }) => {
  const t = useT();
  const [{ flowID }] = useQueryStates({
    flowID: parseAsString,
  });

  // for a single agentId, we are fetching everything - need to make it better in the future
  const { data: libraryAgent } = useGetV2GetLibraryAgentByGraphId(
    flowID ?? "",
    {},
    {
      query: {
        select: (x) => {
          return x.data as LibraryAgent;
        },
        enabled: !!flowID,
      },
    },
  );

  const isNodeSaved = isValidUUID(nodeId);

  return (
    <>
      <div className="px-4 pt-4">
        <Alert className="mb-3 rounded-xlarge">
          <AlertDescription>
            <Text variant="small-medium">
              {t("build2.webhook.prefix")}{" "}
              <Link
                href={
                  libraryAgent
                    ? `/library/agents/${libraryAgent.id}`
                    : "/library"
                }
                className="underline"
              >
                <Text variant="small-medium-inherit" as="span" tone="inherit">
                  {t("build2.webhook.library")}
                </Text>
              </Link>
              {!isNodeSaved && t("build2.webhook.afterSave")}.
            </Text>
          </AlertDescription>
        </Alert>
      </div>

      <Text
        // TODO(tokens): no exact role: !text-purple-700 #5424AE
        variant="small"
        className="mb-4 ml-6 !text-purple-700"
      >
        {t("build2.webhook.displayOnly")}
      </Text>
    </>
  );
};
