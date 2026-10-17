import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { formatRupiah } from '../data/products'
import {
  ArrowLeftIcon,
  CartIcon,
  HeartIcon,
  StarIcon,
  ShieldCheckIcon,
  CheckIcon,
  WhatsAppIcon,
} from '../components/common/Icons'
import { GearVisual } from '../components/common/GearVisual'
import { ProductCard } from '../components/product/ProductCard'

export function ProductDetailPage() {
  const {
    selectedProductId,
    getProductById,
    allProducts,
    currencyMode,
    addToCart,
    isInWishlist,
    toggleWishlist,
    navigateTo,
  } = useShop()

  // Get active product or default to first product
  const product = getProductById(selectedProductId) || allProducts[0]

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('desc') // 'desc', 'size-guide', 'shipping'

  if (!product) {
    return (
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Produk tidak ditemukan</h2>
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold"
        >
          Kembali ke Katalog
        </button>
      </main>
    )
  }

  const isFav = isInWishlist(product.id)
  const displayPrice =
    currencyMode === 'USD'
      ? `$${product.priceUsd ?? 25}.00`
      : formatRupiah(product.price ?? 0)

  // Direct WhatsApp Buy Now for this single item
  const buyNowWhatsApp = () => {
    const totalAmount =
      currencyMode === 'USD'
        ? `$${(product.priceUsd ?? 25) * quantity}.00`
        : formatRupiah((product.price ?? 0) * quantity)

    const message = [
      `Halo Admin PLAYCART, saya ingin langsung memesan produk ini:`,
      ``,
      `• Produk: ${product.name}`,
      product.team ? `• Kategori / Tim: ${product.team}` : '',
      `• Ukuran: ${selectedSize}`,
      `• Jumlah: ${quantity}x`,
      `• Total: ${totalAmount}`,
      ``,
      `Mohon cek stok dan total ongkir ke alamat saya ya. Terima kasih!`,
    ]
      .filter(Boolean)
      .join('\n')

    const adminNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '')
    const url = adminNumber
      ? `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Related products in the same category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="hover:text-black transition"
        >
          Home
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className="hover:text-black transition"
        >
          Shop
        </button>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Back button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-black transition"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </button>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        {/* Left Column: Visual Display */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative rounded-[32px] overflow-hidden bg-white p-8 floating-shadow border border-slate-100/90 aspect-square flex items-center justify-center">
            {/* Badges */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              {product.badge && (
                <span className="text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                  {product.badge}
                </span>
              )}
              {product.discount && (
                <span className="text-xs font-black tracking-wider bg-[#F15A24]/10 text-[#F15A24] px-3 py-1 rounded-full">
                  Diskon {product.discount}
                </span>
              )}
            </div>

            {/* Favorite button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id, product.name)}
              className={`absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-150 active:scale-75 ${
                isFav ? 'text-[#F15A24]' : 'text-slate-400 hover:text-slate-700'
              }`}
              aria-label="Tambah ke Favorit"
            >
              <div className={isFav ? 'heart-pop-active' : ''}>
                <HeartIcon className="w-5 h-5" filled={isFav} />
              </div>
            </button>

            {/* Visual */}
            <div className="w-full h-full max-w-[360px] max-h-[360px] flex items-center justify-center transition-transform duration-500 hover:scale-105">
              {product.itemType && product.itemType !== 'jersey' ? (
                <GearVisual itemType={product.itemType} />
              ) : (
                <div
                  className="w-full h-full atlas-thumb rounded-2xl"
                  style={{ backgroundPosition: product.atlasPosition || '0% 0%' }}
                />
              )}
            </div>
          </div>

          {/* Mini Features Banner under image */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-slate-100 floating-shadow text-center">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Kualitas</span>
              <strong className="text-xs text-slate-900 font-extrabold">100% Original Fit</strong>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Material</span>
              <strong className="text-xs text-slate-900 font-extrabold">Dry-Fit Berpori</strong>
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block">Pengiriman</span>
              <strong className="text-xs text-slate-900 font-extrabold">Cepat 24 Jam</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Order Configuration */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {product.team && (
              <span className="text-xs font-black uppercase tracking-widest text-[#F15A24] block mb-1">
                {product.team} • {product.category}
              </span>
            )}

            <h1 className="font-condensed font-black uppercase text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight mb-3">
              {product.name}
            </h1>

            {/* Ratings and Reviews */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">{product.rating ?? 4.9}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-600 font-medium">
                {product.reviews ?? 145} ulasan pembeli
              </span>
              <span className="text-xs text-emerald-600 font-bold ml-2">✓ Stok Terverifikasi</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-slate-200">
              <strong className="font-condensed font-black text-3xl sm:text-4xl text-[#F15A24]">
                {displayPrice}
              </strong>
              {product.discount && (
                <span className="text-sm text-slate-400 line-through">
                  {currencyMode === 'USD' ? `$${(product.priceUsd ?? 25) + 8}.00` : formatRupiah((product.price ?? 400000) + 75000)}
                </span>
              )}
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="py-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Pilih Ukuran: <span className="text-[#F15A24] font-extrabold">{selectedSize}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('size-guide')}
                    className="text-xs font-bold text-slate-500 hover:text-[#F15A24] underline transition"
                  >
                    Panduan Ukuran
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] h-11 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-150 active:scale-90 flex items-center justify-center gap-1.5 ${
                        selectedSize === sz
                          ? 'bg-[#0A2419] text-white shadow-md scale-105'
                          : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <span>{sz}</span>
                      {selectedSize === sz && <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="py-6 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Jumlah Pesanan
              </span>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 active:scale-80 text-sm font-bold text-slate-700 transition"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-extrabold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 active:scale-80 text-sm font-bold text-slate-700 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => addToCart(product, selectedSize, quantity)}
                className="btn-sweep flex-1 py-4 px-6 rounded-full bg-[#F15A24] hover:bg-[#FF6F3B] text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#F15A24]/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <CartIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>+ Keranjang ({quantity} item)</span>
              </button>

              <button
                type="button"
                onClick={buyNowWhatsApp}
                className="btn-sweep flex-1 py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Beli via WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Guarantee Pill */}
          <div className="mt-8 flex items-center gap-3 p-3.5 bg-slate-100 rounded-2xl text-xs text-slate-700">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Garansi Penukaran Ukuran:</strong> Jika ukuran tidak pas saat dicoba, dapat ditukar dalam 3 hari setelah konfirmasi admin.
            </span>
          </div>
        </div>
      </div>

      {/* Specification & Size Guide Tabs */}
      <section className="mb-16 bg-white rounded-[32px] p-6 sm:p-10 floating-shadow border border-slate-100">
        <div className="flex border-b border-slate-200 gap-6 sm:gap-8 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('desc')}
            className={`pb-3 text-sm font-extrabold uppercase tracking-wider transition border-b-2 ${
              activeTab === 'desc'
                ? 'border-[#F15A24] text-[#F15A24]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Spesifikasi Produk
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('size-guide')}
            className={`pb-3 text-sm font-extrabold uppercase tracking-wider transition border-b-2 ${
              activeTab === 'size-guide'
                ? 'border-[#F15A24] text-[#F15A24]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Panduan Ukuran (Size Chart)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 text-sm font-extrabold uppercase tracking-wider transition border-b-2 ${
              activeTab === 'shipping'
                ? 'border-[#F15A24] text-[#F15A24]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Pengiriman & WhatsApp
          </button>
        </div>

        {activeTab === 'desc' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            <p>
              Koleksi <strong>{product.name}</strong> dibuat dengan teknologi rajutan serat mikro mutakhir yang dirancang khusus untuk kenyamanan maksimal saat berolahraga dan bertanding.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Material:</strong> 100% Recycled Breathable Poly-DryFit.</li>
              <li><strong>Moisture Management:</strong> Menyerap dan menguapkan keringat dengan cepat.</li>
              <li><strong>Fit:</strong> Athletic Slim Fit yang fleksibel mengikuti kontur tubuh pemain.</li>
              <li><strong>Perawatan:</strong> Cuci dengan air dingin, hindari pemutih, dan jangan menyetrika sablon secara langsung.</li>
            </ul>
          </div>
        )}

        {activeTab === 'size-guide' && (
          <div className="overflow-x-auto max-w-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-800 font-extrabold">
                  <th className="py-2.5">Ukuran</th>
                  <th className="py-2.5">Lebar Dada (cm)</th>
                  <th className="py-2.5">Panjang Baju (cm)</th>
                  <th className="py-2.5">Tinggi Badan Rekomendasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="py-2.5 font-bold text-slate-900">S</td>
                  <td className="py-2.5">48 cm</td>
                  <td className="py-2.5">68 cm</td>
                  <td className="py-2.5">155 - 165 cm</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-slate-900">M</td>
                  <td className="py-2.5">50 cm</td>
                  <td className="py-2.5">70 cm</td>
                  <td className="py-2.5">165 - 172 cm</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-slate-900">L</td>
                  <td className="py-2.5">52 cm</td>
                  <td className="py-2.5">72 cm</td>
                  <td className="py-2.5">170 - 178 cm</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-slate-900">XL</td>
                  <td className="py-2.5">54 cm</td>
                  <td className="py-2.5">74 cm</td>
                  <td className="py-2.5">175 - 185 cm</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-slate-900">XXL</td>
                  <td className="py-2.5">56 cm</td>
                  <td className="py-2.5">76 cm</td>
                  <td className="py-2.5">&gt; 180 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            <p>
              Setelah Anda mengklik <strong>Beli via WhatsApp</strong> atau memasukkan ke keranjang dan checkout, pesan pemesanan akan otomatis terbuat.
            </p>
            <p>
              Admin kami akan langsung memverifikasi ketersediaan stok fisik barang, menghitung estimasi ongkos kirim (JNE, J&T, SiCepat), dan memberikan rekening pembayaran resmi.
            </p>
          </div>
        )}
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-condensed font-black uppercase text-2xl sm:text-3xl text-slate-900 tracking-tight">
              PRODUK TERKAIT LAINNYA
            </h2>
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="text-xs font-bold text-[#F15A24] hover:underline"
            >
              Lihat Semua
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
