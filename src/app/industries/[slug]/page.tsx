import type { Metadata } from "next";
import { IndustryDetailPage, industries, type IndustrySlug } from "@/components/pages/IndustryDetailPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries[slug as IndustrySlug] ?? industries["private-equity"];

  return {
    title: industry.title,
    description: industry.intro,
  };
}

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <IndustryDetailPage slug={slug} />;
}
