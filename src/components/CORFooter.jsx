import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Share2, MessageSquare, Play, Briefcase } from 'lucide-react'

// Inline SVG social icons (lucide-react doesn't include brand icons)
const SiInstagram = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const SiX = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const SiYoutube = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#090909"/>
  </svg>
)
const SiLinkedin = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
import { useTheme } from '../context/ThemeContext'

export default function CORFooter() {
  const { isDark } = useTheme()
  const year = new Date().getFullYear()

  const links = {
    Collections: [
      { label: 'Smartphones', href: '/product/galaxy-universe/experience' },
      { label: 'Accessories', href: '/collections' },
      { label: 'Wearables', href: '/collections' },
      { label: 'Computing', href: '/collections' },
      { label: 'Audio', href: '/collections' },
    ],
    Discover: [
      { label: 'CØR Originals', href: '/#originals' },
      { label: 'Philosophy', href: '/#about' },
      { label: 'Innovation Lab', href: '/collections' },
      { label: '3D Experiences', href: '/product/galaxy-universe/experience' },
    ],
    About: [
      { label: 'Our Story', href: '/#about' },
      { label: 'Design Process', href: '/#about' },
      { label: 'Engineering', href: '/#about' },
      { label: 'Careers', href: '/collections' },
    ],
    Contact: [
      { label: 'Concierge', href: '/collections' },
      { label: 'Press Enquiries', href: '/collections' },
      { label: 'Wholesale', href: '/collections' },
      { label: 'Store Locator', href: '/collections' },
    ],
  }

  const socials = [
    { icon: SiInstagram, label: 'Instagram' },
    { icon: SiX, label: 'Twitter / X' },
    { icon: SiYoutube, label: 'YouTube' },
    { icon: SiLinkedin, label: 'LinkedIn' },
  ]

  return (
    <footer className={`relative overflow-hidden border-t ${isDark ? 'bg-[#090909] border-white/[0.06]' : 'bg-[#f7f5f2] border-black/[0.06]'}`}>
      {/* Top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF4B20]/30 to-transparent" />

      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16 pt-16 pb-10">

        {/* CTA Banner */}
        <div className="mb-16 rounded-2xl border border-[#FF4B20]/20 bg-gradient-to-r from-[#A90D16]/10 to-[#FF4B20]/10 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className={`font-black text-2xl sm:text-3xl tracking-tight mb-1 ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
              Enter the 3D Galaxy Universe
            </h3>
            <p className={`text-sm ${isDark ? 'text-[#C7C1BB]' : 'text-[#6b6660]'}`}>
              Inspect the Samsung Galaxy S26 Ultra in full 3D — explode every component and examine every trace.
            </p>
          </div>
          <Link
            to="/product/galaxy-universe/experience"
            className="shrink-0 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A90D16] to-[#FF4B20] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-[#FF4B20]/25 hover:brightness-110 hover:shadow-[#FF4B20]/45 transition-all"
          >
            Enter Experience
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#A90D16] to-[#FF4B20] shadow-lg shadow-[#FF4B20]/30">
                <span className="text-white font-black text-xs tracking-tighter">CØR</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-black tracking-widest text-sm ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>CØR</span>
                <span className="text-[8px] tracking-[0.2em] font-medium text-[#FF4B20] mt-0.5">THE ART OF STANDING APART</span>
              </div>
            </Link>
            <p className={`text-xs leading-relaxed mb-5 ${isDark ? 'text-[#C7C1BB]/70' : 'text-[#6b6660]'}`}>
              Premium 3D technology showroom. We curate the pinnacle of engineering and design.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all hover:border-[#FF4B20] hover:text-[#FF4B20] ${
                    isDark ? 'border-white/10 text-[#C7C1BB]' : 'border-black/10 text-[#6b6660]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className={`font-black text-[10px] tracking-widest mb-4 ${isDark ? 'text-[#F4F0EB]' : 'text-[#090909]'}`}>
                {title.toUpperCase()}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className={`text-xs transition-colors hover:text-[#FF4B20] ${isDark ? 'text-[#C7C1BB]/70' : 'text-[#6b6660]'}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={`mt-14 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`}>
          <span className={`text-[11px] ${isDark ? 'text-[#C7C1BB]/50' : 'text-[#6b6660]/60'}`}>
            © {year} CØR Technology Showroom. All rights reserved. — Demo Frontend Experience.
          </span>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((label) => (
              <button
                key={label}
                className={`text-[11px] transition-colors hover:text-[#FF4B20] ${isDark ? 'text-[#C7C1BB]/50' : 'text-[#6b6660]/60'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
