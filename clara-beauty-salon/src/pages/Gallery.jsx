import { useState } from 'react'
import { Star, Heart, X, ChevronLeft, ChevronRight, Sparkles, MessageCircle, Instagram, ShieldCheck, Eye } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import { openWhatsApp } from '../lib/utils'
import { GALLERY_ITEMS } from '../data/galleryData'

const CATEGORIES = [
  { key: 'all', label: 'Semua Portofolio', icon: '✨' },
  { key: 'sulam', label: 'Sulam Alis', icon: '🎨' },
  { key: 'facial', label: 'Facial & Skincare', icon: '💎' },
  { key: 'rambut', label: 'Perawatan Rambut', icon: '💇' },
  { key: 'kuku', label: 'Kuku & Spa', icon: '💅' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [likedMap, setLikedMap] = useState({})

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory)

  const toggleLike = (e, id) => {
    e.stopPropagation()
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Lightbox Navigation
  const handleNextModal = () => {
    if (!selectedItem) return
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id)
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setSelectedItem(filteredItems[nextIndex])
  }

  const handlePrevModal = () => {
    if (!selectedItem) return
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id)
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedItem(filteredItems[prevIndex])
  }

  return (
    <>
      <SeoHead
        title="Galeri Hasil Perawatan & Transformasi Real - Clara Beauty Salon Malang"
        description="Lihat galeri foto hasil sulam alis microblading, facial brightening, keratin treatment, dan manicure gel di Clara Beauty Salon Malang. Transformasi nyata dari pelanggan kami."
        keywords="galeri sulam alis malang, foto sebelum sesudah sulam alis, hasil facial malang, foto salon kecantikan malang"
        path="/galeri"
        breadcrumbs={[
          { name: 'Beranda', path: '/' },
          { name: 'Galeri', path: '/galeri' },
        ]}
      />

      <div className="pt-24 pb-16 bg-gradient-to-b from-clara-50/50 via-white to-clara-50/30">
        
        {/* Header Hero Banner */}
        <section className="bg-hero-gradient py-14 border-b border-clara-100/60 relative overflow-hidden">
          <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-clara-200/25 blur-3xl pointer-events-none -translate-y-1/2" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-clara-100 text-clara-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm border border-clara-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              Real Results & Transformations
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-clara-950 mb-3 tracking-tight">
              Galeri Hasil Perawatan
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Transformasi nyata pelanggan setia Clara Beauty Salon. Keindahan alami, hasil presisi, dan kepuasan terjamin.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-10">
            {CATEGORIES.map((cat) => {
              const count =
                cat.key === 'all'
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((i) => i.category === cat.key).length

              const isActive = activeCategory === cat.key

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-clara-500 to-rose-500 text-white shadow-lg shadow-clara-400/30 scale-105'
                      : 'bg-white text-clara-800 border border-clara-200 hover:border-clara-400 hover:bg-clara-50 shadow-sm'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-clara-800 font-bold' : 'bg-clara-100 text-clara-700'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Gallery Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isLiked = likedMap[item.id]
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-clara-100 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-clara-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      {item.isBeforeAfter ? (
                        <span className="bg-gradient-to-r from-amber-400 to-rose-500 text-clara-950 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-md">
                          ⚡ Before & After
                        </span>
                      ) : (
                        <span className="bg-black/50 backdrop-blur-md text-white font-medium text-[11px] px-3 py-1 rounded-full border border-white/20">
                          {item.subtitle}
                        </span>
                      )}

                      {/* Like button */}
                      <button
                        onClick={(e) => toggleLike(e, item.id)}
                        className={`p-2 rounded-full backdrop-blur-md transition-transform duration-300 active:scale-75 ${
                          isLiked
                            ? 'bg-rose-500 text-white'
                            : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60'
                        }`}
                        title="Sukai foto ini"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* Hover Quick Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-clara-950/40 backdrop-blur-[2px]">
                      <span className="bg-white text-clara-900 text-xs font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                        <Eye className="w-4 h-4 text-clara-500" />
                        Lihat Foto & Detail
                      </span>
                    </div>

                    {/* Customer Rating & Category Footer on Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                      <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-1">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-300" /> {item.rating}.0 ({item.customer})
                        </span>
                        <span className="text-white/80 font-normal text-[11px] flex items-center gap-1">
                          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> {item.likes + (isLiked ? 1 : 0)}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-clara-200 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom Summary */}
                  <div className="p-4 bg-white flex items-center justify-between border-t border-clara-50">
                    <span className="text-xs text-gray-500 font-medium line-clamp-1">
                      {item.description}
                    </span>
                    <span className="text-xs font-bold text-clara-500 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                      Detail &rarr;
                    </span>
                  </div>

                </div>
              )
            })}
          </div>

          {/* Social Proof & Instagram Banner */}
          <div className="mt-16 bg-gradient-to-r from-clara-800 via-clara-900 to-purple-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full border border-white/20">
                  <Instagram className="w-3.5 h-3.5" /> @clarabeautysalon
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Ikuti Portofolio Terbaru Kami di Instagram
                </h2>
                <p className="text-clara-100/90 text-sm sm:text-base font-light max-w-xl">
                  Dapatkan update hasil sulam alis harian, promo facial bulanan, dan video transformasi nyata setiap hari.
                </p>
                <div className="flex flex-wrap gap-6 pt-2 text-xs sm:text-sm font-medium text-amber-200">
                  <span>✨ 5.000+ Followers Loyal</span>
                  <span>⭐ 4.9 Rating Google Maps</span>
                  <span>🛡️ Garansi Hasil Satisfied</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <a
                  href="https://www.instagram.com/clarabeautysalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-clara-50 text-clara-900 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <span>Follow Instagram Kami</span>
                </a>

                <button
                  onClick={() => openWhatsApp('Halo Clara Beauty! Saya ingin konsultasi & booking dari halaman Galeri 💕')}
                  className="btn-whatsapp text-center justify-center py-3.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Konsultasi Gratis via WA</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Lightbox Modal Popup ─── */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="relative bg-clara-950 text-white rounded-3xl overflow-hidden max-w-3xl w-full border border-white/20 shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-colors border border-white/20 shadow-lg"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Area */}
            <div className="md:w-1/2 relative bg-black aspect-[4/3] md:aspect-auto flex items-center justify-center overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />

              {/* Prev & Next Modal Navigation */}
              <button
                onClick={handlePrevModal}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-clara-600 text-white border border-white/20 transition-all"
                title="Foto Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextModal}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-clara-600 text-white border border-white/20 transition-all"
                title="Foto Berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Before & After Badge on Image */}
              {selectedItem.isBeforeAfter && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md border border-white/20 p-2.5 rounded-xl text-xs space-y-1 text-center">
                  <span className="text-amber-300 font-bold block">⚡ Transformasi Hasil:</span>
                  <div className="flex justify-around text-[11px] text-white">
                    <span>🔴 {selectedItem.beforeText}</span>
                    <span>➔</span>
                    <span className="text-emerald-400 font-bold">🟢 {selectedItem.afterText}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Content Details */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[50vh] md:max-h-none">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-clara-400 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300" /> {selectedItem.rating}.0 Rating Pelanggan
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedItem.title}
                </h3>

                <p className="text-clara-200 text-xs sm:text-sm leading-relaxed font-light">
                  {selectedItem.description}
                </p>

                <div className="bg-white/10 p-3 rounded-xl border border-white/10 text-xs text-clara-100 space-y-1">
                  <span className="font-semibold text-white block">💬 Ulasan Pelanggan:</span>
                  <p className="italic text-white/90">"{selectedItem.title} - pengerjaan sangat rapi & ramah!"</p>
                  <p className="text-right text-[11px] text-amber-300 font-bold">— {selectedItem.customer}</p>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-3 border-t border-white/15 space-y-2">
                <button
                  onClick={() => openWhatsApp(selectedItem.whatsappMsg)}
                  className="w-full btn-whatsapp py-3.5 justify-center text-sm font-bold shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Booking Treatment Ini via WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-gray-400">
                  Konsultasi gratis & diskon khusus menunggumu ✨
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
