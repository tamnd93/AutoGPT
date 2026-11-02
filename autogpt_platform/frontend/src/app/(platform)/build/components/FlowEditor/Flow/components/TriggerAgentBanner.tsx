import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/molecules/Alert/Alert";
import Link from "next/link";
import { Text } from "@/components/atoms/Text/Text";
import { useGetV2GetLibraryAgentByGraphId } from "@/app/api/__generated__/endpoints/library/library";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { useQueryStates, parseAsString } from "nuqs";
import { useT } from "@/lib/i18n";

export const TriggerAgentBanner = () => {
  const t = useT();
  const [{ flowID }] = useQueryStates({
    flowID: parseAsString,
  });

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

  return (
    <Alert className="absolute bottom-4 left-1/2 z-20 w-auto -translate-x-1/2 select-none rounded-xlarge">
      <AlertTitle>{t("build1.triggerBanner.title")}</AlertTitle>
      <AlertDescription>
        {t("build1.triggerBanner.body")}
        <br />
        You can view its activity in your{" "}
        <Link
          href={
            libraryAgent ? `/library/agents/${libraryAgent.id}` : "/library"
          }
          className="underline"
        >
          <Text variant="body-tight" as="span" tone="inherit">
            {t("build1.triggerBanner.library")}
          </Text>
        </Link>
        .
      </AlertDescription>
    </Alert>
  );
};
