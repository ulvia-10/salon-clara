import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import ServiceCard from '../components/ServiceCard'
import { SERVICES, SERVICE_CATEGORIES } from '../data/constants'
import { openWhatsApp } from '../lib/utils'

const FAQS = [
  {
    q: 'Berapa lama daya tahan sulam alis microblading di Clara Beauty Salon Malang?',
    a: 'Sulam alis microblading dan ombre di Clara Beauty Salon dapat bertahan antara 1 hingga 2 tahun, tergantung jenis kulit dan perawatan setelah sulam (aftercare). Kami juga memberikan garansi free touch up 1 kali dalam 1 bulan pertama.',
  },
  {
    q: 'Apakah proses sulam alis dan facial di Clara Beauty Salon terasa sakit?',
    a: 'Sama sekali tidak! Sebelum proses sulam alis dimulai, kami mengaplikasikan krim anastesi lokal berkualitas tinggi sehingga kamu akan merasa nyaman selama proses berlangsung. Untuk perawatan facial, semua dilakukan dengan lembut dan rileks.',
  },
  {
    q: 'Apakah produk pigmen dan skincare yang digunakan aman dan terdaftar BPOM?',
    a: 'Ya, seluruh pigmen sulam alis dan produk skincare facial yang kami gunakan 100% aman, berkualitas premium, serta terdaftar resmi di BPOM.',
  },
  {
    q: 'Bagaimana cara booking jadwal perawatan di Clara Beauty Salon Malang?',
    a: 'Kamu dapat melakukan booking langsung secara online melalui tombol WhatsApp di website ini atau mengisi form booking di halaman Kontak. Tim kami akan segera mengonfirmasi ketersediaan slot jam treatment kamu.',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState(null)

  const filtered =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <>
      <SeoHead
        title="Daftar Layanan & Harga Sulam Alis, Facial, Rambut Malang"
        description="Temukan semua layanan kecantikan Clara Beauty Salon: sulam alis microblading, facial brightening & anti-aging, potong rambut, keratin, manicure, pedicure di Malang."
        keywords="layanan sulam alis malang, harga sulam alis malang, facial malang, potong rambut malang, keratin treatment malang, manicure malang"
        path="/layanan"
        schemaData={FAQ_SCHEMA}
        breadcrumbs={[
          { name: 'Beranda', path: '/' },
          { name: 'Layanan', path: '/layanan' },
        ]}
      />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="bg-hero-gradient py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-clara-900 mb-3">
              Semua Layanan & Price List Perawatan Malang
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Pilih perawatan kecantikan yang kamu butuhkan. Dikerjakan oleh terapis profesional bersertifikat dengan bahan premium.
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

          {/* FAQ Accordion Section for Rich Snippets SEO */}
          <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-clara-100 shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 bg-clara-50 text-clara-600 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3">
                <HelpCircle className="w-4 h-4 text-clara-500" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl font-bold text-clara-900">
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Informasi penting seputar perawatan sulam alis, facial, dan ketersediaan slot di Clara Beauty Salon.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={idx}
                    className="border border-clara-100 rounded-2xl overflow-hidden transition-all bg-clara-50/40 hover:border-clara-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-5 py-4 text-left font-semibold text-clara-900 flex justify-between items-center gap-4 text-sm sm:text-base focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-clara-500 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-gray-600 border-t border-clara-100/60 pt-3 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 text-center bg-clara-50 rounded-2xl p-8 border border-clara-100">
            <h2 className="text-xl font-semibold text-clara-800 mb-2">
              Tidak menemukan layanan yang kamu cari?
            </h2>
            <p className="text-gray-500 mb-5 text-sm">
              Hubungi kami langsung via WhatsApp — kami siap membantu dan memberikan rekomendasi perawatan terbaik.
            </p>
            <button
              onClick={() => openWhatsApp('Halo Clara Beauty! Saya ingin tanya tentang layanan kecantikan yang tersedia.')}
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

