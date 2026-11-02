import {
  getYouTubeVideoId,
  isYouTubeImageUrl,
} from "@/components/molecules/YouTubeEmbed/helpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import { isValidVideoUrl } from "../AgentImageItem/helpers";

type Thumbnail =
  | { kind: "image"; src: string }
  | { kind: "youtube"; label: string }
  | { kind: "video" };

// Anything served by YouTube (a video's thumbnail, or a listing image hosted
// there) waits for the same marketing consent as the player.
export function getThumbnail(
  image: string,
  hasAdvertisingConsent: boolean,
  locale: Locale = DEFAULT_LOCALE,
): Thumbnail {
  if (isValidVideoUrl(image)) {
    const videoId = getYouTubeVideoId(image);
    if (!videoId) return { kind: "video" };
    if (!hasAdvertisingConsent) {
      return {
        kind: "youtube",
        label: getMessage(locale, "marketplace1.images.youtubeVideo"),
      };
    }
    return {
      kind: "image",
      src: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    };
  }
  if (isYouTubeImageUrl(image) && !hasAdvertisingConsent) {
    return {
      kind: "youtube",
      label: getMessage(locale, "marketplace1.images.imageFromYouTube"),
    };
  }
  return { kind: "image", src: image };
}
