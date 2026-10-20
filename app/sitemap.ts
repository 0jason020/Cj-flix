import type { MetadataRoute } from 'next'
import { api } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL

  // Static pages with SEO priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/movie`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/series`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Fetch trending movies and series for dynamic URLs
  const dynamicEntries: MetadataRoute.Sitemap = []

  try {
    const pages = [1, 2, 3]
    const [moviePages, seriesPages] = await Promise.all([
      Promise.all(pages.map((page) => api.getTrending("movie", "week", page))),
      Promise.all(pages.map((page) => api.getTrending("tv", "week", page))),
    ])

    const movies = moviePages.flatMap((result) => result.results ?? [])
    const series = seriesPages.flatMap((result) => result.results ?? [])

    if (movies.length) {
      const movieEntries = movies.map((movie) => ({
        url: `${baseUrl}/movie/${movie.id}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
      dynamicEntries.push(...movieEntries)
    }

    if (series.length) {
      const seriesEntries = series.map((show) => ({
        url: `${baseUrl}/series/${show.id}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
      dynamicEntries.push(...seriesEntries)
    }
  } catch (error) {
    console.error('Sitemap generation error:', error)
  }

  return [...staticPages, ...dynamicEntries]
}
