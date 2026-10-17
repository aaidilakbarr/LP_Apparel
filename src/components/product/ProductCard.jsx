import { useShop } from '../../context/ShopContext'
import { formatRupiah } from '../../data/products'
import { CartIcon, HeartIcon, StarIcon } from '../common/Icons'
import { GearVisual } from '../common/GearVisual'

export function ProductCard({ product }) {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    selectedSizes,
    setProductSize,
    currencyMode,
    navigateTo,
  } = useShop()

  const isFav = isInWishlist(product.id)
  const activeSize = selectedSizes[product.id] || product.sizes?.[0] || 'Standard'
  const displayPrice =
    currencyMode === 'USD'
      ? `$${product.priceUsd ?? 25}.00`
      : formatRupiah(product.price ?? 0)

  return (
    <article className="bg-white rounded-[26px] p-5 floating-shadow border border-slate-100/80 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-orange-200/60">
      <div>
        {/* Top Meta: Badges & Wishlist */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            {product.badge && (
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-xs">
                {product.badge}
              </span>
            )}
            {product.discount && (
              <span className="text-[10px] font-black tracking-wider bg-[#F15A24]/10 text-[#F15A24] px-2 py-0.5 rounded-full">
                {product.discount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id, product.name)}
            aria-label={`Favoritkan ${product.name}`}
            className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-50 active:scale-75 transition-all duration-150 ${
              isFav ? 'text-[#F15A24]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={isFav ? 'heart-pop-active' : ''}>
              <HeartIcon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" filled={isFav} />
            </div>
          </button>
        </div>

        {/* Product Visual - Clickable to open Detail Page */}
        <div
          onClick={() => navigateTo('product', product.id)}
          className="aspect-[1/1.05] rounded-2xl overflow-hidden relative mb-4 cursor-pointer bg-slate-50 border border-slate-100/50"
        >
          <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-108 flex items-center justify-center">
            {product.itemType && product.itemType !== 'jersey' ? (
              <GearVisual itemType={product.itemType} />
            ) : (
              <div
                className="w-full h-full atlas-thumb"
                style={{ backgroundPosition: product.atlasPosition || '0% 0%' }}
              />
            )}
          </div>
          {product.type && (
            <span className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-sm transition-transform duration-200 group-hover:translate-x-0.5">
              {product.type}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex items-center gap-1 text-xs text-slate-700 mb-1">
          <StarIcon className="w-3.5 h-3.5" />
          <span className="font-bold text-slate-800">{product.rating ?? 4.9}</span>
          <span className="text-slate-500">({product.reviews ?? 120} ulasan)</span>
        </div>

        {product.team && (
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            {product.team}
          </p>
        )}

        <h3
          onClick={() => navigateTo('product', product.id)}
          className="font-condensed font-black uppercase text-xl text-slate-900 tracking-tight leading-tight mt-0.5 mb-2 hover:text-[#F15A24] cursor-pointer transition-colors duration-150"
        >
          {product.name}
        </h3>

        <strong className="block text-[#F15A24] font-black text-xl mb-3">
          {displayPrice}
        </strong>

        {/* Size Picker */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Pilih Ukuran
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setProductSize(product.id, sz)}
                  className={`min-w-[34px] h-8 px-2 rounded-lg text-xs font-bold transition-all duration-150 active:scale-90 ${
                    activeSize === sz
                      ? 'bg-[#0A2419] text-white shadow-sm scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add to Cart CTA */}
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          onClick={() => addToCart(product, activeSize)}
          className="btn-sweep flex-1 py-3 rounded-full text-xs sm:text-sm font-extrabold bg-[#F15A24] hover:bg-[#FF6F3B] text-white transition-all duration-200 shadow-md shadow-[#F15A24]/20 hover:shadow-[#F15A24]/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <CartIcon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
          <span>Tambah ke Keranjang</span>
        </button>
      </div>
    </article>
  )
}
