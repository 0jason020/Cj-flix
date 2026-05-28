import type { Metadata } from "next";

// SEO Metadata builder helper
export const createPageMetadata = (
  title: string,
  description: string,
  path: string = "",
  ogImage?: string
): Metadata => {
  const baseUrl = "https://cjflix.com";
  const url = `${baseUrl}${path}`;

  return {
    title: `${title} | CJ FLIX`,
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
    authors: [{ name: "CJ FLIX" }],
    creator: "CJ FLIX",
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "CJ FLIX",
      title: `${title} | CJ FLIX`,
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
      card: "summary_large_image",
      title: `${title} | CJ FLIX`,
      description,
      creator: "@cjflix",
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
