import SeoHead from '../components/SeoHead'
import TestimonialCard from '../components/TestimonialCard'
import { TESTIMONIALS } from '../data/constants'
import { openWhatsApp } from '../lib/utils'

const AVG_RATING = (
  TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0) / TESTIMONIALS.length
).toFixed(1)

export default function Testimonials() {
  return (
    <>
      <SeoHead
        title="Testimoni Pelanggan Clara Beauty Salon"
        description="Baca pengalaman nyata pelanggan Clara Beauty Salon tentang sulam alis, facial, dan perawatan rambut. Rating 4.9/5 dari 150+ ulasan."
        path="/testimoni"
      />

      <div className="pt-24 pb-16">
        <div className="bg-hero-gradient py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-clara-900 mb-3">
              Kata Mereka Tentang Kami
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Ribuan pelanggan telah merasakan manfaat perawatan di Clara Beauty Salon.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="text-center">
                <p className="text-4xl font-semibold text-clara-700">{AVG_RATING}</p>
                <p className="text-sm text-gray-500">Rating Rata-rata</p>
                <div className="flex gap-1 justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-clara-400 text-lg">★</span>
                  ))}
                </div>
              </div>
              <div className="w-px h-14 bg-clara-200" />
              <div className="text-center">
                <p className="text-4xl font-semibold text-clara-700">150+</p>
                <p className="text-sm text-gray-500">Total Ulasan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>

          {/* Write review CTA */}
          <div className="text-center bg-clara-50 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-clara-800 mb-2">
              Sudah pernah ke Clara Beauty?
            </h2>
            <p className="text-gray-500 mb-5 text-sm">
              Ceritakan pengalamanmu! Feedback kamu sangat berarti untuk kami berkembang.
            </p>
            <button
              onClick={() => openWhatsApp('Halo! Saya ingin berbagi pengalaman saya di Clara Beauty Salon 💕')}
              className="btn-primary"
            >
              <span>💬</span>
              Bagikan Pengalamanmu
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
