import { Link } from '@tanstack/react-router'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
      <div className="text-center px-4">
        <div className="text-6xl mb-4">💕</div>
        <h1 className="text-4xl font-semibold text-clara-900 mb-3">404</h1>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Halaman yang kamu cari tidak ditemukan. Yuk kembali ke halaman utama!
        </p>
        <Link to="/" className="btn-primary">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
