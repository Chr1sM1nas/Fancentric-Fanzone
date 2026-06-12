import AppIcon from './AppIcons'

export default function AppHeader({ onMenuOpen, onLogoClick, title, userProfile, appUserSync }) {
  const welcomeLabel = userProfile?.displayName || userProfile?.email || 'Fan Zone Member'
  const accountInitial = (welcomeLabel || 'F').slice(0, 1).toUpperCase()

  return (
    <header className="flex items-center gap-2 px-3 py-3 border-b border-white/10 bg-mu-black/90 backdrop-blur-sm sticky top-0 z-30">
      {/* Account trigger */}
      <button
        onClick={onMenuOpen}
        className="btn-haptic relative w-9 h-9 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/12 transition-colors flex-shrink-0 border border-white/10"
        aria-label="Open account panel"
      >
        <span className="w-7 h-7 rounded-full gradient-mu flex items-center justify-center text-[10px] font-black text-white">
          {accountInitial}
        </span>
        {appUserSync?.status === 'connected' && (
          <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-betway-green border border-mu-black" />
        )}
      </button>

      {/* Center branding */}
      <button
        onClick={onLogoClick}
        className="btn-haptic flex min-w-0 flex-1 items-center gap-2 rounded-full px-2 py-1.5 hover:bg-white/5 transition-colors"
        aria-label="Go back to home"
      >
        <div className="w-7 h-7 rounded-full bg-mu-red flex items-center justify-center border border-mu-gold/50 flex-shrink-0">
          <span className="text-white font-black text-[9px]">MU</span>
        </div>
        <div className="text-left min-w-0">
          <span className="block text-white font-bold text-sm tracking-wide leading-none truncate">{title || 'Fan Zone'}</span>
          <span className="hidden sm:block text-white/35 text-[9px] uppercase tracking-[0.2em] mt-0.5">Tap logo to go home</span>
          <span className="block sm:hidden text-white/35 text-[9px] mt-0.5 truncate">Home shortcut</span>
        </div>
        <div className="h-4 w-px bg-white/20 flex-shrink-0" />
        <div className="px-2 py-0.5 rounded bg-betway-green/90 flex-shrink-0">
          <span className="text-white font-black text-[9px] uppercase tracking-wide">betway</span>
        </div>
      </button>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notification icon */}
        <button className="relative btn-haptic w-9 h-9 flex items-center justify-center rounded-lg bg-white/8 hover:bg-white/12 transition-colors" aria-label="Notifications">
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-white/10 to-white/0 border border-white/10 flex items-center justify-center">
            <AppIcon name="bell" className="w-4 h-4 text-white/90" />
          </span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-mu-red border border-mu-black" />
        </button>
      </div>
    </header>
  )
}
