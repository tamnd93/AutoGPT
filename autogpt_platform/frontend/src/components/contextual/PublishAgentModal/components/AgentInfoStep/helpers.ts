import z from "zod";
import { validateYouTubeUrl } from "@/lib/utils";
import { DEFAULT_LOCALE } from "@/lib/i18n/locale";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

export type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const defaultTranslate: Translate = (key, values) =>
  getMessage(DEFAULT_LOCALE, key, values);

// Mirrors SUB_HEADING_MAX_LENGTH in backend/api/features/store/model.py.
export const SUB_HEADING_MAX = 100;

// Create conditional schema that changes based on whether it's a marketplace update
export const publishAgentSchemaFactory = (
  isMarketplaceUpdate: boolean = false,
  t: Translate = defaultTranslate,
) => {
  const baseSchema = {
    changesSummary: isMarketplaceUpdate
      ? z
          .string()
          .min(1, t("marketplace3.zod.changesRequired"))
          .max(500, t("marketplace3.zod.changesTooLong"))
      : z.string().optional(),
    title: isMarketplaceUpdate
      ? z
          .string()
          .optional()
          .refine(
            (val) => !val || val.length <= 100,
            t("marketplace3.zod.titleTooLong"),
          )
      : z
          .string()
          .min(1, t("marketplace3.zod.titleRequired"))
          .max(100, t("marketplace3.zod.titleTooLong")),
    subheader: z
      .string()
      .trim()
      .min(1, t("marketplace3.zod.taglineRequired"))
      .max(
        SUB_HEADING_MAX,
        t("marketplace3.zod.taglineTooLong", { max: SUB_HEADING_MAX }),
      ),
    slug: isMarketplaceUpdate
      ? z
          .string()
          .optional()
          .refine(
            (val) => !val || (val.length <= 50 && /^[a-z0-9-]+$/.test(val)),
            t("marketplace3.zod.slugFormat"),
          )
      : z
          .string()
          .min(1, t("marketplace3.zod.slugRequired"))
          .max(50, t("marketplace3.zod.slugTooLong"))
          .regex(/^[a-z0-9-]+$/, t("marketplace3.zod.slugFormat")),
    youtubeLink: isMarketplaceUpdate
      ? z
          .string()
          .optional()
          .refine(
            (val) => !val || validateYouTubeUrl(val),
            t("marketplace3.zod.youtubeInvalid"),
          )
      : z
          .string()
          .refine(validateYouTubeUrl, t("marketplace3.zod.youtubeInvalid")),
    category: z.string().min(1, t("marketplace3.zod.categoryRequired")),
    description: isMarketplaceUpdate
      ? z
          .string()
          .optional()
          .refine(
            (val) => !val || val.length <= 1000,
            t("marketplace3.zod.descriptionTooLong"),
          )
      : z
          .string()
          .min(1, t("marketplace3.zod.descriptionRequired"))
          .max(1000, t("marketplace3.zod.descriptionTooLong")),
    recommendedScheduleCron: z.string().optional(),
    instructions: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length <= 2000,
        t("marketplace3.zod.instructionsTooLong"),
      ),
    agentOutputDemo: isMarketplaceUpdate
      ? z
          .string()
          .optional()
          .refine(
            (val) => !val || validateYouTubeUrl(val),
            t("marketplace3.zod.youtubeInvalid"),
          )
      : z
          .string()
          .refine(validateYouTubeUrl, t("marketplace3.zod.youtubeInvalid")),
  };

  return z.object(baseSchema);
};

// Default schema for backwards compatibility
export const publishAgentSchema = publishAgentSchemaFactory(false);

export type PublishAgentFormData = z.infer<
  ReturnType<typeof publishAgentSchemaFactory>
>;

export interface PublishAgentInfoInitialData {
  agent_id: string;
  title: string;
  subheader: string;
  slug: string;
  thumbnailSrc: string;
  youtubeLink: string;
  category: string;
  description: string;
  additionalImages?: string[];
  recommendedScheduleCron?: string;
  instructions?: string;
  agentOutputDemo?: string;
  changesSummary?: string;
}
