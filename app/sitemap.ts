import type { MetadataRoute } from 'next'

interface TrendingMedia {
  id: number
  updated_at?: string
}

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
    {
      url: `${baseUrl}/watchlist`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Fetch trending movies and series for dynamic URLs
  const dynamicEntries: MetadataRoute.Sitemap = []

  try {
    const [moviesRes, seriesRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`
      ),
      fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}`
      ),
    ])

    if (moviesRes.ok) {
      const movieData = (await moviesRes.json()) as { results?: TrendingMedia[] }
      const movies = movieData.results || []
      const movieEntries = movies.slice(0, 50).map((movie) => ({
        url: `${baseUrl}/movie/${movie.id}`,
        lastModified: new Date(movie.updated_at || new Date()),
        priority: 0.6,
      }))
      dynamicEntries.push(...movieEntries)
    }

    if (seriesRes.ok) {
      const seriesData = (await seriesRes.json()) as { results?: TrendingMedia[] }
      const series = seriesData.results || []
      const seriesEntries = series.slice(0, 50).map((show) => ({
        url: `${baseUrl}/series/${show.id}`,
        lastModified: new Date(show.updated_at || new Date()),
        priority: 0.6,
      }))
      dynamicEntries.push(...seriesEntries)
    }
  } catch (error) {
    console.error('Sitemap generation error:', error)
  }

  return [...staticPages, ...dynamicEntries]
}