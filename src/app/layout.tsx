import type { Metadata, Viewport } from "next";
import { AppProviders } from "@/components/layout/AppProviders";
import { assetUrl } from "@/lib/assets";
import "./globals.css";

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
  const poppinsUrl = assetUrl("/font/poppins.ttf");

  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
@font-face {
  font-family: "Poppins";
  src: url("${poppinsUrl}") format("truetype");
  font-display: swap;
  font-weight: 100 900;
}
:root { --font-poppins: "Poppins"; }
`,
          }}
        />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
