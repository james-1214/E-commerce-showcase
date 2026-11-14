import React, { useState, useEffect, useMemo } from 'react'
import { Search, X, ArrowRight, Smartphone, Eye, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { useTheme } from '../../context/ThemeContext'
import { PRODUCTS, CATEGORIES } from '../../data/corData'

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct } = useShop()
  const { isDark } = useTheme()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false)
    }
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isSearchOpen, setIsSearchOpen])

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return CATEGORIES
    return CATEGORIES.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return PRODUCTS
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  if (!isSearchOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 pt-16 sm:pt-24 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-2xl rounded-2xl border p-6 shadow-2xl transition-all ${
          isDark ? 'bg-[#111111]/95 border-white/10 text-[#F4F0EB]' : 'bg-white/95 border-black/10 text-[#090909]'
        }`}
      >
        {/* Search Bar Input */}
        <div className="relative flex items-center border-b border-white/10 pb-4">
          <Search className="h-6 w-6 text-[#FF4B20] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, collections, silicon specs, titanium..."
            autoFocus
            className="w-full bg-transparent pl-4 pr-10 text-base sm:text-lg outline-none placeholder:text-[#C7C1BB]/50"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-[#C7C1BB] hover:border-[#FF4B20] hover:text-[#FF4B20] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Categories Quick Links */}
        <div className="mt-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#C7C1BB]/70">Collections</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setIsSearchOpen(false)
                  if (cat.route) navigate(cat.route)
                }}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#C7C1BB] hover:border-[#FF4B20] hover:text-[#FF4B20] transition-colors"
              >
                {cat.id === 'smartphones' && <Smartphone className="h-3 w-3 text-[#FF4B20]" />}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 max-h-[360px] overflow-y-auto space-y-3 pr-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#C7C1BB]/70">
            Matching Products ({filteredProducts.length})
          </div>

          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                isDark ? 'bg-white/[0.02] border-white/5 hover:border-white/20' : 'bg-black/[0.02] border-black/5 hover:border-black/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="h-12 w-12 rounded-lg object-cover border border-white/10"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        prod.type === 'CØR ORIGINAL CONCEPT'
                          ? 'bg-[#FF4B20]/15 text-[#FF4B20] border border-[#FF4B20]/30'
                          : 'bg-white/10 text-[#C7C1BB]'
                      }`}
                    >
                      {prod.type}
                    </span>
                    <span className="text-xs font-bold text-[#FF4B20]">{prod.price}</span>
                  </div>
                  <h4 className="font-display text-sm font-semibold tracking-tight">{prod.name}</h4>
                  <p className="text-[11px] text-[#C7C1BB]/80 line-clamp-1">{prod.tagline}</p>
                </div>
              </div>

              {prod.isInteractive ? (
                <button
                  onClick={() => {
                    setIsSearchOpen(false)
                    navigate(prod.experienceRoute)
                  }}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#A90D16] to-[#FF4B20] px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-[#FF4B20]/20 hover:brightness-110 transition-all shrink-0 ml-3"
                >
                  <span>3D Experience</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSearchOpen(false)
                    setSelectedProduct(prod)
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-[#C7C1BB] hover:border-[#FF4B20] hover:text-[#FF4B20] transition-colors shrink-0 ml-3"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect</span>
                </button>
              )}
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="py-8 text-center text-sm text-[#C7C1BB]/70">
              No matching products found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
