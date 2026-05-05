import type { Metadata } from "next";
import { TeamProfilePage } from "@/components/pages/TeamProfilePage";

export const metadata: Metadata = {
  title: "Yuxuan Liu",
  description: "Profile of Yuxuan Liu, Managing Partner at Tiger Partners.",
};

export default function Page() {
  return <TeamProfilePage />;
}
