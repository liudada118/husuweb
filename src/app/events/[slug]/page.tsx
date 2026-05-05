import type { Metadata } from "next";
import { EventDetailPage } from "@/components/pages/EventDetailPage";
import { events } from "@/components/pages/EventsPage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug) ?? events[0];

  return {
    title: event.title,
    description: event.summary,
  };
}

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <EventDetailPage slug={slug} />;
}
