import React, { lazy, Suspense } from 'react'
import HeroPage from '../sections/HeroPage'
import FeaturedCollections from '../sections/FeaturedCollections'
import FeaturedProducts from '../sections/FeaturedProducts'
import COROriginals from '../sections/COROriginals'
import PhilosophySection from '../sections/PhilosophySection'
import CORFooter from '../components/CORFooter'
import { useTheme } from '../context/ThemeContext'

export default function CORHomepage() {
  const { isDark } = useTheme()

  return (
    <div className={isDark ? 'bg-[#090909]' : 'bg-[#f7f5f2]'}>
      <HeroPage />
      <FeaturedCollections />
      <FeaturedProducts />
      <COROriginals />
      <PhilosophySection />
      <CORFooter />
    </div>
  )
}
