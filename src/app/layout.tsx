import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "What did you do last week?",
  description: "evaluate your five bullet points of what you accomplish to determine if you're hired or fired.",
  icons: {
    icon: [
      { url: './favicon/favicon.ico' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>
        {children} 
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  );
}