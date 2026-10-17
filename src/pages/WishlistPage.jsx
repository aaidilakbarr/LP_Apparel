import { useShop } from '../context/ShopContext'
import { ProductCard } from '../components/product/ProductCard'
import { HeartIcon } from '../components/common/Icons'

export function WishlistPage() {
  const { wishlist, allProducts, heroProducts, navigateTo } = useShop()

  // Collect wishlist items without duplicates
  const combined = [...heroProducts, ...allProducts]
  const favoriteItems = combined.filter(
    (item, idx, self) =>
      wishlist.includes(item.id) && self.findIndex((i) => i.id === item.id) === idx,
  )

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="hover:text-black transition"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-slate-900 font-bold">Daftar Favorit</span>
      </nav>

      {/* Title */}
      <div className="border-b border-slate-200 pb-4 mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-[#F15A24] mb-1">
          WISHLIST SAYA
        </p>
        <h1 className="font-condensed font-black uppercase text-3xl sm:text-5xl text-slate-900 tracking-tight leading-none">
          PRODUK FAVORIT TERSIMPAN ({favoriteItems.length})
        </h1>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl floating-shadow border border-slate-100 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <HeartIcon className="w-8 h-8" />
          </div>
          <h2 className="font-condensed font-black uppercase text-2xl text-slate-900 mb-2">
            Belum Ada Produk Favorit
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Klik ikon hati pada produk di katalog untuk menyimpannya ke daftar ini.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition"
          >
            Jelajahi Katalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  )
}
