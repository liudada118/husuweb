import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AppProviders } from "@/components/layout/AppProviders";
import "./globals.css";

const poppins = localFont({
  src: "../font/poppins.ttf",
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tiger Partners",
    template: "%s | Tiger Partners",
  },
  description:
    "Tiger Partners is a boutique law firm focused on major and complex civil and commercial dispute resolution.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
