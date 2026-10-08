import type { Metadata } from "next";
import { ScrollBlur } from "../components/scroll-blur";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onchain Academy - Vietnam On-chain Hub",
  description:
    "Your gateway to the Vietnam On-chain Economy. Education, research, and global connections to shape the future of finance.",
  metadataBase: new URL("https://on-chain.academy"),
  icons: {
    icon: [
      { url: "/favicon-light.jpg", type: "image/jpeg", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: "On-chain Academy — Vietnam On-chain Hub",
    description: "A new economy is taking shape in Vietnam.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}<ScrollBlur /></body>
    </html>
  );
}
