import type { BotPlatformInfo } from "@/app/api/__generated__/models/botPlatformInfo";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

export type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Translate = (key, values) => getMessage("en", key, values);

export function getAddBotLabel(
  platform: BotPlatformInfo,
  serverNoun: string,
  t: Translate = english,
) {
  // With a DM link the card leads with messaging the bot, so adding it to a
  // group reads as the optional extra it is.
  return platform.dm_url
    ? t("settingsRest1.card.addToServer", { noun: serverNoun })
    : t("settingsRest1.card.addBotTo", { platform: platform.display_name });
}
