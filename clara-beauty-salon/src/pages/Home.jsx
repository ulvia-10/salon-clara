import { Link } from '@tanstack/react-router'
import { Star, ArrowRight, Award, Clock, Heart, Shield } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import ServiceCard from '../components/ServiceCard'
import TestimonialCard from '../components/TestimonialCard'
import HeroCarousel from '../components/HeroCarousel'
import { SERVICES, TESTIMONIALS, SALON_INFO } from '../data/constants'
import { openWhatsApp } from '../lib/utils'

const POPULAR_SERVICES = SERVICES.filter((s) => s.popular)
const FEATURED_TESTIMONIALS = TESTIMONIALS.slice(0, 3)

const STATS = [
  { value: '5000+', label: 'Pelanggan Puas', icon: Heart },
  { value: '4.9/5', label: 'Rating Google', icon: Star },
  { value: '8 Tahun', label: 'Pengalaman', icon: Award },
  { value: '10+', label: 'Terapis Expert', icon: Shield },
]

const WHY_US = [
  {
    emoji: '🎓',
    title: 'Terapis Bersertifikat',
    desc: 'Semua terapis berpengalaman dan tersertifikasi dari lembaga kecantikan terpercaya.',
  },
  {
    emoji: '🌿',
    title: 'Bahan Premium & Aman',
    desc: 'Menggunakan bahan-bahan pilihan yang aman, telah teruji dan tersertifikasi BPOM.',
  },
  {
    emoji: '✨',
    title: 'Hasil Terjamin',
    desc: 'Garansi kepuasan. Jika tidak puas, kami siap konsultasikan solusi terbaik.',
  },
  {
    emoji: '💕',
    title: 'Suasana Nyaman',
    desc: 'Ruangan bersih, private, dan nyaman agar kamu rileks selama perawatan.',
  },
]

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Clara Beauty Salon',
  alternateName: 'Clara Beauty Salon Malang',
  description: 'Clara Beauty Salon - Spesialis sulam alis microblading, facial brightening, perawatan rambut, dan manicure profesional di Malang.',
  url: 'https://claraabeautysalon.com',
  telephone: '+6281553469549',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Kecantikan No. 123',
    addressLocality: 'Malang Selatan',
    addressRegion: 'Jawa Timur',
    postalCode: '65141',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -7.9797,
    longitude: 112.6304,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan Kecantikan Clara Beauty Salon Malang',
    itemListElement: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
      },
      price: s.price,
      priceCurrency: 'IDR',
    })),
  },
  sameAs: [
    'https://www.instagram.com/clarabeautysalon',
    'https://www.facebook.com/clarabeautysalon',
  ],
}

export default function Home() {
  return (
    <>
      <SeoHead
        title="Clara Beauty Salon - Sulam Alis, Facial & Salon Profesional Malang"
        description="Clara Beauty Salon menawarkan layanan sulam alis microblading, facial brightening, perawatan rambut, & manicure profesional di Malang. Terapis berpengalaman & harga terjangkau."
        keywords="sulam alis malang, facial malang, salon kecantikan malang, microblading malang, facial brightening malang, potong rambut malang, clara beauty salon"
        path="/"
        schemaData={HOME_SCHEMA}
      />

      {/* ─── Hero Carousel ─── */}
      <HeroCarousel />


      <section className="py-12 bg-white border-b border-clara-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-clara-700 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="section-title">Layanan Unggulan</h2>
          <p className="section-subtitle">
            Perawatan kecantikan terpopuler yang dipilih ribuan pelanggan setia kami
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {POPULAR_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/layanan" className="btn-outline">
              Lihat Semua Layanan
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why Us ─── */}
      <section className="py-16 bg-section-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="section-title">Mengapa Clara Beauty?</h2>
          <p className="section-subtitle">
            Kami berkomitmen memberikan layanan kecantikan terbaik dengan standar tertinggi
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <div key={item.title} className="card p-6 text-center">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-semibold text-clara-800 mb-2 text-sm">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="section-title">Kata Pelanggan Kami</h2>
          <p className="section-subtitle">
            Lebih dari 5000 pelanggan telah merasakan manfaat perawatan di Clara Beauty Salon
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {FEATURED_TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/testimoni" className="btn-outline">
              Baca Semua Testimoni
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-16 bg-clara-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Siap Tampil Cantik & Percaya Diri?
          </h2>
          <p className="text-clara-200 mb-8 max-w-xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan booking jadwal perawatanmu.
          </p>
          <button
            onClick={() => openWhatsApp('Halo Clara Beauty! Saya ingin konsultasi gratis dan booking treatment. Apa ada slot tersedia?')}
            className="btn-whatsapp text-base px-8 py-4"
          >
            <span className="text-xl">💬</span>
            Hubungi Kami di WhatsApp
          </button>
        </div>
      </section>
    </>
  )
}
