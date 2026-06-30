import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X, Sparkles } from 'lucide-react'
import { NAV_LINKS, SALON_INFO } from '../data/constants'
import { openWhatsApp } from '../lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [currentPath])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-clara-100'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-clara-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-clara-800 text-lg tracking-tight">
              {SALON_INFO.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPath === link.to
                    ? 'text-clara-600 bg-clara-50'
                    : 'text-gray-600 hover:text-clara-600 hover:bg-clara-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openWhatsApp()}
              className="btn-primary text-sm py-2 px-4"
            >
              <span>💬</span>
              Booking Sekarang
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-clara-50 hover:text-clara-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-clara-100">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPath === link.to
                    ? 'text-clara-600 bg-clara-50'
                    : 'text-gray-600 hover:text-clara-600 hover:bg-clara-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => openWhatsApp()}
              className="mt-2 btn-primary justify-center text-sm py-3"
            >
              <span>💬</span>
              Booking via WhatsApp
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
