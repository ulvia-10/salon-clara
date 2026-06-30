import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://claraabeautysalon.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

export default function SeoHead({
  title = 'Clara Beauty Salon - Sulam Alis, Facial & Salon Profesional Malang',
  description = 'Clara Beauty Salon menawarkan layanan sulam alis microblading, facial brightening, perawatan rambut, dan manicure profesional di Malang.',
  keywords = 'sulam alis jakarta, facial jakarta, salon kecantikan jakarta, microblading, clara beauty salon',
  image = DEFAULT_IMAGE,
  path = '',
  type = 'website',
}) {
  const fullTitle = title.includes('Clara Beauty') ? title : `${title} | Clara Beauty Salon`
  const canonicalUrl = `${BASE_URL}${path}`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content="Clara Beauty Salon" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
