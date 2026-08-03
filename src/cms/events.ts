import type { EventItem, EventCopy, LocalizedEventItem } from "@/data/events";
import { localizeEvent } from "@/data/events";
import type { OfficialCmsEventOverride } from "@/cms/official-state";

function applyCopyOverride(copy: EventCopy, override?: OfficialCmsEventOverride["en"]) {
  if (!override) return copy;
  const content = override.content?.filter((paragraph) => paragraph.trim());

  return {
    ...copy,
    category: override.category?.trim() || copy.category,
    title: override.title?.trim() || copy.title,
    summary: override.summary?.trim() || copy.summary,
    content: content?.length ? content : copy.content,
  };
}

function hasCmsMediaOverride(values?: string[]) {
  return Array.isArray(values);
}

export function applyCmsEventOverride(event: EventItem, override?: OfficialCmsEventOverride): EventItem {
  if (!override) return event;

  return {
    ...event,
    date: override.sortDate?.trim() || event.date,
    image: typeof override.image === "string" ? override.image.trim() : event.image,
    detailImages: hasCmsMediaOverride(override.detailImages)
      ? override.detailImages?.map((value) => value.trim())
      : event.detailImages,
    detailVideos: hasCmsMediaOverride(override.detailVideos)
      ? override.detailVideos?.map((value) => value.trim())
      : event.detailVideos,
    ...applyCopyOverride(event, override.en),
    zh: applyCopyOverride(event.zh, override.zh),
  };
}

export function localizeCmsEvent(
  event: EventItem,
  language: "en" | "zh",
  override?: OfficialCmsEventOverride,
): LocalizedEventItem {
  return localizeEvent(applyCmsEventOverride(event, override), language);
}
