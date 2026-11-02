import { convertLibraryAgentIntoCustomNode } from "../helpers";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { getV2GetLibraryAgent } from "@/app/api/__generated__/endpoints/library/library";
import { useAddBlockToBuilder } from "./useAddBlockToBuilder";
import { useT } from "@/lib/i18n";

export function useAddAgentToBuilder() {
  const t = useT();
  const { addBlockWithPlacement } = useAddBlockToBuilder();

  function addAgentToBuilder(libraryAgent: LibraryAgent) {
    const { input_schema, output_schema } = libraryAgent;

    const { block, hardcodedValues } = convertLibraryAgentIntoCustomNode(
      libraryAgent,
      input_schema,
      output_schema,
    );

    return addBlockWithPlacement(block, hardcodedValues);
  }

  async function addLibraryAgentToBuilder(agent: LibraryAgent) {
    const response = await getV2GetLibraryAgent(agent.id);

    if (!response.data) {
      throw new Error(t("build5.addAgent.detailsFailed"));
    }

    const libraryAgent = response.data as LibraryAgent;
    return addAgentToBuilder(libraryAgent);
  }

  return {
    addAgentToBuilder,
    addLibraryAgentToBuilder,
  };
}
