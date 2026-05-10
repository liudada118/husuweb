import type { EventItem, EventCopy, LocalizedEventItem } from "@/data/events";
import { localizeEvent } from "@/data/events";
import type { OfficialCmsEventOverride } from "@/cms/official-state";

function applyCopyOverride(copy: EventCopy, override?: OfficialCmsEventOverride["en"]) {
  if (!override) return copy;

  return {
    ...copy,
    category: override.category?.trim() || copy.category,
    title: override.title?.trim() || copy.title,
    summary: override.summary?.trim() || copy.summary,
    content: override.content?.filter((paragraph) => paragraph.trim()) ?? copy.content,
  };
}

export function applyCmsEventOverride(event: EventItem, override?: OfficialCmsEventOverride): EventItem {
  if (!override) return event;

  return {
    ...event,
    image: override.image?.trim() || event.image,
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
