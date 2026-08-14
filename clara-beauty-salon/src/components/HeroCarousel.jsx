import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Star, ArrowRight, Sparkles, CheckCircle2, Pause, Play, Tag } from 'lucide-react'
import { HERO_SLIDES } from '../data/carouselData'
import { openWhatsApp } from '../lib/utils'

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const timerRef = useRef(null)
  const slideCount = HERO_SLIDES.length

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideCount)
  }, [slideCount])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount)
  }, [slideCount])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Autoplay
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setInterval(() => {
      goToNext()
    }, 4500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, goToNext])

  // Touch Swipe for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) {
      goToNext()
    } else if (distance < -50) {
      goToPrev()
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  const currentSlide = HERO_SLIDES[currentIndex]

  return (
    <section
      className="relative pt-24 pb-14 sm:pt-28 sm:pb-20 bg-clara-950 overflow-hidden select-none min-h-[680px] lg:min-h-[720px] flex items-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Layer with Gradient Crossfade */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Blurred Ambient Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center brightness-[0.35] blur-[3px] scale-105 transition-transform duration-[7000ms]"
          />
          {/* Gradient Overlay for ultra legibility */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
          <div className="absolute inset-0 bg-black/40" />

          {/* Ambient Glow Orbs */}
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-clara-500/25 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-rose-500/25 rounded-full blur-[120px] pointer-events-none" />
        </div>
      ))}

      {/* Main Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Text & Benefits Checklist */}
          <div className="lg:col-span-7 space-y-5 text-white">

            {/* Badges & Rating Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-rose-400 text-clara-950 text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 fill-clara-950" />
                {currentSlide.badge}
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-amber-300 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {currentSlide.rating} ({currentSlide.reviewCount})
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-clara-100/90 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              {currentSlide.subtitle}
            </p>

            {/* Key Benefits Checklist */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Keunggulan Perawatan Ini:
              </p>
              {currentSlide.benefits.map((benefit, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Pricing & Promo Banner */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="bg-white text-clara-900 font-extrabold text-sm sm:text-base px-4 py-2 rounded-xl shadow-lg border border-white/20">
                {currentSlide.priceTag}
              </span>

              <span className="inline-flex items-center gap-1.5 bg-rose-500 text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-md border border-rose-400 animate-pulse">
                <Tag className="w-3.5 h-3.5" />
                {currentSlide.discount}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => openWhatsApp(currentSlide.whatsappMsg)}
                className="btn-whatsapp text-sm sm:text-base px-8 py-3.5 shadow-2xl hover:shadow-green-500/40 flex items-center justify-center gap-2.5 font-bold group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform duration-300">💬</span>
                <span>Booking via WhatsApp</span>
              </button>

              <Link
                to={currentSlide.linkTo}
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span>Lihat Detail Layanan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* Right Column: Visual Photo Card with Floating Badges */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm group">

              {/* Glowing ring frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-clara-400 via-pink-500 to-amber-300 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/5] bg-clara-900">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Badge Top Left */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  {currentSlide.highlight}
                </div>

                {/* Overlay Footer Bottom */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-clara-200 font-bold block mb-1">
                    {currentSlide.category}
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {currentSlide.title}
                  </h3>
                  <p className="text-xs text-amber-300 font-bold mt-1">
                    {currentSlide.priceTag}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Visual Image Thumbnails Navigation Bar */}
        <div className="mt-10 sm:mt-12 border-t border-white/15 pt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-clara-200 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Jelajahi Layanan Favorit Salon:
            </p>

            {/* Pause Autoplay Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-xs text-white/70 hover:text-white flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/15 transition-colors"
            >
              {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-300" />}
              <span>{isPaused ? 'Mulai Auto Slide' : 'Pause Auto Slide'}</span>
            </button>
          </div>

          {/* Grid of Photo Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`relative rounded-2xl overflow-hidden p-2.5 text-left transition-all duration-300 flex items-center gap-3 border ${
                    isActive
                      ? 'bg-gradient-to-r from-clara-600/90 to-rose-600/90 border-white/50 shadow-xl ring-2 ring-clara-400 translate-y-[-2px]'
                      : 'bg-white/5 hover:bg-white/15 border-white/10 text-white/80 hover:text-white'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0 border ${
                      isActive ? 'border-white' : 'border-white/20'
                    }`}
                  />
                  <div className="truncate min-w-0 pr-1">
                    <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-clara-100'}`}>
                      {slide.category}
                    </p>
                    <p className="text-[11px] text-amber-300/90 font-medium truncate">
                      {slide.priceTag}
                    </p>
                  </div>

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 to-white" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-clara-600/90 text-white border border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/50 hover:bg-clara-600/90 text-white border border-white/25 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

    </section>
  )
}
