export function Toast({ notice }) {
  return (
    <div className={`toast-notice ${notice ? 'show' : ''}`} role="status" aria-live="polite">
      <div className="bg-slate-900 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-2xl border border-white/10 flex items-center gap-2">
        <span>{notice}</span>
      </div>
    </div>
  )
}
