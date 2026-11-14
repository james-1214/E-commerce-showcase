import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AnimationProvider } from './context/AnimationContext'
import { ShopProvider } from './context/ShopContext'
import CORNavbar from './components/CORNavbar'
import AnimationControlModal from './components/modals/AnimationControlModal'
import SearchModal from './components/modals/SearchModal'
import CartDrawer from './components/modals/CartDrawer'
import WishlistDrawer from './components/modals/WishlistDrawer'
import ProductDetailModal from './components/modals/ProductDetailModal'

// Lazy load heavy pages
const CORHomepage = lazy(() => import('./pages/CORHomepage'))
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'))
const GalaxyExperiencePage = lazy(() => import('./pages/GalaxyExperiencePage'))

function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090909]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#A90D16] to-[#FF4B20] animate-pulse" />
          <div className="absolute inset-1 rounded-lg bg-[#090909] flex items-center justify-center">
            <span className="text-white font-black text-xs">CØR</span>
          </div>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#FF4B20] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Global overlays that render on all routes except experience
function GlobalOverlays() {
  return (
    <>
      <AnimationControlModal />
      <SearchModal />
      <CartDrawer />
      <WishlistDrawer />
      <ProductDetailModal />
    </>
  )
}

// Layout with COR nav for homepage & collections
function MainLayout({ children }) {
  return (
    <>
      <CORNavbar />
      {children}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AnimationProvider>
          <ShopProvider>
            <GlobalOverlays />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* COR Homepage */}
                <Route
                  path="/"
                  element={
                    <MainLayout>
                      <CORHomepage />
                    </MainLayout>
                  }
                />

                {/* Collections */}
                <Route
                  path="/collections"
                  element={<CollectionsPage />}
                />

                {/* Galaxy Universe 3D Experience */}
                <Route
                  path="/product/galaxy-universe/experience"
                  element={<GalaxyExperiencePage />}
                />

                {/* Redirect anything else to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ShopProvider>
        </AnimationProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
