import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thineth Shehara — Software Engineer",
  description: "Portfolio of Thineth Shehara (Shehara Nayanananda), Software Engineer studying Software Engineering at Tampere University of Applied Sciences (TAMK), Finland.",
  icons: {
    icon: [
      {
        url: "/logo.png",
        href: "/logo.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
