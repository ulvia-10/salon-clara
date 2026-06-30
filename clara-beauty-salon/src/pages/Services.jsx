import { useState } from 'react'
import SeoHead from '../components/SeoHead'
import ServiceCard from '../components/ServiceCard'
import { SERVICES, SERVICE_CATEGORIES } from '../data/constants'
import { openWhatsApp } from '../lib/utils'

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory)

  return (
    <>
      <SeoHead
        title="Layanan Clara Beauty Salon - Sulam Alis, Facial, Rambut & Kuku"
        description="Temukan semua layanan kecantikan Clara Beauty Salon: sulam alis microblading, facial brightening & anti-aging, potong rambut, keratin, manicure, pedicure di Malang."
        keywords="layanan sulam alis malang, facial malang, potong rambut malang, keratin malang, manicure malang"
        path="/layanan"
      />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="bg-hero-gradient py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-clara-900 mb-3">
              Semua Layanan Kami
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Pilih perawatan yang kamu butuhkan. Semua tersedia dengan terapis berpengalaman dan bahan premium.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-clara-400 text-white shadow-clara'
                    : 'bg-clara-50 text-clara-600 hover:bg-clara-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center bg-clara-50 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-clara-800 mb-2">
              Tidak menemukan layanan yang kamu cari?
            </h2>
            <p className="text-gray-500 mb-5 text-sm">
              Hubungi kami langsung — kami siap membantu dan memberikan rekomendasi terbaik.
            </p>
            <button
              onClick={() => openWhatsApp('Halo Clara Beauty! Saya ingin tanya tentang layanan yang tersedia.')}
              className="btn-whatsapp"
            >
              <span>💬</span>
              Tanya via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
