import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import { SALON_INFO, SERVICES } from '../data/constants'
import { openWhatsApp } from '../lib/utils'
import { contactAPI } from '../api/services'

const initialForm = {
  name: '',
  phone: '',
  service: '',
  date: '',
  message: '',
}

const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Clara Beauty Salon Malang',
  image: 'https://claraabeautysalon.com/og-image.jpg',
  telephone: '+6281553469549',
  email: '[EMAIL_ADDRESS]',
  url: 'https://claraabeautysalon.com',
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
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const service = SERVICES.find((s) => s.id === parseInt(form.service))
      const msg = [
        `Halo Clara Beauty! Saya ingin booking perawatan.`,
        `\nNama: ${form.name}`,
        form.phone ? `No HP: ${form.phone}` : '',
        service ? `Layanan: ${service.name}` : '',
        form.date ? `Tanggal: ${form.date}` : '',
        form.message ? `Pesan: ${form.message}` : '',
      ]
        .filter(Boolean)
        .join('\n')

      openWhatsApp(msg)
      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      setError('Gagal mengirim. Silakan coba melalui WhatsApp langsung.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SeoHead
        title="Kontak & Booking Sulam Alis, Facial Clara Beauty Salon Malang"
        description="Hubungi & booking perawatan di Clara Beauty Salon Malang. Lokasi: Malang Selatan. Konsultasi gratis via WhatsApp: 081553469549."
        keywords="kontak clara beauty salon, booking sulam alis malang, alamat salon kecantikan malang, whatsapp clara beauty"
        path="/kontak"
        schemaData={CONTACT_SCHEMA}
        breadcrumbs={[
          { name: 'Beranda', path: '/' },
          { name: 'Kontak', path: '/kontak' },
        ]}
      />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="bg-hero-gradient py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-clara-900 mb-3">
              Hubungi & Booking
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Siap melayanimu. Booking sekarang dan dapatkan konsultasi gratis!
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold text-clara-800 mb-6">Informasi Kontak</h2>

              <div className="space-y-4 mb-8">
                <a
                  href={`https://wa.me/${SALON_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 card hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <span className="text-xl">💬</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">WhatsApp</p>
                    <p className="text-clara-500 text-sm">{SALON_INFO.phone}</p>
                  </div>
                </a>

                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="flex items-center gap-4 p-4 card hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-clara-100 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-clara-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Telepon</p>
                    <p className="text-clara-500 text-sm">{SALON_INFO.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${SALON_INFO.email}`}
                  className="flex items-center gap-4 p-4 card hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-clara-100 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-clara-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Email</p>
                    <p className="text-clara-500 text-sm">{SALON_INFO.email}</p>
                  </div>
                </a>

                <a
                  href={SALON_INFO.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 card hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-clara-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-clara-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Alamat</p>
                    <p className="text-clara-500 text-sm">{SALON_INFO.address}</p>
                  </div>
                </a>
              </div>

              {/* Hours */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-clara-500" />
                  <h3 className="font-semibold text-clara-800">Jam Operasional</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Senin – Jumat</span>
                    <span className="font-medium text-gray-700">09.00 – 20.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sabtu – Minggu</span>
                    <span className="font-medium text-gray-700">09.00 – 18.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <h2 className="text-xl font-semibold text-clara-800 mb-6">Form Booking</h2>

              {success ? (
                <div className="card p-8 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-semibold text-clara-800 text-lg mb-2">Booking Terkirim!</h3>
                  <p className="text-gray-500 text-sm mb-5">
                    WhatsApp kamu akan terbuka dengan detail booking. Tim kami siap membantu!
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-outline text-sm"
                  >
                    Booking Lagi
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Nama kamu"
                        className="w-full px-4 py-2.5 border border-clara-200 rounded-xl text-sm 
                                   focus:outline-none focus:ring-2 focus:ring-clara-300 focus:border-transparent
                                   placeholder:text-gray-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        No. WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-2.5 border border-clara-200 rounded-xl text-sm 
                                   focus:outline-none focus:ring-2 focus:ring-clara-300 focus:border-transparent
                                   placeholder:text-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Pilih Layanan
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-clara-200 rounded-xl text-sm 
                                 focus:outline-none focus:ring-2 focus:ring-clara-300 focus:border-transparent
                                 text-gray-700 transition-all bg-white"
                    >
                      <option value="">Pilih layanan...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {s.priceDisplay}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Tanggal Booking
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 border border-clara-200 rounded-xl text-sm 
                                 focus:outline-none focus:ring-2 focus:ring-clara-300 focus:border-transparent
                                 text-gray-700 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Pesan / Permintaan Khusus
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Ceritakan kebutuhanmu atau pertanyaan yang ingin kamu tanyakan..."
                      className="w-full px-4 py-2.5 border border-clara-200 rounded-xl text-sm 
                                 focus:outline-none focus:ring-2 focus:ring-clara-300 focus:border-transparent
                                 placeholder:text-gray-400 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-whatsapp justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Mengirim...</span>
                    ) : (
                      <>
                        <span>💬</span>
                        Kirim via WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    Form ini akan membuka WhatsApp dengan detail booking kamu.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
