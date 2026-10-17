import { useState } from 'react'
import { useShop } from '../../context/ShopContext'
import {
  SparkIcon,
  SearchIcon,
  HeartIcon,
  CartIcon,
  UserIcon,
} from '../common/Icons'

export function Navbar() {
  const {
    currentPage,
    navigateTo,
    itemCount,
    wishlist,
    setCartDrawerOpen,
    setWishlistDrawerOpen,
    showNotice,
  } = useShop()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (page) => {
    navigateTo(page)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-3 sm:pt-4 pb-2">
      <nav
        aria-label="Navigasi Utama"
        className="relative bg-white rounded-full px-5 sm:px-8 py-3 flex items-center justify-between floating-shadow border border-slate-100/90 transition-all duration-200"
      >
        {/* Left: Brand Logo with Spark Icon */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group cursor-pointer border-none bg-transparent p-0 text-left shrink-0"
          aria-label="PLAYCART Home"
        >
          <div className="text-[#F15A24] transition-transform duration-300 group-hover:rotate-45">
            <SparkIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <span className="font-extrabold tracking-tight text-lg sm:text-xl text-black">
            PLAYCART
          </span>
        </button>

        {/* Center: Navigation Links with Animated Pill Feedback - Perfectly Centered */}
        <div className="hidden md:flex items-center gap-1.5 text-sm font-medium bg-slate-50/80 p-1 rounded-full border border-slate-100 absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          {[
            { id: 'home', label: 'Home' },
            { id: 'shop', label: 'Shop & Katalog' },
            { id: 'about', label: 'Tentang Kami' },
            { id: 'cart', label: 'Checkout' },
          ].map((item) => {
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#F15A24] shadow-sm font-black'
                    : 'text-slate-600 hover:text-black hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => {
              navigateTo('shop')
              setTimeout(() => {
                const el = document.getElementById('catalog-search')
                el?.focus()
              }, 150)
            }}
            aria-label="Cari Produk"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 active:scale-90 transition-all duration-150"
          >
            <SearchIcon className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
          </button>

          {/* Wishlist Drawer Trigger */}
          <button
            type="button"
            onClick={() => setWishlistDrawerOpen(true)}
            aria-label="Daftar Favorit"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 active:scale-90 transition-all duration-150 relative"
          >
            <HeartIcon className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
            {wishlist.length > 0 && (
              <span
                key={wishlist.length}
                className="badge-pop absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F15A24]"
              />
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={() => setCartDrawerOpen(true)}
            aria-label={`Keranjang (${itemCount} item)`}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 active:scale-90 transition-all duration-150 relative"
          >
            <CartIcon className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
            <span
              key={itemCount}
              className="badge-pop absolute -top-1 -right-1 bg-[#F15A24] text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
            >
              {itemCount}
            </span>
          </button>

          {/* User Profile */}
          <button
            type="button"
            onClick={() => showNotice('Fitur akun pemain segera hadir!')}
            aria-label="Akun Pemain"
            className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center text-slate-700 hover:text-black hover:bg-slate-100 active:scale-90 transition-all duration-150"
          >
            <UserIcon className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-90 transition"
            aria-label="Buka Menu"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-white rounded-2xl floating-shadow border border-slate-100 flex flex-col gap-2 text-sm font-semibold">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`py-2 px-3 text-left rounded-lg transition ${currentPage === 'home' ? 'bg-orange-50 text-[#F15A24]' : 'text-slate-800'
              }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shop')}
            className={`py-2 px-3 text-left rounded-lg transition ${currentPage === 'shop' ? 'bg-orange-50 text-[#F15A24]' : 'text-slate-800'
              }`}
          >
            Shop & Katalog
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`py-2 px-3 text-left rounded-lg transition ${currentPage === 'about' ? 'bg-orange-50 text-[#F15A24]' : 'text-slate-800'
              }`}
          >
            Tentang Kami
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('cart')}
            className={`py-2 px-3 text-left rounded-lg transition ${currentPage === 'cart' ? 'bg-orange-50 text-[#F15A24]' : 'text-slate-800'
              }`}
          >
            Keranjang & Checkout ({itemCount})
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false)
              setWishlistDrawerOpen(true)
            }}
            className="py-2 px-3 text-left rounded-lg text-slate-800"
          >
            Daftar Favorit ({wishlist.length})
          </button>
        </div>
      )}
    </header>
  )
}
