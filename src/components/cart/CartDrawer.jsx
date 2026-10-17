import { useShop } from '../../context/ShopContext'
import { formatRupiah } from '../../data/products'
import { CartIcon, CloseIcon, ArrowRightIcon } from '../common/Icons'
import { GearVisual } from '../common/GearVisual'

export function CartDrawer() {
  const {
    cart,
    itemCount,
    cartDrawerOpen,
    setCartDrawerOpen,
    changeQuantity,
    removeItem,
    currencyMode,
    subtotalIdr,
    subtotalUsd,
    checkoutWhatsApp,
    navigateTo,
  } = useShop()

  if (!cartDrawerOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm backdrop-fade-in transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      {/* Drawer Body */}
      <aside className="relative z-10 w-full max-w-md bg-white h-full flex flex-col shadow-2xl cart-drawer-enter">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#F15A24]">
              PILIHAN ANDA
            </p>
            <h2 id="cart-title" className="font-condensed font-black uppercase text-2xl text-slate-900">
              Keranjang ({itemCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCartDrawerOpen(false)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-700 flex items-center justify-center transition"
            aria-label="Tutup keranjang"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <CartIcon className="w-8 h-8" />
            </div>
            <h3 className="font-condensed font-black uppercase text-2xl text-slate-900 mb-1">
              Keranjang Kosong
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mb-6">
              Pilih produk dari hero cards atau katalog untuk menambahkan kit ke keranjang.
            </p>
            <button
              type="button"
              onClick={() => {
                setCartDrawerOpen(false)
                navigateTo('shop')
              }}
              className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-black active:scale-95 text-white text-xs font-bold uppercase tracking-wider transition"
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {cart.map((item) => (
                <article
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-100/60"
                >
                  {/* Thumb */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-100 flex items-center justify-center">
                    {item.itemType && item.itemType !== 'jersey' ? (
                      <GearVisual itemType={item.itemType} />
                    ) : (
                      <div
                        className="w-full h-full atlas-thumb"
                        style={{ backgroundPosition: item.atlasPosition || '0% 0%' }}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 truncate">{item.name}</h3>
                      <p className="text-xs text-slate-500">
                        Ukuran: <strong className="text-slate-800">{item.size}</strong>
                      </p>
                      <strong className="text-xs font-black text-[#F15A24] block mt-1">
                        {currencyMode === 'USD'
                          ? `$${(item.priceUsd || 25) * item.quantity}.00`
                          : formatRupiah((item.price || 0) * item.quantity)}
                      </strong>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, item.size, -1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 active:scale-80 text-xs font-bold transition"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, item.size, 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 active:scale-80 text-xs font-bold transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-xs font-bold text-red-600 hover:underline active:scale-95 transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-slate-500">Total Sementara</span>
                <strong className="font-condensed font-black text-2xl text-slate-900">
                  {currencyMode === 'USD' ? `$${subtotalUsd}.00` : formatRupiah(subtotalIdr)}
                </strong>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Stok dan ongkir dikonfirmasi admin secara langsung. Belum ada potongan dana sebelum konfirmasi.
              </p>

              <button
                type="button"
                onClick={() => checkoutWhatsApp()}
                className="btn-sweep w-full py-3.5 rounded-full bg-[#F15A24] hover:bg-[#FF6F3B] text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#F15A24]/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Tanyakan Stok via WhatsApp →
              </button>

              <button
                type="button"
                onClick={() => {
                  setCartDrawerOpen(false)
                  navigateTo('cart')
                }}
                className="w-full py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all duration-150 border border-slate-200 flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>Halaman Form Checkout</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
