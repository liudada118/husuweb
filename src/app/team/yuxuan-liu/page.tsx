import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamProfilePage } from "@/components/pages/TeamProfilePage";
import { getTeamProfile } from "@/data/teamProfiles";

export const metadata: Metadata = {
  title: "Yuxuan Liu",
  description: "Profile of Yuxuan Liu, Managing Partner at Tiger Partners.",
};

export default function Page() {
  const profile = getTeamProfile("yuxuan-liu");
  if (!profile) notFound();

  return <TeamProfilePage profile={profile} />;
}
