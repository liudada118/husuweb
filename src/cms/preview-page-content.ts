import type { OfficialCmsPublicState } from "@/cms/official-state";
import type { PageContentState } from "@/lib/cms-page-content";
import type { Language } from "@/lib/site-types";

export type PreviewCmsState = OfficialCmsPublicState & {
  previewPageContent?: PageContentState;
};

export function getPreviewPageField(
  cms: OfficialCmsPublicState | null,
  language: Language,
  pageId: keyof PageContentState[Language],
  sectionId: string,
  fieldId: string,
  fallback: string,
) {
  const previewPageContent = (cms as PreviewCmsState | null)?.previewPageContent;
  const value = previewPageContent?.[language]?.[pageId]?.sections
    .find((section) => section.id === sectionId)
    ?.fields.find((field) => field.id === fieldId)
    ?.value;

  return value?.trim() ? value : fallback;
}

export function getPreviewPageSectionItems(
  cms: OfficialCmsPublicState | null,
  language: Language,
  pageId: keyof PageContentState[Language],
  sectionId: string,
) {
  return (
    (cms as PreviewCmsState | null)?.previewPageContent?.[language]?.[pageId]?.sections.find(
      (section) => section.id === sectionId,
    )?.items ?? []
  );
}

export function getPreviewPageItemField(
  item: ReturnType<typeof getPreviewPageSectionItems>[number] | undefined,
  fieldId: string,
  fallback = "",
) {
  const value = item?.fields.find((field) => field.id === fieldId)?.value;
  return value?.trim() ? value : fallback;
}
