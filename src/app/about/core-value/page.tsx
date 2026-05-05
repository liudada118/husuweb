import type { Metadata } from "next";
import { CoreValuePage } from "@/components/pages/CoreValuePage";

export const metadata: Metadata = {
  title: "Core Value",
  description: "Tiger Partners culture and core values.",
};

export default function Page() {
  return <CoreValuePage />;
}
