import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Tiger Partners and recruitment information.",
};

export default function Page() {
  return <ContactPage />;
}
