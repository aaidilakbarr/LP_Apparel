import { useShop } from '../context/ShopContext'
import { SparkIcon, ShieldCheckIcon, ArrowRightIcon } from '../components/common/Icons'

export function AboutPage() {
  const { navigateTo } = useShop()

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-3" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="hover:text-black transition"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold">Tentang Kami</span>
        </nav>

        <p className="text-xs font-black uppercase tracking-widest text-[#F15A24] mb-1">
          FILOSOFI & DEDIKASI
        </p>
        <h1 className="font-condensed font-black uppercase text-4xl sm:text-6xl text-slate-900 tracking-tight leading-none">
          DIBANGUN UNTUK PERFORMA
          <br />
          DI SETIAP PERTANDINGAN
        </h1>
      </div>

      {/* Hero Banner Card */}
      <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0A2419] text-white p-8 sm:p-14 mb-12 floating-shadow">
        <div className="max-w-2xl relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
            <SparkIcon className="w-6 h-6" />
          </div>
          <h2 className="font-condensed font-black uppercase text-2xl sm:text-4xl tracking-tight leading-tight mb-4">
            Kami Percaya Setiap Pemain Berhak Mendapatkan Perlengkapan Standar Juara
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-8">
            PLAYCART berawal dari keresahan para pemain futsal dan sepak bola yang kesulitan menemukan jersey berkualitas dengan ukuran presisi dan bahan yang sejuk saat bertanding. Kami menggabungkan bahan poliester mikro mutakhir dengan alur pemesanan langsung ke admin WhatsApp tanpa perantara yang rumit.
          </p>

          <div className="flex flex-wrap gap-8 pt-6 border-t border-white/15">
            <div>
              <strong className="font-condensed font-black text-3xl sm:text-4xl text-white block">950K+</strong>
              <span className="text-xs text-slate-300 font-bold uppercase">Jersey Terkirim</span>
            </div>
            <div>
              <strong className="font-condensed font-black text-3xl sm:text-4xl text-[#F15A24] block">99.4%</strong>
              <span className="text-xs text-slate-300 font-bold uppercase">Ulasan Puas</span>
            </div>
            <div>
              <strong className="font-condensed font-black text-3xl sm:text-4xl text-white block">24 Jam</strong>
              <span className="text-xs text-slate-300 font-bold uppercase">Konfirmasi Cepat</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-[28px] p-8 floating-shadow border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#F15A24] flex items-center justify-center mb-6 font-black text-lg">
              01
            </div>
            <h3 className="font-condensed font-black uppercase text-2xl tracking-tight text-slate-900 mb-2">
              Bahan Micro-DryFit
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Teknologi sirkulasi udara mikro yang menguapkan keringat lebih cepat 40% dibanding kain jersey standar.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-8 floating-shadow border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 font-black text-lg">
              02
            </div>
            <h3 className="font-condensed font-black uppercase text-2xl tracking-tight text-slate-900 mb-2">
              Jahitan Rantai Kuat
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dibuat dengan jahitan empat jarum yang tahan terhadap tarikan dan gesekan keras selama pertandingan berlangsung.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[28px] p-8 floating-shadow border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 font-black text-lg">
              03
            </div>
            <h3 className="font-condensed font-black uppercase text-2xl tracking-tight text-slate-900 mb-2">
              Langsung ke Admin
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tidak ada chatbot yang membingungkan. Setiap pesanan diverifikasi oleh admin manusia yang siap membantu cek stok real-time.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-[32px] bg-white p-8 sm:p-12 text-center floating-shadow border border-slate-100 mb-12">
        <h3 className="font-condensed font-black uppercase text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
          Siap Meningkatkan Performa Tim Anda?
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          Jelajahi koleksi terbaru kit tim nasional, klub favorit, atau perlengkapan pelindung atletik sekarang.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#F15A24] hover:bg-[#FF6F3B] text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-[#F15A24]/30"
        >
          <span>Jelajahi Katalog Sekarang</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </main>
  )
}
