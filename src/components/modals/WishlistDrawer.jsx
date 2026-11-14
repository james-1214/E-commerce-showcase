import React, { useEffect } from 'react'
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { useTheme } from '../../context/ThemeContext'

export default function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart } = useShop()
  const { isDark } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsWishlistOpen(false)
    }
    if (isWishlistOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isWishlistOpen, setIsWishlistOpen])

  if (!isWishlistOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative flex h-full w-full max-w-md flex-col border-l p-6 shadow-2xl transition-all duration-300 ${
          isDark ? 'bg-[#111111] border-white/10 text-[#F4F0EB]' : 'bg-white border-black/10 text-[#090909]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Heart className="h-5 w-5 fill-[#FF4B20] text-[#FF4B20]" />
            <h3 className="font-display text-base font-bold tracking-tight">SAVED CURATION ({wishlist.length})</h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-[#C7C1BB] hover:border-[#FF4B20] hover:text-[#FF4B20] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {wishlist.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-[#C7C1BB]">
              <Heart className="h-12 w-12 text-[#C7C1BB]/30 mb-3" />
              <p className="text-sm font-medium">No instruments saved</p>
              <p className="text-xs text-[#C7C1BB]/60 mt-1">Tap the heart on any product to save it to your wishlist</p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-xl border border-white/10 p-3 bg-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-lg object-cover border border-white/10"
                  />
                  <div className="flex-1">
                    <h4 className="font-display text-xs font-bold leading-tight">{item.name}</h4>
                    <span className="text-xs font-semibold text-[#FF4B20]">{item.price}</span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="p-1 text-[#FF4B20] hover:text-white transition-colors"
                    title="Remove from saved"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {item.isInteractive ? (
                    <button
                      onClick={() => {
                        setIsWishlistOpen(false)
                        navigate(item.experienceRoute)
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#A90D16] to-[#FF4B20] py-1.5 text-xs font-bold text-white shadow-md shadow-[#FF4B20]/20"
                    >
                      <span>3D Experience</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-white/10 py-1.5 text-xs font-medium text-[#C7C1BB] hover:border-[#FF4B20] hover:text-[#FF4B20]"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
