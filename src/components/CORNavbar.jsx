import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, Moon, Sun, Sliders, Menu, X, Zap } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAnimation } from '../context/AnimationContext'
import { useShop } from '../context/ShopContext'

export default function CORNavbar() {
  const { theme, toggleTheme, isDark } = useTheme()
  const { openModal } = useAnimation()
  const { cartCount, wishlistCount, setIsSearchOpen, setIsCartOpen, setIsWishlistOpen } = useShop()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'DISCOVER', href: '/collections' },
    { label: 'COLLECTIONS', href: '/collections' },
    { label: 'BRANDS', href: '/collections' },
    { label: 'ABOUT', href: '/#about' },
  ]

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  const isExperience = location.pathname.includes('/experience')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled || mobileOpen
          ? isDark
            ? 'bg-[#090909]/90 backdrop-blur-xl border-b border-white/[0.07] shadow-xl shadow-black/40'
            : 'bg-white/92 backdrop-blur-xl border-b border-black/[0.07] shadow-xl shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group select-none" onClick={() => setMobileOpen(false)}>
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#A90D16] to-[#FF4B20] shadow-lg shadow-[#FF4B20]/30 group-hover:shadow-[#FF4B20]/50 transition-all duration-300">
                <span className="text-white font-black text-xs tracking-tighter leading-none">CØR</span>
              </div>
              {/* Glow ping */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#A90D16] to-[#FF4B20] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className={`font-black tracking-widest text-sm ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>CØR</span>
              <span className="text-[8px] tracking-[0.25em] font-medium text-[#FF4B20] mt-0.5">THE ART OF STANDING APART</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-[11px] font-bold tracking-widest transition-all duration-200 hover:text-[#FF4B20] relative group ${
                  isActive(link.href) && link.href !== '/'
                    ? 'text-[#FF4B20]'
                    : isDark
                    ? 'text-[#C7C1BB]'
                    : 'text-[#6b6660]'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#A90D16] to-[#FF4B20] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-lg transition-all hover:text-[#FF4B20] hover:bg-[#FF4B20]/10 ${
                isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'
              }`}
              aria-label="Search"
            >
              <Search className="h-4.5 w-4.5" size={18} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className={`relative p-2 rounded-lg transition-all hover:text-[#FF4B20] hover:bg-[#FF4B20]/10 ${
                isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'
              }`}
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF4B20] text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-lg transition-all hover:text-[#FF4B20] hover:bg-[#FF4B20]/10 ${
                isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'
              }`}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A90D16] text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all hover:text-[#FF4B20] hover:bg-[#FF4B20]/10 ${
                isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Animation Settings */}
            <button
              onClick={openModal}
              className={`hidden sm:flex p-2 rounded-lg transition-all hover:text-[#FF4B20] hover:bg-[#FF4B20]/10 ${
                isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'
              }`}
              aria-label="Animation settings"
            >
              <Sliders size={18} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className={`lg:hidden p-2 rounded-lg transition-all hover:text-[#FF4B20] hover:bg-[#FF4B20]/10 ${
                isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className={`lg:hidden border-t ${isDark ? 'border-white/[0.07] bg-[#090909]/96' : 'border-black/[0.07] bg-white/96'} backdrop-blur-xl`}>
          <nav className="flex flex-col px-5 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 text-xs font-bold tracking-widest border-b transition-colors hover:text-[#FF4B20] ${
                  isDark ? 'border-white/[0.05] text-[#C7C1BB]' : 'border-black/[0.05] text-[#6b6660]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { openModal(); setMobileOpen(false) }}
              className={`flex items-center gap-2 mt-2 py-3 text-xs font-bold tracking-widest text-left border-b ${
                isDark ? 'border-white/[0.05] text-[#C7C1BB]' : 'border-black/[0.05] text-[#6b6660]'
              } hover:text-[#FF4B20] transition-colors`}
            >
              <Sliders size={15} />
              ANIMATION SETTINGS
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
