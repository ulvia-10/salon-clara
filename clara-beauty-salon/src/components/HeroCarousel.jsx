import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Star, ArrowRight, Sparkles, Clock, Pause, Play } from 'lucide-react'
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

  // Autoplay handler
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setInterval(() => {
      goToNext()
    }, 5500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, goToNext])

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrev()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const currentSlide = HERO_SLIDES[currentIndex]

  return (
    <section 
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 bg-clara-950 overflow-hidden select-none min-h-[580px] md:min-h-[640px] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Images with Crossfade */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Main Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[7000ms] ease-out"
            style={{
              transform: index === currentIndex ? 'scale(1.05)' : 'scale(1.0)',
            }}
          />

          {/* Dark & Gradient Overlay for legibility and visual aesthetic */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          
          {/* Glow lights */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-clara-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      ))}

      {/* Main Slide Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-8 space-y-5 text-white">
            
            {/* Top Badge & Rating */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                {currentSlide.badge}
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-amber-300 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-300/30 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                {currentSlide.rating}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-clara-100/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-light drop-shadow">
              {currentSlide.subtitle}
            </p>

            {/* Highlights & Price Tag */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="bg-gradient-to-r from-amber-400 to-rose-400 text-clara-950 font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-md">
                {currentSlide.priceTag}
              </span>
              <span className="text-xs sm:text-sm text-clara-100 font-medium bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-white/10">
                ✨ {currentSlide.highlight}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={() => openWhatsApp(currentSlide.whatsappMsg)}
                className="btn-whatsapp text-sm sm:text-base px-7 py-3.5 shadow-xl hover:shadow-green-500/25 flex items-center justify-center gap-2 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">💬</span>
                <span>Booking via WhatsApp</span>
              </button>

              <Link
                to={currentSlide.linkTo}
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-medium px-7 py-3.5 rounded-xl border border-white/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Lihat Layanan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* Right Column: Interactive Quick Selector Card (Desktop view) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-clara-200 border-b border-white/10 pb-2">
                Pilih Treatment Favorit:
              </p>
              
              <div className="space-y-2">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === currentIndex
                  return (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(idx)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                        isActive
                          ? 'bg-gradient-to-r from-clara-500/80 to-pink-500/80 text-white shadow-lg border border-white/30 translate-x-1'
                          : 'bg-white/5 hover:bg-white/15 text-clara-100 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <p className="text-xs font-semibold truncate">{slide.title}</p>
                        <p className="text-[11px] opacity-80">{slide.priceTag}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-clara-800 font-bold' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}>
                        {isActive ? 'Aktif' : 'Lihat'}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Pause / Play Autoplay indicator */}
              <div className="flex items-center justify-between pt-2 text-[11px] text-clara-200/80 border-t border-white/10">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Auto Slide {isPaused ? '(Di-pause)' : '(Aktif)'}
                </span>
                <button 
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1 hover:text-white transition-colors"
                  title={isPaused ? 'Mulai Autoplay' : 'Hentikan Autoplay'}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-clara-600/80 text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-clara-600/80 text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Bottom Indicators & Dynamic Progress Bar */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`relative h-2.5 rounded-full transition-all duration-500 overflow-hidden ${
              idx === currentIndex ? 'w-8 bg-clara-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
          >
            {idx === currentIndex && !isPaused && (
              <span className="absolute inset-0 bg-gradient-to-r from-amber-300 to-white animate-progress origin-left" />
            )}
          </button>
        ))}

        <span className="text-[11px] text-white/80 font-mono ml-2">
          0{currentIndex + 1} / 0{slideCount}
        </span>
      </div>
    </section>
  )
}
