import { unstable_noStore as noStore } from "next/cache";
import { getSiteState, saveSiteState } from "./cms-db";
import type { PageContentState } from "./cms-page-content";
import type { VisualEditorState } from "./cms-types";
import type { SiteContent } from "@/app/translations/translations";

export async function getSiteContent(): Promise<SiteContent> {
  noStore();
  return getSiteState().siteContent;
}

export async function getVisualEditorState(): Promise<VisualEditorState> {
  noStore();
  return getSiteState().visualEditor;
}

export async function getPageContentState(): Promise<PageContentState> {
  noStore();
  return getSiteState().pageContent;
}

export async function saveSiteContent(input: {
  siteContent: SiteContent;
  visualEditor: VisualEditorState;
  pageContent: PageContentState;
  updatedBy?: number;
}) {
  saveSiteState(input);
}
