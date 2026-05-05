import type { Metadata } from "next";
import { TeamPage } from "@/components/pages/TeamPage";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Tiger Partners team page, introducing the firm's dispute resolution professionals.",
};

export default function Page() {
  return <TeamPage />;
}
