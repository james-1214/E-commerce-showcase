import React, { useEffect, useState } from 'react'
export default function LoadingScreen() {
  const [pct, setPct] = useState(0), [gone, setGone] = useState(false)
  useEffect(() => {
    let v = 0; const t = setInterval(() => { v += 8 + Math.random() * 10; if (v >= 100) { v = 100; clearInterval(t); setTimeout(() => setGone(true), 300) } setPct(Math.floor(v)) }, 90)
    return () => clearInterval(t)
  }, [])
  if (gone) return null
  return <div className={`loader${pct >= 100 ? ' out' : ''}`}><span className="label">INITIALISING GALAXY</span><div className="bar"><i style={{ width: pct + '%' }} /></div><b>{pct}%</b></div>
}
