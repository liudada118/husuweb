import type { Metadata } from "next";
import { IndustryDetailPage } from "@/components/pages/IndustryDetailPage";
import {
  defaultIndustryMetadata,
  industryMetadata,
  type IndustryMetadataSlug,
} from "@/data/industryMetadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryMetadata[slug as IndustryMetadataSlug] ?? defaultIndustryMetadata;

  return {
    title: industry.title,
    description: industry.intro,
  };
}

export function generateStaticParams() {
  return Object.keys(industryMetadata).map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <IndustryDetailPage slug={slug} />;
}
