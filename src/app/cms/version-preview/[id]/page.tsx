import { notFound } from "next/navigation";
import { CmsVersionPreview } from "../../../components/CmsVersionPreview";
import { getVersionPreviewData } from "@/lib/cms-db";
import { requireCmsUser } from "@/lib/cms-session";

export default async function CmsVersionPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireCmsUser();

  const { id } = await params;
  const versionId = Number(id);

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
    />
  );
}
