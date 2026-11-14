import React, { useEffect } from 'react'
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { useShop } from '../../context/ShopContext'
import { useTheme } from '../../context/ThemeContext'

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart } = useShop()
  const { isDark } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false)
    }
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isCartOpen, setIsCartOpen])

  if (!isCartOpen) return null

  const total = cart.reduce((acc, item) => {
    const num = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
    return acc + num * (item.quantity || 1)
  }, 0)

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
            <ShoppingBag className="h-5 w-5 text-[#FF4B20]" />
            <h3 className="font-display text-base font-bold tracking-tight">SHOWROOM CART ({cart.length})</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-[#C7C1BB] hover:border-[#FF4B20] hover:text-[#FF4B20] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-[#C7C1BB]">
              <ShoppingBag className="h-12 w-12 text-[#C7C1BB]/30 mb-3" />
              <p className="text-sm font-medium">Your showroom collection is empty</p>
              <p className="text-xs text-[#C7C1BB]/60 mt-1">Explore our collections and add titanium instruments</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-white/10 p-3 bg-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-lg object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-display text-xs font-bold leading-tight">{item.name}</h4>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#FF4B20]">{item.price}</span>
                      <span className="text-[10px] text-[#C7C1BB]">Qty: {item.quantity || 1}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-[#C7C1BB] hover:text-[#A90D16] transition-colors"
                  title="Remove from cart"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#C7C1BB]">Subtotal</span>
              <span className="font-display font-bold text-[#FF4B20]">${total.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#C7C1BB]/70">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Complimentary insured worldwide courier shipping included.</span>
            </div>
            <button
              onClick={() => {
                alert('Demo Checkout: Thank you for testing CØR Showroom! All orders are simulated.')
                setIsCartOpen(false)
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A90D16] to-[#FF4B20] py-3 text-sm font-bold text-white shadow-xl shadow-[#FF4B20]/25 hover:brightness-110 transition-all"
            >
              <span>PROCEED TO CONCIERGE</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
