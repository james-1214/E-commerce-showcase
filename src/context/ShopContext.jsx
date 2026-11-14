import React, { createContext, useContext, useState, useEffect } from 'react'

const ShopContext = createContext()

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cor-cart')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('cor-wishlist')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('cor-cart', JSON.stringify(cart))
    } catch (e) {}
  }, [cart])

  useEffect(() => {
    try {
      localStorage.setItem('cor-wishlist', JSON.stringify(wishlist))
    } catch (e) {}
  }, [wishlist])

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id)
      if (exists) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId)
  }

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0)
  const wishlistCount = wishlist.length

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        toggleWishlist,
        isWishlisted,
        cartCount,
        wishlistCount,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within ShopProvider')
  }
  return context
}
