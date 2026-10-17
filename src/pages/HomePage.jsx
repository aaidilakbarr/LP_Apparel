import { useRef } from 'react'
import { useShop } from '../context/ShopContext'
import { formatRupiah } from '../data/products'
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  HeartIcon,
  SparkIcon,
  StarIcon,
} from '../components/common/Icons'
import { GearVisual } from '../components/common/GearVisual'
import { ProductCard } from '../components/product/ProductCard'

export function HomePage() {
  const {
    heroProducts,
    allProducts,
    wishlist,
    toggleWishlist,
    addToCart,
    currencyMode,
    navigateTo,
    category,
    setCategory,
    categories,
  } = useShop()

  const heroCarouselRef = useRef(null)

  const scrollHeroCarousel = (direction) => {
    if (heroCarouselRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260
      heroCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  // Preview products for the featured section on homepage
  const featuredPreview = allProducts.filter((p) => {
    if (category === 'Semua') return true
    return p.category === category
  }).slice(0, 4)

  return (
    <main className="flex-1">
      {/* --- HERO SECTION --- */}
      <section aria-labelledby="hero-headline" className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-1 pb-10">
        <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-[#0A2419] text-white min-h-[600px] lg:min-h-[700px] flex flex-col justify-between shadow-2xl">
          {/* Background Athlete Image */}
          <img
            src="/assets/hero-jersey.png"
            alt="Pemain sepak bola bersiap di lapangan hijau"
            className="absolute inset-0 w-full h-full object-cover object-right md:object-[center_35%] select-none pointer-events-none brightness-95"
          />

          {/* Athletic Scrim Gradient */}
          <div className="hero-gradient-scrim absolute inset-0 pointer-events-none" />

          {/* Top Left Hero Copy Area */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-2xl flex flex-col items-start">

            {/* Bold Athletic Headline */}
            <h1
              id="hero-headline"
              className="font-condensed font-black uppercase text-white tracking-tight leading-[0.92] text-4xl sm:text-6xl lg:text-[4.75rem]"
            >
              GET READY FOR
              <br />
              BEST PERFORMANCE
            </h1>

            {/* Subtitle / Description */}
            <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-md mt-3 sm:mt-4 mb-5 leading-relaxed font-normal">
              Discover premium sports accessories and official football kits designed to support every workout, match, training session, and active lifestyle.
            </p>

            {/* Primary CTA Button */}
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="btn-sweep inline-flex items-center gap-3 bg-[#F15A24] hover:bg-[#FF6F3B] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 rounded-full shadow-lg shadow-[#F15A24]/35 hover:shadow-[#F15A24]/50 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Bottom Row: Gear Up Tagline + Arrows + Floating Product Cards Carousel */}
          <div className="relative z-10 px-6 sm:px-10 lg:px-14 pb-5 sm:pb-7 pt-2 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            {/* Bottom Left: Tagline & Carousel Arrows */}
            <div className="flex flex-col sm:flex-row sm:items-center lg:flex-col lg:items-start gap-3 shrink-0">
              <div>
                <p className="font-condensed font-black uppercase tracking-tight text-white text-lg sm:text-xl leading-none">
                  GEAR UP
                </p>
                <p className="font-condensed font-black uppercase tracking-tight text-white text-lg sm:text-xl leading-none">
                  WITH CONFIDENCE
                </p>
              </div>

              {/* Minimalist Arrow Lines */}
              <div className="flex items-center gap-4 mt-1">
                <button
                  type="button"
                  onClick={() => scrollHeroCarousel('left')}
                  aria-label="Geser ke kiri"
                  className="text-orange-300/70 hover:text-orange-200 transition-colors flex items-center justify-center p-1"
                >
                  <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollHeroCarousel('right')}
                  aria-label="Geser ke kanan"
                  className="text-[#F15A24] hover:text-[#FF6F3B] transition-colors flex items-center justify-center p-1"
                >
                  <ArrowRightIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Bottom Right: Floating Product Cards Slider */}
            <div className="w-full lg:max-w-[72%] overflow-hidden">
              <div
                ref={heroCarouselRef}
                className="flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-1 pt-1"
              >
                {heroProducts.map((item) => {
                  const isFav = wishlist.includes(item.id)
                  const displayPrice =
                    currencyMode === 'USD'
                      ? `$${item.priceUsd}.00`
                      : formatRupiah(item.price)

                  return (
                    <article
                      key={item.id}
                      className="bg-white text-slate-900 rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-4 w-[180px] sm:w-[200px] shrink-0 floating-shadow transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
                    >
                      {/* Card Top: Wishlist Button */}
                      <div className="flex items-center justify-end mb-1">
                        <button
                          type="button"
                          onClick={() => toggleWishlist(item.id, item.name)}
                          aria-label={`Favoritkan ${item.name}`}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition ${isFav ? 'text-[#F15A24]' : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                          <HeartIcon className="w-4 h-4" filled={isFav} />
                        </button>
                      </div>

                      {/* Card Visual: Equipment SVG or Atlas cutout */}
                      <div
                        onClick={() => navigateTo('product', item.id)}
                        className="aspect-square w-full rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden mb-2 cursor-pointer"
                      >
                        <GearVisual itemType={item.itemType} atlasPosition={item.atlasPosition} />
                      </div>

                      {/* Card Bottom: Price & Title */}
                      <div>
                        <strong className="block text-[#F15A24] font-black text-base sm:text-lg leading-tight">
                          {displayPrice}
                        </strong>
                        <h3
                          onClick={() => navigateTo('product', item.id)}
                          className="font-bold text-slate-900 text-xs sm:text-sm leading-snug truncate mt-0.5 cursor-pointer hover:text-[#F15A24] transition-colors"
                        >
                          {item.name}
                        </h3>

                        {/* Quick Add button */}
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="mt-2.5 w-full py-1.5 px-3 rounded-full text-[11px] font-bold bg-slate-100 hover:bg-[#F15A24] hover:text-white text-slate-800 transition duration-150 flex items-center justify-center gap-1"
                        >
                          <span>+ Masuk Keranjang</span>
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES SECTION --- */}
      <section aria-labelledby="cat-headline" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2
            id="cat-headline"
            className="font-condensed font-black uppercase text-3xl sm:text-4xl text-slate-900 tracking-tight"
          >
            SHOP BY PRODUCT CATEGORY
          </h2>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="text-xs sm:text-sm font-extrabold text-slate-900 hover:text-[#F15A24] flex items-center gap-1 uppercase tracking-wider transition"
          >
            <span>VIEW MORE</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: 'Soccer', desc: 'Jersey & Matchday Gear', cat: 'Tim Nasional', pos: '0% 0%', badge: 'Popular' },
            { title: 'Basketball', desc: 'Jerseys & Armor', cat: 'Klub', pos: '100% 0%', badge: 'Trending' },
            { title: 'Goalkeeper', desc: 'Gloves & Protection', cat: 'Goalkeeper', pos: '0% 100%', badge: 'Pro' },
            { title: 'Accessories', desc: 'Balls, Helmets & Gear', cat: 'Equipment', pos: '100% 100%', badge: 'New' },
          ].map((catItem) => (
            <div
              key={catItem.title}
              onClick={() => {
                setCategory(catItem.cat)
                navigateTo('shop')
              }}
              className="relative rounded-[24px] overflow-hidden bg-slate-900 text-white p-5 h-56 sm:h-64 flex flex-col justify-between group cursor-pointer floating-shadow"
            >
              <div
                className="absolute inset-0 atlas-thumb opacity-50 group-hover:opacity-70 group-hover:scale-105 transition duration-500"
                style={{ backgroundPosition: catItem.pos }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="relative z-10 flex justify-end">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                  {catItem.badge}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="font-condensed font-black uppercase text-2xl tracking-tight leading-none group-hover:text-[#F15A24] transition-colors">
                  {catItem.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">{catItem.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURED GEAR PREVIEW ON HOMEPAGE --- */}
      <section aria-labelledby="featured-headline" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#F15A24] mb-2">
              KOLEKSI PILIHAN
            </p>
            <h2
              id="featured-headline"
              className="font-condensed font-black uppercase text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none"
            >
              FEATURED GEAR
              <br />
              FOR PEAK PERFORMANCE
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${category === c
                  ? 'bg-[#F15A24] text-white shadow-md shadow-[#F15A24]/30'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPreview.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg"
          >
            <span>Lihat Semua Katalog ({allProducts.length} Produk)</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Promotional Split Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="rounded-[28px] overflow-hidden bg-gradient-to-r from-slate-950 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between min-h-[220px] relative floating-shadow">
            <div className="relative z-10 max-w-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F15A24] bg-white/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                SPECIAL OFFER
              </span>
              <h3 className="font-condensed font-black uppercase text-3xl sm:text-4xl tracking-tight leading-none mb-2">
                Own Every Moment
                <br />
                on the Pitch
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Nikmati koleksi jersey grade player dengan bahan berpori mikro yang sejuk di segala cuaca.
              </p>
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                className="inline-flex items-center gap-2 bg-[#F15A24] hover:bg-[#FF6F3B] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-full transition shadow-md"
              >
                <span>SHOP COLLECTION</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="rounded-[28px] overflow-hidden bg-gradient-to-r from-[#F15A24] to-[#E04812] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[220px] relative floating-shadow">
            <div className="relative z-10 max-w-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-950 bg-white px-2.5 py-1 rounded-full mb-3 inline-block">
                EXCLUSIVE MATCH KIT
              </span>
              <h3 className="font-condensed font-black uppercase text-3xl sm:text-4xl tracking-tight leading-none mb-2 text-white">
                Ready For
                <br />
                Your Every Match
              </h3>
              <p className="text-xs text-orange-100 mb-6">
                Stok lengkap ukuran S hingga XXL. Pemesanan mudah langsung terhubung ke WhatsApp official admin.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('Tim Nasional')
                  navigateTo('shop')
                }}
                className="inline-flex items-center gap-2 bg-slate-950 hover:bg-black text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-full transition shadow-md"
              >
                <span>EXPLORE NOW</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENTO GRID: DESIGNED FOR BETTER PERFORMANCE --- */}
      <section aria-labelledby="bento-headline" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#F15A24] mb-2">
              STANDAR TERTINGGI
            </p>
            <h2
              id="bento-headline"
              className="font-condensed font-black uppercase text-3xl sm:text-5xl text-slate-900 tracking-tight leading-none"
            >
              DESIGNED FOR
              <br />
              BETTER PERFORMANCE
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Kami menghadirkan perlengkapan olahraga dan jersey terbaik dengan jaminan kenyamanan, ketahanan, dan keaslian material.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-[28px] bg-[#0A2419] text-white p-8 sm:p-10 flex flex-col justify-between floating-shadow relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <SparkIcon className="w-6 h-6" />
              </div>
              <h3 className="font-condensed font-black uppercase text-2xl sm:text-3xl tracking-tight mb-2">
                Gear for Every Match & Training
              </h3>
              <p className="text-sm text-slate-300 max-w-lg mb-8 leading-relaxed">
                Semua kit dirancang dari material moisture-wicking yang menyerap keringat seketika, memastikan pergerakanmu tetap lincah di lapangan.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-8 pt-6 border-t border-white/15">
              <div>
                <strong className="font-condensed font-black text-3xl sm:text-4xl text-white block">1M+</strong>
                <span className="text-xs text-slate-300 font-bold uppercase">Active Players</span>
              </div>
              <div>
                <strong className="font-condensed font-black text-3xl sm:text-4xl text-[#F15A24] block">24H</strong>
                <span className="text-xs text-slate-300 font-bold uppercase">Fast Dispatch</span>
              </div>
              <div>
                <strong className="font-condensed font-black text-3xl sm:text-4xl text-white block">100%</strong>
                <span className="text-xs text-slate-300 font-bold uppercase">Authentic Fit</span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-8 sm:p-10 flex flex-col justify-between floating-shadow border border-slate-100">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F15A24] flex items-center justify-center mb-6">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-condensed font-black uppercase text-2xl tracking-tight mb-2 text-slate-900">
                Secure Shopping & Direct Admin
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Pemesanan langsung terkonfirmasi ke admin WhatsApp. Tidak perlu khawatir stok habis atau barang tidak sesuai.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-bold text-slate-700 block">Beli Sekarang, Bayar Aman</span>
              <span className="text-xs text-[#F15A24] font-black uppercase">Try It On Today!</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- CARA PESAN (ORDER FLOW) --- */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-[#0A2419] rounded-[32px] sm:rounded-[40px] text-white p-8 sm:p-12 lg:p-16">
          <div className="max-w-xl mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-[#F15A24] mb-2">
              CARA PESAN
            </p>
            <h2 className="font-condensed font-black uppercase text-3xl sm:text-5xl tracking-tight leading-none mb-3">
              DARI KATALOG KE CHAT ADMIN
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Belum ada pembayaran otomatis yang membingungkan. Admin memastikan ketersediaan fisik stok dan ongkir sebelum transaksi final.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Pilih Jersey', desc: 'Jelajahi model dan koleksi favorit dari katalog.' },
              { step: '02', title: 'Tentukan Ukuran', desc: 'Pilih ukuran mulai dari S hingga XXL lalu klik masukkan keranjang.' },
              { step: '03', title: 'Kirim Daftar', desc: 'Buka keranjang dan klik tanyakan stok untuk membuat pesan WhatsApp instan.' },
              { step: '04', title: 'Konfirmasi Admin', desc: 'Admin segera mengonfirmasi ketersediaan dan rincian pengiriman.' },
            ].map((flow) => (
              <div key={flow.step} className="border-t border-white/20 pt-6">
                <span className="font-condensed font-black text-3xl text-[#F15A24] block mb-2">
                  {flow.step}
                </span>
                <h3 className="font-condensed font-black uppercase text-xl text-white mb-2">
                  {flow.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs font-black uppercase tracking-widest text-[#F15A24] mb-2">
            TESTIMONIALS
          </p>
          <h2 className="font-condensed font-black uppercase text-3xl sm:text-5xl text-slate-900 tracking-tight leading-none">
            WHAT OUR PLAYERS ARE SAYING
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Rian Pratama',
              role: 'Kapten Tim Amatir FC',
              quote: 'Kualitas kain jerseynya juara! Jahitan rapi, adem dipakai 90 menit penuh di cuaca terik.',
              rating: 5,
            },
            {
              name: 'Budi Wicaksono',
              role: 'Kolektor Jersey Nusantara',
              quote: 'Admin WhatsApp gercep banget jawab pertanyaan stok. Pengiriman ke Surabaya cuma 1 hari.',
              rating: 5,
            },
            {
              name: 'Dimas Anggara',
              role: 'Futsal Enthusiast',
              quote: 'Sudah order 3 kali untuk satu set seragam tim. Semua member puas dan pas ukurannya.',
              rating: 5,
            },
          ].map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-[26px] p-6 floating-shadow border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-[#F15A24] text-white font-black flex items-center justify-center text-xs">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <strong className="block text-sm font-bold text-slate-900 leading-none">
                    {review.name}
                  </strong>
                  <span className="text-xs text-slate-500">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
