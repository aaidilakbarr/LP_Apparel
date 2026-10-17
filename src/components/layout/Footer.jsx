import { useShop } from '../../context/ShopContext'
import { SparkIcon, ArrowRightIcon } from '../common/Icons'

export function Footer() {
  const { navigateTo, setCategory, showNotice } = useShop()

  const handleCategoryClick = (cat) => {
    setCategory(cat)
    navigateTo('shop')
  }

  return (
    <footer id="support" className="bg-[#090D0A] text-slate-300 pt-16 pb-12 relative overflow-hidden mt-auto">
      {/* Massive Background Watermark */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[15vw] font-condensed font-black text-white/[0.03] tracking-tighter whitespace-nowrap leading-none">
        PLAYCART
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <SparkIcon className="w-6 h-6 text-[#F15A24]" />
              <span className="font-extrabold tracking-tight text-xl text-white">PLAYCART</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Toko perlengkapan jersey dan peralatan olahraga resmi dengan konfirmasi langsung lewat WhatsApp.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F15A24] text-white flex items-center justify-center transition text-xs font-bold cursor-pointer">
                IG
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F15A24] text-white flex items-center justify-center transition text-xs font-bold cursor-pointer">
                TK
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F15A24] text-white flex items-center justify-center transition text-xs font-bold cursor-pointer">
                YT
              </span>
            </div>
          </div>

          {/* Col 2: Shop Links */}
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Tim Nasional')}
                  className="hover:text-white transition text-left"
                >
                  Tim Nasional Kit
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Klub')}
                  className="hover:text-white transition text-left"
                >
                  Koleksi Klub Liga
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Goalkeeper')}
                  className="hover:text-white transition text-left"
                >
                  Koleksi Goalkeeper
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('Equipment')}
                  className="hover:text-white transition text-left"
                >
                  Aksesoris & Helm Olahraga
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: About Links */}
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-4">About</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition text-left"
                >
                  Filosofi Desain
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition text-left"
                >
                  Standar Kualitas Bahan
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition text-left"
                >
                  Ukuran & Panduan Size
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition text-left"
                >
                  Cara Pesan WhatsApp
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-4">Newsletter</h3>
            <p className="text-xs text-slate-400 mb-4">
              Dapatkan kabar diskon kilat dan peluncuran kit musim baru lebih awal.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                showNotice('Terima kasih telah berlangganan newsletter!')
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="Masukkan email Anda"
                className="bg-white/10 border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#F15A24] flex-1"
              />
              <button
                type="submit"
                aria-label="Kirim email langganan"
                className="w-9 h-9 rounded-full bg-[#F15A24] hover:bg-[#FF6F3B] text-white flex items-center justify-center shrink-0 transition"
              >
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 PLAYCART. All rights reserved.</p>
          <p>Dibangun untuk performa terbaik di setiap pertandingan.</p>
        </div>
      </div>
    </footer>
  )
}
