import { useState } from 'react'
import SeoHead from '../components/SeoHead'
import { openWhatsApp } from '../lib/utils'
import { SERVICE_CATEGORIES } from '../data/constants'

// Placeholder items sampai foto real tersedia
const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  category: ['sulam', 'facial', 'rambut', 'kuku'][i % 4],
  label: ['Sulam Alis', 'Facial', 'Rambut', 'Kuku'][i % 4],
  colors: [
    ['#FBEAF0', '#D4537E'],
    ['#F4C0D1', '#993556'],
    ['#ED93B1', '#72243E'],
    ['#FBEAF0', '#B93D66'],
  ][i % 4],
}))

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <>
      <SeoHead
        title="Galeri Hasil Perawatan Clara Beauty Salon"
        description="Lihat galeri hasil sulam alis microblading, facial, perawatan rambut, dan manicure di Clara Beauty Salon Malang. Hasil nyata dari pelanggan kami."
        path="/galeri"
      />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="bg-hero-gradient py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-clara-900 mb-3">
              Galeri Hasil Perawatan
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Lihat transformasi nyata pelanggan kami. Hasil berbicara lebih keras dari kata-kata.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
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

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative"
                style={{ background: `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 group-hover:text-white transition-colors">
                  <span className="text-4xl mb-2">📷</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
                <div className="absolute inset-0 bg-clara-900/0 group-hover:bg-clara-900/20 transition-colors rounded-2xl" />
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-6 mb-10">
            Ganti gambar placeholder dengan foto hasil nyata dari pelangganmu 📸
          </p>

          {/* Instagram CTA */}
          <div className="text-center bg-clara-50 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-clara-800 mb-2">
              Lihat lebih banyak di Instagram kami
            </h2>
            <p className="text-gray-500 mb-5 text-sm">
              Ikuti <span className="font-medium text-clara-600">@clarabeautysalon</span> untuk update terbaru dan inspirasi kecantikan setiap hari.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.instagram.com/clarabeautysalon"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>📷</span>
                Ikuti di Instagram
              </a>
              <button
                onClick={() => openWhatsApp('Halo! Saya ingin booking setelah lihat galeri Clara Beauty 💕')}
                className="btn-whatsapp"
              >
                <span>💬</span>
                Booking Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
