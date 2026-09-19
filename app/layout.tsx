import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://giftsglam.vercel.app"),

  title: {
    default: "GiftsGlam | Luxury Home Decoration & Interior Styling",
    template: "%s | GiftsGlam",
  },

  description:
    "Luxury home decoration, interior styling, floral arrangements, event decoration, gift hampers, and elegant décor in Burundi by GiftsGlam.",

  keywords: [
    "Home Decor Burundi",
    "Interior Designer Burundi",
    "Luxury Home Decoration",
    "Gift Hampers Burundi",
    "Wedding Decoration Burundi",
    "Living Room Decoration",
    "Bedroom Styling",
    "Office Decoration",
    "GiftsGlam",
  ],

  authors: [{ name: "GiftsGlam" }],
  creator: "GiftsGlam",

  openGraph: {
    title: "GiftsGlam | Luxury Home Decoration",
    description:
      "Elegant home décor, weddings, floral styling and luxury interior decoration.",
    url: "https://giftsglam.vercel.app",
    siteName: "GiftsGlam",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GiftsGlam Luxury Home Decoration",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GiftsGlam Luxury Home Decoration",
    description:
      "Elegant home décor and interior styling by GiftsGlam.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
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
      <body className="bg-[#FAF8F2] text-black antialiased">
        {children}
      </body>
    </html>
  );
}