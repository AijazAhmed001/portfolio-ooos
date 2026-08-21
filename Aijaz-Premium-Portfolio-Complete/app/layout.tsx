import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://narmeenportfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Narmeen Siddiqui | Personal Portfolio",
  description:
    "Explore Narmeen Siddiqui's personal portfolio, selected work and educational journey from HPGS to Air University.",
  keywords: [
    "Narmeen Siddiqui",
    "Narmeen Siddiqui portfolio",
    "Narmeen portfolio",
    "Air University student",
    "HPGS",
  ],
  authors: [{ name: "Narmeen Siddiqui", url: siteUrl }],
  creator: "Narmeen Siddiqui",
  publisher: "Narmeen Siddiqui",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: "Narmeen Siddiqui Portfolio",
    title: "Narmeen Siddiqui | Personal Portfolio",
    description:
      "Discover Narmeen Siddiqui's selected work and educational journey.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Narmeen Siddiqui Personal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Narmeen Siddiqui | Personal Portfolio",
    description:
      "Discover Narmeen Siddiqui's selected work and educational journey.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080c14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Narmeen Siddiqui",
              url: siteUrl,
              description:
                "Air University student and HPGS alumna presenting her educational journey and selected work.",
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "HPGS",
              },
              affiliation: {
                "@type": "CollegeOrUniversity",
                name: "Air University",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}

