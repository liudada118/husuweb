import type { Metadata } from "next";
import { IndustriesPage } from "@/components/pages/IndustriesPage";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industries and services covered by Tiger Partners dispute resolution practice.",
};

export default function Page() {
  return <IndustriesPage />;
}
