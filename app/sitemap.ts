import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.northwestlogburners.co.uk'

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/thank-you`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/areas/oldham`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/areas/bury`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/areas/saddleworth`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/areas/failsworth`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/areas/middleton`,
      lastModified: new Date(),
    },
  ]
}