import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Worksheet",
  description: "Worksheet for the Build Your Board of AI Advisors workshop",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
