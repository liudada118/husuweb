import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";

export const metadata: Metadata = {
  title: {
    absolute: "虎诉律师事务所 | Tiger Partners",
  },
  description:
    "虎诉律师事务所（Tiger Partners）是一家专注于重大、复杂民商事争议解决的精品律师事务所，为客户提供专业、高效、精准的争议解决法律服务。",
  keywords: [
    "虎诉律师事务所",
    "Tiger Partners",
    "争议解决",
    "商事诉讼",
    "商事仲裁",
    "精品律师事务所",
  ],
  alternates: {
    canonical: "https://www.tigerpartners.cn/",
  },
  openGraph: {
    title: "虎诉律师事务所 | Tiger Partners",
    description:
      "虎诉律师事务所（Tiger Partners）专注于重大、复杂民商事争议解决，为客户提供专业、高效、精准的法律服务。",
    url: "https://www.tigerpartners.cn/",
    siteName: "Tiger Partners",
    type: "website",
  },
};

export default function Page() {
  return <HomePage />;
}
