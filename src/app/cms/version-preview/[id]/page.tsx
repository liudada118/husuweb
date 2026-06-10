import { notFound } from "next/navigation";
import { CmsVersionPreview } from "../../../components/CmsVersionPreview";
import { getVersionPreviewData } from "@/lib/cms-db";
import { requireCmsUser } from "@/lib/cms-session";

export default async function CmsVersionPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  await requireCmsUser();

  const { id } = await params;
  const { lang } = (await searchParams) ?? {};
  const versionId = Number(id);
  const initialLanguage = lang === "en" ? "en" : "zh";

  if (!Number.isFinite(versionId)) {
    notFound();
  }

  const preview = getVersionPreviewData(versionId);

  if (!preview) {
    notFound();
  }

  return (
    <CmsVersionPreview
      publicData={preview.publicData}
      siteContent={preview.siteContent}
      version={preview.version}
      initialLanguage={initialLanguage}
    />
  );
}
