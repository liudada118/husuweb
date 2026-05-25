import { CmsStudio } from "../components/CmsStudio";
import { getCmsBootstrapData } from "@/lib/cms-db";
import { getCmsDashboardMetrics } from "@/lib/cms-dashboard";
import { requireCmsUser } from "@/lib/cms-session";

export default async function CmsPage() {
  const user = await requireCmsUser();
  const data = {
    ...getCmsBootstrapData(user.id),
    dashboard: getCmsDashboardMetrics(),
  };

  return <CmsStudio initialData={data} />;
}
