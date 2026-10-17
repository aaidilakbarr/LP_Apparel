import { useShop } from '../../context/ShopContext'
import { formatRupiah } from '../../data/products'
import { HeartIcon, CloseIcon } from '../common/Icons'

export function WishlistDrawer() {
  const {
    wishlist,
    wishlistDrawerOpen,
    setWishlistDrawerOpen,
    toggleWishlist,
    addToCart,
    currencyMode,
    allProducts,
    heroProducts,
    navigateTo,
  } = useShop()

  if (!wishlistDrawerOpen) return null

  // Collect wishlist items without duplicates
  const combined = [...heroProducts, ...allProducts]
  const favoriteItems = combined.filter(
    (item, idx, self) =>
      wishlist.includes(item.id) && self.findIndex((i) => i.id === item.id) === idx,
  )

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wish-title"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm backdrop-fade-in"
        onClick={() => setWishlistDrawerOpen(false)}
      />
      <aside className="relative z-10 w-full max-w-md bg-white h-full flex flex-col shadow-2xl cart-drawer-enter">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#F15A24]">
              SIMPANAN FAVORIT
            </p>
            <h2 id="wish-title" className="font-condensed font-black uppercase text-2xl text-slate-900">
              Favorit ({wishlist.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setWishlistDrawerOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-700 flex items-center justify-center transition"
            aria-label="Tutup favorit"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {favoriteItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <HeartIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm">Belum ada produk favorit tersimpan.</p>
            </div>
          ) : (
            favoriteItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div
                  onClick={() => {
                    setWishlistDrawerOpen(false)
                    navigateTo('product', item.id)
                  }}
                  className="cursor-pointer flex-1 mr-2"
                >
                  <h3 className="font-bold text-sm text-slate-900 hover:text-[#F15A24] transition">
                    {item.name}
                  </h3>
                  <span className="text-xs text-[#F15A24] font-black">
                    {currencyMode === 'USD'
                      ? `$${item.priceUsd ?? 25}.00`
                      : formatRupiah(item.price ?? 0)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#F15A24] text-white hover:bg-[#FF6F3B] transition"
                  >
                    + Beli
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item.id, item.name)}
                    className="w-7 h-7 rounded-full text-slate-400 hover:text-red-500 flex items-center justify-center transition"
                    title="Hapus dari favorit"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  )
}
