import React, { useEffect, useState } from 'react'
import { getProducts } from './supabase'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* NAV */}
      <nav className="border-b border-zinc-800 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Market<span className="text-purple-500">Shelf</span></h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm">Login</button>
            <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-semibold">Start Selling</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-4">
          Sell Anything. <br/> <span className="text-purple-500">We Handle The Rest.</span>
        </h2>
        <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
          Open your shop in 2 minutes. Sell digital products, services, and physical goods.
          Get paid instantly via MiniPay, USDT, and Gift Cards.
        </p>
        <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold text-lg">Start Selling</button>
      </section>

      {/* 3 CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold text-center mb-10">Choose Your Store Type</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title: "Digital Products", desc: "Templates, courses, art, ebooks. Instant delivery.", icon: "💾"},
            {title: "Services", desc: "Design, video, writing, commissions. Get paid per job.", icon: "⚡"},
            {title: "Physical Goods", desc: "Clothes, gadgets, prints. You ship, we handle sales.", icon: "📦"},
          ].map(cat => (
            <div key={cat.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-purple-500 transition">
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h4 className="text-xl font-bold mb-2">{cat.title}</h4>
              <p className="text-zinc-400">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex-wrap justify-center gap-8 text-sm text-zinc-300">
          <span>⚡ Instant Payouts via MiniPay</span>
          <span>💰 Pay with USDT, cUSD, Gift Cards</span>
          <span>🛡️ You Keep 70%. We take 30%</span>
        </div>
      </section>

      {/* PRODUCT GRID - LIVE FROM SUPABASE */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-8">Trending on MarketShelf</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-zinc-900 border-zinc-800 rounded-xl overflow-hidden hover:border-purple-500 transition group">
              <img src={p.image_url || `https://picsum.photos/400/300?random=${p.id}`} className="w-full h-48 object-cover group-hover:scale-105 transition" />
              <div className="p-4">
                <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-1 rounded">{p.type}</span>
                <h4 className="font-semibold mt-2 mb-1">{p.title}</h4>
                <p className="text-zinc-400 text-sm">by @{p.sellers?.slug}</p>
                <p className="text-purple-400 font-bold mt-1">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-10 text-center text-zinc-500 text-sm">
        © 2026 MarketShelf. The mall for creators.
      </footer>
    </div>
  )
}

export default App