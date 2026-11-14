import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, ArrowRight, Sparkles, Award, Zap } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useShop } from '../context/ShopContext'
import { PRODUCTS } from '../data/corData'

function ProductCard({ product, index }) {
  const { isDark } = useTheme()
  const { addToCart, toggleWishlist, isWishlisted, setSelectedProduct } = useShop()
  const navigate = useNavigate()
  const cardRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const wishlisted = isWishlisted(product.id)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${
        isDark
          ? 'bg-[#111111] border-white/[0.07] hover:border-[#FF4B20]/35'
          : 'bg-white border-black/[0.07] hover:border-[#FF4B20]/35'
      } hover:shadow-xl hover:shadow-[#FF4B20]/10`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-[9px] font-black px-2.5 py-1 rounded-full tracking-wider ${
            product.type === 'CØR ORIGINAL CONCEPT'
              ? 'bg-gradient-to-r from-[#A90D16] to-[#FF4B20] text-white'
              : 'bg-black/70 backdrop-blur-md text-[#C7C1BB] border border-white/20'
          }`}>
            {product.type === 'CØR ORIGINAL CONCEPT' ? '⬟ CØR ORIGINAL' : '◈ MANUFACTURER'}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product) }}
          className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
            wishlisted
              ? 'border-[#FF4B20] bg-[#FF4B20]/20 text-[#FF4B20]'
              : 'border-white/20 bg-black/40 text-white hover:border-[#FF4B20] hover:text-[#FF4B20]'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`h-3.5 w-3.5 ${wishlisted ? 'fill-[#FF4B20]' : ''}`} />
        </button>

        {/* Status */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-md border ${
            product.isInteractive
              ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
              : 'border-white/15 bg-black/50 text-white/70'
          }`}>
            {product.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-[9px] font-bold tracking-widest text-[#FF4B20] uppercase`}>
            {product.category}
          </span>
          <span className={`text-sm font-black ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
            {product.price}
          </span>
        </div>

        <h3 className={`font-bold text-sm leading-tight mb-1.5 ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
          {product.name}
        </h3>
        <p className={`text-[11px] leading-relaxed mb-3 ${isDark ? 'text-[#C7C1BB]/75' : 'text-[#6b6660]'}`}>
          {product.tagline}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-[#FF4B20]' : 'text-[#C7C1BB]/30'}`}>
              ★
            </span>
          ))}
          <span className={`text-[10px] ml-1 ${isDark ? 'text-[#C7C1BB]/70' : 'text-[#6b6660]'}`}>
            {product.rating}
          </span>
        </div>

        {/* Action Buttons */}
        {product.isInteractive ? (
          <button
            onClick={() => navigate(product.experienceRoute)}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A90D16] to-[#FF4B20] py-2.5 text-xs font-bold text-white shadow-md shadow-[#FF4B20]/20 hover:brightness-110 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            EXPLORE EXPERIENCE
            <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedProduct(product)}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold tracking-wider transition-all hover:border-[#FF4B20] hover:text-[#FF4B20] ${
                isDark ? 'border-white/10 text-[#C7C1BB] hover:bg-[#FF4B20]/8' : 'border-black/10 text-[#6b6660] hover:bg-[#FF4B20]/5'
              }`}
            >
              INSPECT
            </button>
            <button
              onClick={() => addToCart(product)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[#A90D16] to-[#FF4B20] text-white shadow-sm hover:brightness-110 transition-all"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const { isDark } = useTheme()
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.08 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="products"
      ref={sectionRef}
      className={`relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#f0ede9]'}`}
    >
      {/* BG accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF4B20]/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A90D16]/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-screen-xl">
        {/* Section Header */}
        <div className={`mb-14 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-[#A90D16] to-[#FF4B20]" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-[#FF4B20] uppercase">
              Flagship Selection
            </span>
          </div>
          <h2 className={`font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
            FEATURED<br />
            <span className="bg-gradient-to-r from-[#FF4B20] to-[#A90D16] bg-clip-text text-transparent">
              PRODUCTS
            </span>
          </h2>
          <p className={`mt-4 max-w-xl text-sm leading-relaxed ${isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'}`}>
            A curated showcase of real manufacturer flagships alongside CØR Original concept instruments — each designed to exceed the boundary of what exists.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-2 text-xs text-[#C7C1BB]">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#A90D16] to-[#FF4B20]" />
            <span>CØR Original — Concept instruments designed in-house</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#C7C1BB]">
            <span className="h-2 w-2 rounded-full bg-[#C7C1BB]/50" />
            <span>Manufacturer Flagship — Curated real-world hardware</span>
          </div>
        </div>
      </div>
    </section>
  )
}
