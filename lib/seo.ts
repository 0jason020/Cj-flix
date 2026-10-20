import type { Metadata } from "next";

export const SITE_NAME = "Craft Movies";
export const SITE_URL = "https://cjflix.com";

// SEO Metadata builder helper
export const createPageMetadata = (
  title: string,
  description: string,
  path: string = "",
  ogImage?: string
): Metadata => {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: [
      "movies",
      "streaming",
      "tv series",
      "cinema",
      "film",
      "watch online",
      "video streaming",
      title.toLowerCase(),
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
};

// Generate structured data for movies/series
export const generateMovieSchema = (
  title: string,
  description: string,
  image?: string,
  releaseDate?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: title,
    description,
    image,
    datePublished: releaseDate,
  };
};

export const generateSeriesSchema = (
  title: string,
  description: string,
  image?: string,
  numberOfSeasons?: number
) => {
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: title,
    description,
    image,
    numberOfSeasons,
  };
};

// Breadcrumb schema generator
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
