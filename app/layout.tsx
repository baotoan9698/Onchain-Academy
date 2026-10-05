import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Onchain Academy - Vietnam On-chain Hub",
  description:
    "Your gateway to the Vietnam On-chain Economy. Education, research, and global connections to shape the future of finance.",
  metadataBase: new URL("https://on-chain.academy"),
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
      <body>{children}</body>
    </html>
  );
}
