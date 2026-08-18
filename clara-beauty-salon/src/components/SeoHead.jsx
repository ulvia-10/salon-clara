import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://claraabeautysalon.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

export default function SeoHead({
  title = 'Clara Beauty Salon - Sulam Alis, Facial & Salon Profesional Malang',
  description = 'Clara Beauty Salon - Layanan sulam alis microblading, facial brightening, perawatan rambut, dan manicure profesional di Malang. Terapis berpengalaman & harga terjangkau.',
  keywords = 'sulam alis malang, facial malang, salon kecantikan malang, microblading malang, facial brightening malang, potong rambut malang, clara beauty salon',
  image = DEFAULT_IMAGE,
  path = '',
  type = 'website',
  schemaData = null,
  breadcrumbs = null,
}) {
  const fullTitle = title.includes('Clara Beauty') ? title : `${title} | Clara Beauty Salon Malang`
  const canonicalUrl = `${BASE_URL}${path}`

  // Standard Breadcrumb Schema if provided
  const breadcrumbSchema = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${BASE_URL}${item.path}`,
        })),
      }
    : null

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Geo Location Tags for Local SEO Malang */}
      <meta name="geo.region" content="ID-JI" />
      <meta name="geo.placename" content="Malang" />
      <meta name="geo.position" content="-7.9797000;112.6304000" />
      <meta name="ICBM" content="-7.9797000, 112.6304000" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content="Clara Beauty Salon" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Dynamic JSON-LD Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}

      {/* Dynamic Breadcrumbs Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  )
}

