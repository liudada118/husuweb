import { CmsLogin } from "../../components/CmsLogin";
import { getCmsSessionUser } from "@/lib/cms-session";
import { redirect } from "next/navigation";

export default async function CmsLoginPage() {
  const user = await getCmsSessionUser();

  if (user) {
    redirect("/cms");
  }

  return <CmsLogin />;
}
