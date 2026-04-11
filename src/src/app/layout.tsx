import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Worksheet",
  description: "Worksheet for the Build Your Board of AI Advisors workshop",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/apple-touch-icon.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
