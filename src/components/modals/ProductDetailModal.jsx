import React, { useEffect } from 'react'
import { X, Heart, ShoppingBag, ArrowRight, Shield, Award, Cpu, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { useTheme } from '../../context/ThemeContext'

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isWishlisted } = useShop()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProduct(null)
    }
    if (selectedProduct) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedProduct, setSelectedProduct])

  if (!selectedProduct) return null

  const p = selectedProduct
  const wishlisted = isWishlisted(p.id)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-3xl rounded-2xl border p-6 sm:p-8 shadow-2xl overflow-hidden transition-all ${
          isDark ? 'bg-[#111111]/95 border-white/10 text-[#F4F0EB]' : 'bg-white/95 border-black/10 text-[#090909]'
        }`}
      >
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#C7C1BB] hover:border-[#FF4B20] hover:text-[#FF4B20] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image & Badges */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-square">
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md ${
                  p.type === 'CØR ORIGINAL CONCEPT'
                    ? 'bg-[#FF4B20]/25 text-[#FF4B20] border border-[#FF4B20]/40'
                    : 'bg-black/60 text-[#C7C1BB] border border-white/10'
                }`}
              >
                {p.type}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-emerald-400 border border-emerald-500/30">
                {p.status}
              </span>
            </div>
          </div>

          {/* Details & Specs */}
          <div className="flex flex-col">
            <div className="text-xs uppercase tracking-widest text-[#FF4B20] font-semibold">{p.category}</div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">{p.name}</h2>
            <div className="mt-2 text-xl font-bold text-[#FF4B20]">{p.price}</div>
            <p className="mt-3 text-xs text-[#C7C1BB] leading-relaxed">{p.description}</p>

            {/* Specifications Matrix */}
            <div className="mt-5 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#C7C1BB]/70">
                Engineering Specifications
              </div>
              <div className="grid grid-cols-2 gap-2">
                {p.specs?.map((spec, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-[11px]"
                  >
                    <div className="text-[#C7C1BB]/60 text-[9px] uppercase tracking-wider">{spec.label}</div>
                    <div className="font-semibold text-[#F4F0EB] mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              {p.isInteractive ? (
                <button
                  onClick={() => {
                    setSelectedProduct(null)
                    navigate(p.experienceRoute)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A90D16] to-[#FF4B20] py-3 text-xs font-bold text-white shadow-xl shadow-[#FF4B20]/25 hover:brightness-110 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>ENTER 3D SHOWCASE</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    addToCart(p)
                    setSelectedProduct(null)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A90D16] to-[#FF4B20] py-3 text-xs font-bold text-white shadow-xl shadow-[#FF4B20]/25 hover:brightness-110 transition-all"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>ACQUIRE INSTRUMENT</span>
                </button>
              )}

              <button
                onClick={() => toggleWishlist(p)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                  wishlisted
                    ? 'border-[#FF4B20] bg-[#FF4B20]/15 text-[#FF4B20]'
                    : 'border-white/10 text-[#C7C1BB] hover:border-[#FF4B20] hover:text-[#FF4B20]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`h-4 w-4 ${wishlisted ? 'fill-[#FF4B20]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
