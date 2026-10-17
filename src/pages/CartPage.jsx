import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { formatRupiah } from '../data/products'
import {
  CartIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  WhatsAppIcon,
  ShieldCheckIcon,
} from '../components/common/Icons'
import { GearVisual } from '../components/common/GearVisual'

export function CartPage() {
  const {
    cart,
    itemCount,
    changeQuantity,
    removeItem,
    clearCart,
    currencyMode,
    subtotalIdr,
    subtotalUsd,
    checkoutWhatsApp,
    navigateTo,
  } = useShop()

  // Checkout Form State
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  })

  const [formError, setFormError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckoutSubmit = (e) => {
    e.preventDefault()
    if (!customerData.name.trim()) {
      setFormError('Mohon isi nama lengkap Anda.')
      return
    }
    setFormError('')
    checkoutWhatsApp(customerData)
  }

  if (cart.length === 0) {
    return (
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="max-w-md mx-auto bg-white rounded-[32px] p-8 sm:p-12 floating-shadow border border-slate-100">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-6">
            <CartIcon className="w-10 h-10" />
          </div>
          <h2 className="font-condensed font-black uppercase text-3xl text-slate-900 mb-2">
            Keranjang Masih Kosong
          </h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            Anda belum menambahkan jersey atau perlengkapan apa pun ke keranjang belanja.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('shop')}
            className="w-full py-3.5 rounded-full bg-[#F15A24] hover:bg-[#FF6F3B] text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-[#F15A24]/30"
          >
            Mulai Belanja di Katalog
          </button>
        </div>
      </main>
    )
  }

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
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className="hover:text-black transition"
        >
          Shop
        </button>
        <span>/</span>
        <span className="text-slate-900 font-bold">Keranjang & Checkout</span>
      </nav>

      {/* Title */}
      <div className="flex items-end justify-between border-b border-slate-200 pb-4 mb-8">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#F15A24] mb-1">
            CHECKOUT PEMESANAN
          </p>
          <h1 className="font-condensed font-black uppercase text-3xl sm:text-5xl text-slate-900 tracking-tight leading-none">
            KERANJANG ANDA ({itemCount} ITEM)
          </h1>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-bold text-red-600 hover:underline"
        >
          Kosongkan Keranjang
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map((item) => (
            <article
              key={`${item.id}-${item.size}`}
              className="bg-white rounded-[24px] p-4 sm:p-5 floating-shadow border border-slate-100 flex gap-4 sm:gap-6 items-center"
            >
              {/* Product Visual */}
              <div
                onClick={() => navigateTo('product', item.id)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0 flex items-center justify-center cursor-pointer"
              >
                {item.itemType && item.itemType !== 'jersey' ? (
                  <GearVisual itemType={item.itemType} />
                ) : (
                  <div
                    className="w-full h-full atlas-thumb"
                    style={{ backgroundPosition: item.atlasPosition || '0% 0%' }}
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {item.category ?? 'Jersey'}
                </span>
                <h3
                  onClick={() => navigateTo('product', item.id)}
                  className="font-bold text-sm sm:text-base text-slate-900 truncate cursor-pointer hover:text-[#F15A24] transition-colors"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Ukuran: <strong className="text-slate-900 font-extrabold">{item.size}</strong>
                </p>
                <strong className="text-sm font-black text-[#F15A24] block mt-1">
                  {currencyMode === 'USD'
                    ? `$${(item.priceUsd || 25) * item.quantity}.00`
                    : formatRupiah((item.price || 0) * item.quantity)}
                </strong>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.id, item.size, -1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-xs font-bold"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.id, item.size, 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 text-xs font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id, item.size)}
                  className="text-xs font-bold text-red-500 hover:text-red-700 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </article>
          ))}

          <div className="pt-4">
            <button
              type="button"
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-black transition"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Tambah Produk Lain dari Katalog</span>
            </button>
          </div>
        </div>

        {/* Right Column: Customer Details & Order Confirmation */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 floating-shadow border border-slate-100 sticky top-24">
            <h2 className="font-condensed font-black uppercase text-2xl text-slate-900 mb-4 pb-3 border-b border-slate-100">
              Data Pemesan & Checkout
            </h2>

            {formError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  value={customerData.name}
                  onChange={handleInputChange}
                  placeholder="Contoh: Budi Santoso"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F15A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customerData.phone}
                  onChange={handleInputChange}
                  placeholder="Contoh: 08123456789"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F15A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Alamat Lengkap Pengiriman
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={customerData.address}
                  onChange={handleInputChange}
                  placeholder="Nama Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, Kota"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F15A24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Catatan Tambahan (Opsional)
                </label>
                <input
                  type="text"
                  name="notes"
                  value={customerData.notes}
                  onChange={handleInputChange}
                  placeholder="Misal: Harap packing ekstra / titip pos satpam"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F15A24]"
                />
              </div>

              {/* Order Cost Calculation */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal ({itemCount} item)</span>
                  <span className="font-bold text-slate-800">
                    {currencyMode === 'USD' ? `$${subtotalUsd}.00` : formatRupiah(subtotalIdr)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Ongkos Kirim</span>
                  <span className="font-bold text-emerald-600">Dihitung oleh Admin via WA</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-900">Total Produk</span>
                  <strong className="font-condensed font-black text-2xl text-[#F15A24]">
                    {currencyMode === 'USD' ? `$${subtotalUsd}.00` : formatRupiah(subtotalIdr)}
                  </strong>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-sweep w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
              >
                <WhatsAppIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Kirim Pesanan ke WhatsApp Admin</span>
              </button>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 text-center justify-center">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pembayaran resmi ditransfer setelah admin memverifikasi fisik stok.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
