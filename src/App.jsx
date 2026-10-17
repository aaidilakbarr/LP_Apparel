import { ShopProvider, useShop } from './context/ShopContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CartDrawer } from './components/cart/CartDrawer'
import { WishlistDrawer } from './components/cart/WishlistDrawer'
import { Toast } from './components/common/Toast'

// Pages
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { AboutPage } from './pages/AboutPage'
import { CartPage } from './pages/CartPage'
import { WishlistPage } from './pages/WishlistPage'

function AppContent() {
  const { currentPage, selectedProductId, notice } = useShop()

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage />
      case 'product':
        return <ProductDetailPage />
      case 'about':
        return <AboutPage />
      case 'cart':
        return <CartPage />
      case 'wishlist':
        return <WishlistPage />
      case 'home':
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-slate-900 selection:bg-[#F15A24] selection:text-white">
      {/* Top Floating Navigation */}
      <Navbar />

      {/* Dynamic Page Router with Smooth Micro-Transition */}
      <div
        key={currentPage + (selectedProductId || '')}
        className="page-transition flex-1 flex flex-col"
      >
        {renderPage()}
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Drawers & Notifications */}
      <CartDrawer />
      <WishlistDrawer />
      <Toast notice={notice} />
    </div>
  )
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  )
}
