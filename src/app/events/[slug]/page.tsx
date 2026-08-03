import type { Metadata } from "next";
import { Suspense } from "react";
import { EventDetailPage } from "@/components/pages/EventDetailPage";
import { events } from "@/data/events";
import { getPreviewPageItemField, getPreviewPageSectionItems } from "@/cms/preview-page-content";
import { getPublicCmsState } from "@/lib/cms-store";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getPublicCmsState();
  const event = events.find((item) => item.slug === slug);
  const findBySlug = (item: ReturnType<typeof getPreviewPageSectionItems>[number]) =>
    getPreviewPageItemField(item, "slug", item.id) === slug;
  const zhDetailItem = getPreviewPageSectionItems(cms, "zh", "event", "detailPages").find(findBySlug);
  const enDetailItem = getPreviewPageSectionItems(cms, "en", "event", "detailPages").find(findBySlug);
  const zhListItem = getPreviewPageSectionItems(cms, "zh", "event", "list").find(findBySlug);
  const enListItem = getPreviewPageSectionItems(cms, "en", "event", "list").find(findBySlug);
  const override = cms.events.overrides[slug];
  const title =
    getPreviewPageItemField(zhDetailItem, "title") ||
    getPreviewPageItemField(enDetailItem, "title") ||
    getPreviewPageItemField(zhListItem, "title") ||
    getPreviewPageItemField(enListItem, "title") ||
    override?.zh?.title?.trim() ||
    override?.en?.title?.trim() ||
    event?.zh?.title ||
    event?.title ||
    slug;
  const description =
    getPreviewPageItemField(zhDetailItem, "summary") ||
    getPreviewPageItemField(enDetailItem, "summary") ||
    getPreviewPageItemField(zhListItem, "summary") ||
    getPreviewPageItemField(enListItem, "summary") ||
    override?.zh?.summary?.trim() ||
    override?.en?.summary?.trim() ||
    event?.zh?.summary ||
    event?.summary ||
    title;

  return {
    title,
    description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense>
      <EventDetailPage slug={slug} />
    </Suspense>
  );
}
