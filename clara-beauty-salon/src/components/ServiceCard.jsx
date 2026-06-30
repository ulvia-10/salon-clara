import { Clock, CheckCircle } from 'lucide-react'
import { openWhatsApp, formatRupiah } from '../lib/utils'

export default function ServiceCard({ service, variant = 'default' }) {
  const handleBook = () => {
    openWhatsApp(
      `Halo Clara Beauty! Saya tertarik dengan layanan *${service.name}*. Bisa info ketersediaan slot dan detail harga?`
    )
  }

  if (variant === 'compact') {
    return (
      <div className="card p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer group" onClick={handleBook}>
        <div className="text-3xl mb-3">{service.emoji}</div>
        <h3 className="font-semibold text-clara-800 mb-1 text-sm">{service.name}</h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{service.description}</p>
        <p className="text-clara-500 font-semibold text-sm">{service.priceDisplay}</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden hover:-translate-y-1 transition-all duration-300">
      {service.popular && (
        <div className="bg-clara-400 text-white text-xs font-medium px-4 py-1.5 text-center">
          ⭐ Paling Populer
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-3xl mb-2">{service.emoji}</div>
            <h3 className="font-semibold text-clara-800 text-base">{service.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-clara-500 font-semibold text-sm">{service.priceDisplay}</p>
            <div className="flex items-center gap-1 mt-1 justify-end">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400 text-xs">{service.duration}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.description}</p>

        {service.features && (
          <ul className="space-y-1.5 mb-5">
            {service.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle className="w-3.5 h-3.5 text-clara-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleBook}
          className="w-full btn-primary justify-center text-sm py-2.5"
        >
          <span>💬</span>
          Booking Layanan Ini
        </button>
      </div>
    </div>
  )
}
