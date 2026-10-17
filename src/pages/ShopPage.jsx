import { useMemo, useState } from 'react'
import { useShop } from '../context/ShopContext'
import { ProductCard } from '../components/product/ProductCard'
import { SearchIcon, CloseIcon, ArrowRightIcon } from '../components/common/Icons'

export function ShopPage() {
  const { allProducts, category, setCategory, categories, query, setQuery, navigateTo } = useShop()
  const [sortBy, setSortBy] = useState('default') // 'default', 'price-asc', 'price-desc', 'rating'

  const filteredAndSortedProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = allProducts.filter((p) => {
      const matchesCategory = category === 'Semua' || p.category === category
      const matchesQuery =
        !q ||
        `${p.name} ${p.team ?? ''} ${p.category ?? ''} ${p.type ?? ''}`
          .toLowerCase()
          .includes(q)
      return matchesCategory && matchesQuery
    })

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    }

    return list
  }, [allProducts, category, query, sortBy])

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Breadcrumb & Header */}
      <div className="mb-6 sm:mb-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-3" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="hover:text-black transition"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold">Katalog Shop</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#F15A24] mb-1">
              OFFICIAL STORE
            </p>
            <h1 className="font-condensed font-black uppercase text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none">
              KATALOG JERSEY & GEAR
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Menampilkan {filteredAndSortedProducts.length} pilihan perlengkapan performa tinggi.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="shop-sort" className="text-xs font-bold text-slate-600 shrink-0">
              Urutkan:
            </label>
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#F15A24] floating-shadow"
            >
              <option value="default">Rekomendasi</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Live Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                category === c
                  ? 'bg-[#F15A24] text-white shadow-md shadow-[#F15A24]/30'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="w-full md:w-80 relative">
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari jersey, klub, negara..."
            className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#F15A24] focus:outline-none floating-shadow"
          />
          <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-black"
              aria-label="Bersihkan pencarian"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl floating-shadow border border-slate-100 my-8">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#F15A24] flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="w-7 h-7" />
          </div>
          <h3 className="font-condensed font-black uppercase text-2xl text-slate-900 mb-2">
            Produk Tidak Ditemukan
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
            Tidak ada jersey atau perlengkapan yang cocok dengan filter atau kata kunci "{query}".
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('Semua')
            }}
            className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition"
          >
            Reset Filter & Cari Ulang
          </button>
        </div>
      )}

      {/* Banner info */}
      <div className="mt-16 rounded-[28px] bg-[#0A2419] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 floating-shadow">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#F15A24] bg-white/10 px-2.5 py-1 rounded-full mb-2 inline-block">
            PESANAN KHUSUS & SERAGAM TIM
          </span>
          <h3 className="font-condensed font-black uppercase text-2xl sm:text-3xl tracking-tight leading-tight">
            Butuh Pemesanan Jumlah Banyak untuk Tim?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            Hubungi admin kami langsung untuk harga grosir, sablon nama pemain, dan waktu pengerjaan cepat.
          </p>
        </div>
        <a
          href="https://wa.me/?text=Halo%20Admin%20PLAYCART,%20saya%20tertarik%20pemesanan%20jersey%20tim%20dalam%20jumlah%20banyak."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#F15A24] hover:bg-[#FF6F3B] text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-full transition shadow-lg shrink-0"
        >
          <span>Chat Admin Tim</span>
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </main>
  )
}
