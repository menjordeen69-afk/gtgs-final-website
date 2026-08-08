import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GTGS | Global Technology & General Services - Sierra Leone",
    template: "%s | GTGS",
  },
  description:
    "Global Technology & General Services (GTGS) is a vocational and technology training institution in Sierra Leone offering practical courses in ICT, Graphic Design, Catering, Cosmetology, Entrepreneurship, Soap Making, Gara Tie-Dye, and other career-focused programs. Join GTGS to gain practical skills, professional certification, and opportunities for personal and business growth.",
  keywords: [
    "GTGS",
    "Global Technology and General Services",
    "Sierra Leone",
    "vocational training",
    "practical skills",
    "ICT training",
    "graphic design",
    "catering training",
    "cosmetology",
    "beauty therapy",
    "entrepreneurship",
    "soap making",
    "gara tie-dye",
    "digital marketing",
    "small business management",
    "professional certification",
    "career development",
    "Freetown",
    "skills development",
    "youth empowerment",
    "admission",
    "apply now",
  ],
  authors: [{ name: "Global Technology & General Services" }],
  creator: "Global Technology & General Services",
  publisher: "GTGS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "GTGS | Global Technology & General Services",
    description:
      "Empowering Skills. Transforming Lives. Building the Future. Practical vocational training in Sierra Leone.",
    url: "https://gtgs.edu.sl",
    siteName: "GTGS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GTGS - Global Technology & General Services, Sierra Leone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GTGS | Global Technology & General Services",
    description:
      "Empowering Skills. Transforming Lives. Building the Future. Apply now for practical vocational training in Sierra Leone.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://gtgs.edu.sl"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Global Technology & General Services",
    alternateName: "GTGS",
    url: "https://gtgs.edu.sl",
    description:
      "A Sierra Leonean vocational and professional training institution dedicated to equipping young people and adults with practical skills for employment, entrepreneurship, and lifelong success.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Freetown",
      addressCountry: "SL",
    },
    sameAs: [
      "https://www.tiktok.com/@globaltechnology.sl",
    ],
    slogan: "Empowering Skills. Transforming Lives. Building the Future.",
    knowsAbout: [
      "ICT Fundamentals",
      "Graphic Design",
      "Digital Marketing",
      "Cosmetology",
      "Catering",
      "Entrepreneurship",
      "Soap Making",
      "Gara Tie-Dye",
    ],
    offers: [
      { "@type": "Course", name: "ICT Fundamentals", description: "Computer basics and digital literacy training" },
      { "@type": "Course", name: "Graphic Design", description: "Creative design and digital media training" },
      { "@type": "Course", name: "Digital Marketing", description: "Social media management and online marketing" },
      { "@type": "Course", name: "Cosmetology", description: "Beauty therapy and skincare training" },
      { "@type": "Course", name: "Catering", description: "Professional cooking and food services training" },
      { "@type": "Course", name: "Entrepreneurship", description: "Business and startup development training" },
      { "@type": "Course", name: "Soap Making", description: "Production of soaps and cleaning products" },
      { "@type": "Course", name: "Gara Tie-Dye", description: "Traditional fabric design and textile skills" },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
