export default function AppHeader({ onMenuOpen, title }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-mu-black/90 backdrop-blur-sm sticky top-0 z-30">
      {/* Hamburger */}
      <button
        onClick={onMenuOpen}
        className="btn-haptic flex flex-col gap-[5px] w-9 h-9 items-center justify-center rounded-lg bg-white/8 hover:bg-white/12 transition-colors"
        aria-label="Open menu"
      >
        <span className="block w-5 h-[2px] bg-white rounded-full" />
        <span className="block w-5 h-[2px] bg-white rounded-full" />
        <span className="block w-3.5 h-[2px] bg-white rounded-full self-start ml-0.5" />
      </button>

      {/* Center branding */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-mu-red flex items-center justify-center border border-mu-gold/50">
          <span className="text-white font-black text-[9px]">MU</span>
        </div>
        <span className="text-white font-bold text-sm tracking-wide">{title || 'Fan Zone'}</span>
        <div className="h-4 w-px bg-white/20" />
        <div className="px-2 py-0.5 rounded bg-betway-green/90">
          <span className="text-white font-black text-[9px] uppercase tracking-wide">betway</span>
        </div>
      </div>

      {/* Notification icon */}
      <button className="relative btn-haptic w-9 h-9 flex items-center justify-center rounded-lg bg-white/8 hover:bg-white/12 transition-colors" aria-label="Notifications">
        <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-mu-red border border-mu-black" />
      </button>
    </header>
  )
}
