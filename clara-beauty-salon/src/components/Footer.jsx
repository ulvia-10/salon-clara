import { Link } from '@tanstack/react-router'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import { SALON_INFO, NAV_LINKS } from '../data/constants'
import { openWhatsApp } from '../lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-clara-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-clara-400 flex items-center justify-center">
                <span className="text-white text-sm">✨</span>
              </div>
              <span className="font-semibold text-lg">{SALON_INFO.name}</span>
            </div>
            <p className="text-clara-200 text-sm leading-relaxed mb-4">
              Percantik diri dengan perawatan premium. Terapis berpengalaman, hasil sempurna, harga terjangkau.
            </p>
            <div className="flex gap-3">
              <a
                href={SALON_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-clara-800 hover:bg-clara-600 flex items-center justify-center transition-colors"
                aria-label="Instagram Clara Beauty Salon"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-clara-800 hover:bg-clara-600 flex items-center justify-center transition-colors"
                aria-label="Facebook Clara Beauty Salon"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-clara-200 mb-4">
              Halaman
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-clara-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-clara-200 mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="flex items-center gap-2 text-clara-300 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {SALON_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SALON_INFO.email}`}
                  className="flex items-center gap-2 text-clara-300 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {SALON_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={SALON_INFO.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-clara-300 hover:text-white text-sm transition-colors"
                >
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  {SALON_INFO.address}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours + CTA */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-clara-200 mb-4">
              Jam Operasional
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm text-clara-300">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-clara-400" />
                {SALON_INFO.hours.weekdays}
              </li>
              <li className="flex items-start gap-2 text-sm text-clara-300">
                <Clock className="w-4 h-4 shrink-0 mt-0.5 text-clara-400" />
                {SALON_INFO.hours.weekend}
              </li>
            </ul>
            <button
              onClick={() => openWhatsApp('Halo Clara Beauty! Saya ingin booking treatment. Apa ada slot tersedia?')}
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 
                         text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-all"
            >
              <span>💬</span>
              WhatsApp Kami
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-clara-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-clara-400 text-xs">
            © {currentYear} {SALON_INFO.name}. All rights reserved.
          </p>
          <p className="text-clara-500 text-xs">
            Made with 💕 for beauty lovers
          </p>
        </div>
      </div>
    </footer>
  )
}
