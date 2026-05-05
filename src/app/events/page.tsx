import type { Metadata } from "next";
import { EventsPage } from "@/components/pages/EventsPage";

export const metadata: Metadata = {
  title: "Events",
  description: "Tiger Partners news, dynamics, and industry events.",
};

export default function Page() {
  return <EventsPage />;
}
