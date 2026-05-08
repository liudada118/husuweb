import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamProfilePage } from "@/components/pages/TeamProfilePage";
import { getTeamProfile, teamProfiles } from "@/data/teamProfiles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getTeamProfile(slug);

  if (!profile) {
    return {
      title: "Team Profile",
      description: "Tiger Partners team profile.",
    };
  }

  return {
    title: profile.name,
    description: `Profile of ${profile.name}, ${profile.title} at Tiger Partners.`,
  };
}

export function generateStaticParams() {
  return teamProfiles
    .filter((profile) => profile.slug !== "yuxuan-liu")
    .map((profile) => ({ slug: profile.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const profile = getTeamProfile(slug);

  if (!profile) notFound();

  return <TeamProfilePage profile={profile} />;
}
