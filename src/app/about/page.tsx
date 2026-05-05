import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Tiger Partners, including vision, honors, culture, and chronicle of firm milestones.",
};

export default function Page() {
  return <AboutPage />;
}
