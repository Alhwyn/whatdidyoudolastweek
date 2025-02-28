import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "What did you do last week?",
  description: "Sign up for email to get a weekly reminder to reflect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
