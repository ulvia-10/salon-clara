import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { SALON_INFO } from '../data/constants'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Buka WhatsApp dengan pesan pre-filled
 * @param {string} message - Pesan yang akan dikirim
 */
export function openWhatsApp(message = '') {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || SALON_INFO.whatsapp
  const defaultMessage = message || 'Halo Clara Beauty Salon! Saya ingin menanyakan informasi layanan dan booking.'
  const encoded = encodeURIComponent(defaultMessage)
  window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank', 'noopener,noreferrer')
}

/**
 * Format harga ke Rupiah
 * @param {number} price
 */
export function formatRupiah(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

/**
 * Truncate text
 * @param {string} text
 * @param {number} maxLength
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
