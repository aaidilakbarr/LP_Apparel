export function GearVisual({ itemType, atlasPosition }) {
  if (itemType === 'helmet') {
    return (
      <div className="w-full h-full flex items-center justify-center p-2 relative group">
        <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md transition-transform duration-300 group-hover:scale-105">
          <defs>
            <radialGradient id="helmetGloss" cx="45%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="45%" stopColor="#F59E0B" />
              <stop offset="85%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </radialGradient>
            <linearGradient id="grillSilver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="stripeWhite" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          <path
            d="M26 78 C20 42, 40 18, 76 18 C96 18, 106 36, 104 58 C102 76, 88 84, 72 86 C60 88, 48 88, 38 87 Z"
            fill="url(#helmetGloss)"
          />
          <path
            d="M48 20 C64 19, 82 23, 94 36 C86 28, 70 24, 52 24 Z"
            fill="url(#stripeWhite)"
            opacity="0.9"
          />
          <path
            d="M38 32 C48 24, 68 24, 82 36"
            stroke="#FEF3C7"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <circle cx="68" cy="68" r="5.5" fill="#0F172A" />
          <circle cx="68" cy="68" r="7.5" stroke="#D97706" strokeWidth="2" fill="none" />
          <path
            d="M72 56 L102 56 C104 56, 105 58, 104 60 L98 86 C97 88, 95 89, 93 88 L74 84"
            stroke="url(#grillSilver)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M80 66 L101 66" stroke="url(#grillSilver)" strokeWidth="3" strokeLinecap="round" />
          <path d="M86 56 L84 85" stroke="url(#grillSilver)" strokeWidth="3" strokeLinecap="round" />
          <path d="M94 56 L91 86" stroke="url(#grillSilver)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    )
  }

  if (itemType === 'armor') {
    return (
      <div className="w-full h-full flex items-center justify-center p-2 relative group">
        <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md transition-transform duration-300 group-hover:scale-105">
          <defs>
            <linearGradient id="padBlack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="60%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="capBlack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <path d="M42 32 L78 32 L84 90 L60 98 L36 90 Z" fill="url(#padBlack)" rx="4" />
          <path d="M54 58 L66 70 M66 58 L54 70" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 42 C12 28, 34 24, 46 32 L40 60 C26 58, 16 52, 14 42 Z" fill="url(#capBlack)" stroke="#64748B" strokeWidth="1.5" />
          <path d="M106 42 C108 28, 86 24, 74 32 L80 60 C94 58, 104 52, 106 42 Z" fill="url(#capBlack)" stroke="#64748B" strokeWidth="1.5" />
          <ellipse cx="28" cy="56" rx="12" ry="7" fill="#1E293B" stroke="#475569" strokeWidth="1" />
          <ellipse cx="92" cy="56" rx="12" ry="7" fill="#1E293B" stroke="#475569" strokeWidth="1" />
          <circle cx="60" cy="40" r="3" fill="#CBD5E1" />
          <rect x="44" y="48" width="32" height="4" rx="2" fill="#F15A24" />
          <rect x="42" y="78" width="36" height="3" rx="1.5" fill="#64748B" />
        </svg>
      </div>
    )
  }

  if (itemType === 'gloves') {
    return (
      <div className="w-full h-full flex items-center justify-center p-2 relative group">
        <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md transition-transform duration-300 group-hover:scale-105">
          <defs>
            <linearGradient id="gloveBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="glovePalm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
          <g transform="translate(14, 20)">
            <rect x="10" y="4" width="8" height="32" rx="4" fill="url(#gloveBack)" stroke="#94A3B8" strokeWidth="1.2" />
            <rect x="19" y="0" width="8.5" height="36" rx="4" fill="url(#gloveBack)" stroke="#94A3B8" strokeWidth="1.2" />
            <rect x="28.5" y="4" width="8" height="32" rx="4" fill="url(#gloveBack)" stroke="#94A3B8" strokeWidth="1.2" />
            <rect x="37.5" y="10" width="7.5" height="25" rx="3.5" fill="url(#gloveBack)" stroke="#94A3B8" strokeWidth="1.2" />
            <path d="M7 26 C4 20, 0 24, 0 32 C0 38, 7 42, 10 44 Z" fill="url(#gloveBack)" stroke="#94A3B8" strokeWidth="1.2" />
            <path d="M7 30 L45 30 L43 62 L9 62 Z" fill="url(#gloveBack)" stroke="#94A3B8" strokeWidth="1.2" />
            <path d="M14 36 L38 36 M15 44 L37 44 M16 52 L36 52" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="7" y="60" width="38" height="12" rx="3" fill="#F15A24" />
            <rect x="12" y="64" width="28" height="4" rx="2" fill="#FFFFFF" opacity="0.6" />
          </g>
          <g transform="translate(62, 20)">
            <rect x="7" y="10" width="7.5" height="25" rx="3.5" fill="url(#glovePalm)" stroke="#94A3B8" strokeWidth="1.2" />
            <rect x="15.5" y="4" width="8" height="32" rx="4" fill="url(#glovePalm)" stroke="#94A3B8" strokeWidth="1.2" />
            <rect x="24.5" y="0" width="8.5" height="36" rx="4" fill="url(#glovePalm)" stroke="#94A3B8" strokeWidth="1.2" />
            <rect x="34" y="4" width="8" height="32" rx="4" fill="url(#glovePalm)" stroke="#94A3B8" strokeWidth="1.2" />
            <path d="M43 26 C46 20, 50 24, 50 32 C50 38, 43 42, 40 44 Z" fill="url(#glovePalm)" stroke="#94A3B8" strokeWidth="1.2" />
            <path d="M5 30 L43 30 L41 62 L7 62 Z" fill="url(#glovePalm)" stroke="#94A3B8" strokeWidth="1.2" />
            <circle cx="20" cy="40" r="2.5" fill="#F15A24" />
            <circle cx="28" cy="40" r="2.5" fill="#F15A24" />
            <circle cx="24" cy="48" r="2.5" fill="#F15A24" />
            <rect x="5" y="60" width="38" height="12" rx="3" fill="#F15A24" />
            <rect x="10" y="64" width="28" height="4" rx="2" fill="#FFFFFF" opacity="0.6" />
          </g>
        </svg>
      </div>
    )
  }

  if (itemType === 'ball') {
    return (
      <div className="w-full h-full flex items-center justify-center p-2 relative group">
        <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md transition-transform duration-300 group-hover:scale-105">
          <defs>
            <radialGradient id="leatherGlow" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#92400E" />
              <stop offset="90%" stopColor="#451A03" />
              <stop offset="100%" stopColor="#290E02" />
            </radialGradient>
          </defs>
          <g transform="rotate(-36 60 60)">
            <ellipse cx="60" cy="60" rx="52" ry="32" fill="url(#leatherGlow)" />
            <ellipse cx="58" cy="54" rx="44" ry="24" fill="none" stroke="#FBBF24" strokeWidth="1" opacity="0.25" />
            <path d="M26 38 C32 52, 32 68, 26 82" stroke="#FFFFFF" strokeWidth="4.5" fill="none" opacity="0.95" />
            <path d="M94 38 C88 52, 88 68, 94 82" stroke="#FFFFFF" strokeWidth="4.5" fill="none" opacity="0.95" />
            <line x1="44" y1="50" x2="76" y2="50" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="48" y1="45" x2="48" y2="55" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="54" y1="44" x2="54" y2="56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="60" y1="44" x2="60" y2="56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="66" y1="44" x2="66" y2="56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="72" y1="45" x2="72" y2="55" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    )
  }

  // Fallback to Jersey Atlas
  return (
    <div
      className="w-full h-full rounded-2xl atlas-thumb transition-transform duration-300 group-hover:scale-105"
      style={{ backgroundPosition: atlasPosition || '0% 0%' }}
    />
  )
}
