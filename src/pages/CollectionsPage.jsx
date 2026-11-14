import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Layers } from 'lucide-react'
import CORNavbar from '../components/CORNavbar'
import { useTheme } from '../context/ThemeContext'
import { CATEGORIES } from '../data/corData'

export default function CollectionsPage() {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#090909] text-[#F4F0EB]' : 'bg-[#f7f5f2] text-[#090909]'}`}>
      <CORNavbar />

      <main className="pt-24 pb-20 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-screen-xl">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#C7C1BB] hover:text-[#FF4B20] transition-colors mb-10"
          >
            <ArrowLeft className="h-4 w-4" />
            BACK TO SHOWROOM
          </Link>

          {/* Header */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#A90D16] to-[#FF4B20]" />
              <span className="text-[10px] font-bold tracking-[0.35em] text-[#FF4B20] uppercase">Full Catalogue</span>
            </div>
            <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              ALL<br />
              <span className="bg-gradient-to-r from-[#FF4B20] to-[#A90D16] bg-clip-text text-transparent">
                COLLECTIONS
              </span>
            </h1>
            <p className={`mt-4 max-w-xl text-sm leading-relaxed ${isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'}`}>
              Explore every category in the CØR showroom catalogue. Click Smartphones to access the live 3D engineering experience.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={cat.route}
                className={`group flex flex-col overflow-hidden rounded-2xl border transition-all hover:border-[#FF4B20]/40 hover:shadow-xl hover:shadow-[#FF4B20]/10 ${
                  isDark ? 'bg-[#111111] border-white/[0.07]' : 'bg-white border-black/[0.07]'
                }`}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-gradient-to-r from-[#A90D16] to-[#FF4B20] px-2.5 py-0.5 text-[9px] font-black text-white tracking-widest">
                      {cat.badge}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className={`font-black text-lg tracking-tight mb-1 ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
                    {cat.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#C7C1BB]/75' : 'text-[#6b6660]'}`}>
                    {cat.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#FF4B20] group-hover:gap-2 transition-all">
                    {cat.isInteractive ? 'ENTER 3D EXPERIENCE' : 'EXPLORE COLLECTION'}
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
