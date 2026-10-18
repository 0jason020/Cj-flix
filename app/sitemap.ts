import type { MetadataRoute } from 'next'
import { api } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cjflix.com'

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
    const [moviesRes, seriesRes] = await Promise.all([
      api.getTrending("movie", "week"),
      api.getTrending("tv", "week"),
    ])

    if (moviesRes.results) {
      const movieEntries = moviesRes.results.slice(0, 50).map((movie) => ({
        url: `${baseUrl}/movie/${movie.id}`,
        priority: 0.6,
      }))
      dynamicEntries.push(...movieEntries)
    }

    if (seriesRes.results) {
      const seriesEntries = seriesRes.results.slice(0, 50).map((show) => ({
        url: `${baseUrl}/series/${show.id}`,
        priority: 0.6,
      }))
      dynamicEntries.push(...seriesEntries)
    }
  } catch (error) {
    console.error('Sitemap generation error:', error)
  }

  return [...staticPages, ...dynamicEntries]
}