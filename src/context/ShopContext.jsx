import { createContext, useContext, useEffect, useState } from 'react'
import { formatRupiah, products, heroProducts, categories } from '../data/products'

const CART_KEY = 'jersey-store-cart-v2'
const WISHLIST_KEY = 'jersey-store-wishlist-v2'

const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  // Navigation & Page routing
  const parseHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '')
    if (hash.startsWith('product/')) {
      const id = parseInt(hash.replace('product/', ''), 10)
      return { page: 'product', id: isNaN(id) ? null : id }
    }
    if (['home', 'shop', 'about', 'cart', 'wishlist'].includes(hash)) {
      return { page: hash, id: null }
    }
    return { page: 'home', id: null }
  }

  const initialRoute = parseHash()
  const [currentPage, setCurrentPage] = useState(initialRoute.page)
  const [selectedProductId, setSelectedProductId] = useState(initialRoute.id)

  // Listen to browser Back/Forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHash()
      setCurrentPage(route.page)
      setSelectedProductId(route.id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = (page, productId = null) => {
    setCurrentPage(page)
    setSelectedProductId(productId)
    if (page === 'product' && productId) {
      window.location.hash = `#/product/${productId}`
    } else if (page === 'home') {
      window.location.hash = '#/'
    } else {
      window.location.hash = `#/${page}`
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) ?? []
    } catch {
      return []
    }
  })

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_KEY)) ?? [101, 1]
    } catch {
      return [101, 1]
    }
  })

  const [selectedSizes, setSelectedSizes] = useState({})
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Semua')
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false)
  const [currencyMode, setCurrencyMode] = useState('IDR') // Default IDR
  const [notice, setNotice] = useState('')

  // Persist Cart
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  // Persist Wishlist
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  // Clear notice after delay
  useEffect(() => {
    if (!notice) return undefined
    const timeout = window.setTimeout(() => setNotice(''), 2500)
    return () => window.clearTimeout(timeout)
  }, [notice])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (cartDrawerOpen || wishlistDrawerOpen) {
      document.body.classList.add('drawer-open')
    } else {
      document.body.classList.remove('drawer-open')
    }
  }, [cartDrawerOpen, wishlistDrawerOpen])

  const showNotice = (msg) => {
    setNotice(msg)
  }

  const toggleWishlist = (id, name) => {
    setWishlist((current) => {
      const exists = current.includes(id)
      if (exists) {
        showNotice(`${name} dihapus dari favorit.`)
        return current.filter((item) => item !== id)
      }
      showNotice(`♥ ${name} ditambahkan ke favorit!`)
      return [...current, id]
    })
  }

  const isInWishlist = (id) => wishlist.includes(id)

  const addToCart = (product, forcedSize = null, quantity = 1) => {
    const size = forcedSize || selectedSizes[product.id] || product.sizes?.[0] || 'Standard'
    setCart((current) => {
      const itemIndex = current.findIndex((item) => item.id === product.id && item.size === size)
      if (itemIndex === -1) {
        return [...current, { ...product, size, quantity }]
      }
      return current.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + quantity } : item,
      )
    })
    showNotice(`✓ ${product.name} (${size}) ditambahkan ke keranjang!`)
  }

  const changeQuantity = (id, size, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(0, item.quantity + amount) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id, size) => {
    setCart((current) => current.filter((item) => !(item.id === id && item.size === size)))
    showNotice('Item dihapus dari keranjang.')
  }

  const clearCart = () => {
    setCart([])
  }

  const setProductSize = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }))
  }

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotalIdr = cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0)
  const subtotalUsd = cart.reduce((total, item) => total + (item.priceUsd || 25) * item.quantity, 0)

  // WhatsApp Checkout Helper
  const checkoutWhatsApp = (customerData = null) => {
    if (!cart.length) return
    const lines = cart.map(
      (item, index) =>
        `${index + 1}. ${item.name} (${item.size})\n   Jumlah: ${item.quantity}x\n   Harga: ${
          currencyMode === 'USD'
            ? `$${(item.priceUsd || 25) * item.quantity}`
            : formatRupiah((item.price || 0) * item.quantity)
        }`,
    )
    const totalText = currencyMode === 'USD' ? `$${subtotalUsd}.00` : formatRupiah(subtotalIdr)

    let customerInfo = []
    if (customerData?.name) {
      customerInfo = [
        '',
        '--- DATA PEMESAN ---',
        `Nama: ${customerData.name}`,
        customerData.phone ? `No. Telp / WA: ${customerData.phone}` : '',
        customerData.address ? `Alamat: ${customerData.address}` : '',
        customerData.notes ? `Catatan: ${customerData.notes}` : '',
      ].filter(Boolean)
    }

    const message = [
      'Halo Admin PLAYCART, saya ingin memesan produk berikut:',
      '',
      ...lines,
      '',
      `Total sementara: ${totalText}`,
      ...customerInfo,
      '',
      'Mohon konfirmasi ketersediaan stok, ongkos kirim, dan instruksi pembayarannya. Terima kasih!',
    ].join('\n')

    const adminNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '')
    const url = adminNumber
      ? `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // All combined products for search and lookups
  const allProducts = [...products]

  const getProductById = (id) => {
    return (
      allProducts.find((p) => p.id === id) ||
      heroProducts.find((p) => p.id === id) ||
      null
    )
  }

  return (
    <ShopContext.Provider
      value={{
        // Routing
        currentPage,
        selectedProductId,
        navigateTo,
        // Cart
        cart,
        addToCart,
        changeQuantity,
        removeItem,
        clearCart,
        itemCount,
        subtotalIdr,
        subtotalUsd,
        cartDrawerOpen,
        setCartDrawerOpen,
        checkoutWhatsApp,
        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistDrawerOpen,
        setWishlistDrawerOpen,
        // Sizes
        selectedSizes,
        setProductSize,
        // Filter & Search
        category,
        setCategory,
        query,
        setQuery,
        categories,
        // Currency & Notice
        currencyMode,
        setCurrencyMode,
        notice,
        showNotice,
        // Data helpers
        getProductById,
        allProducts,
        heroProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return context
}
