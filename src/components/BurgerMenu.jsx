import { useState, useEffect } from 'react'
import AppIcon from './AppIcons'

const accountActions = [
  {
    icon: 'settings',
    label: 'Account Settings',
    sub: 'Profile, linked identity, and verification status.',
    status: 'Verified 18+',
  },
  {
    icon: 'help',
    label: 'Help & Live Chat',
    sub: 'Get support, FAQs, and responsible play assistance.',
    status: 'Support online',
  },
  {
    icon: 'history',
    label: 'Recent Activity',
    sub: 'Your predictions, rewards progress, and history live in-app.',
    status: 'Bottom tabs updated',
  },
]

export default function BurgerMenu({ isOpen, onClose, userProfile, appUserSync, onLogout }) {
  const [touchStartX, setTouchStartX] = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStartX !== null && e.changedTouches[0].clientX - touchStartX > 60) {
      onClose()
    }
    setTouchStartX(null)
  }

  const handleLogoutClick = async () => {
    onClose()
    await onLogout?.()
  }

  const initialsSource = userProfile?.displayName || userProfile?.email || 'Fan Zone Member'
  const initials = initialsSource
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token[0])
    .join('')
    .toUpperCase()

  const userLabel = userProfile?.displayName || 'Fan Zone Member'
  const userEmail = userProfile?.email || '@supporter'

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`absolute inset-y-0 left-0 w-[84%] max-w-[320px] z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'linear-gradient(180deg, #0F0F0F 0%, #0A0A0A 100%)' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* User Header */}
        <div className="px-4 pt-7 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-mu-red to-mu-red-dark flex items-center justify-center border-2 border-mu-gold/60">
                  <span className="text-white font-black text-base">{initials || 'F'}</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-betway-green rounded-full border-2 border-mu-black" />
              </div>
              <div>
                <p className="text-white/50 text-[10px] tracking-wide uppercase">Welcome back</p>
                <p className="text-white font-bold text-sm leading-tight">{userLabel}</p>
                <p className="text-white/35 text-[10px] mt-0.5 truncate max-w-[150px]">{userEmail}</p>
              </div>
            </div>
            {/* Close X */}
            <button
              onClick={onClose}
              className="btn-haptic w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tier badge */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full gradient-bronze">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
              <span className="text-white font-bold text-xs tracking-wide">🥉 BRONZE LEVEL</span>
            </div>
            {appUserSync?.status === 'connected' && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-betway-green/15 border border-betway-green/30">
                <span className="w-2 h-2 rounded-full bg-betway-green" />
                <span className="text-betway-green font-bold text-[11px] tracking-wide">APP LINKED</span>
              </div>
            )}
          </div>

          <p className="text-white/35 text-[10px] leading-relaxed mb-4">
            Navigation is available below in the bottom tab bar. Use this panel for account, support, and safe-play tools.
          </p>

          {/* Dual balance tracker */}
          <div className="flex items-stretch gap-0">
            <div className="flex-1 pr-3">
              <p className="text-white/40 text-[9px] tracking-widest uppercase mb-1">Fan Points</p>
              <p className="text-white font-black text-base">14,250 <span className="text-xs font-semibold text-white/60">PTS</span></p>
              <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[71%] gradient-mu rounded-full" style={{ '--fill-width': '71%' }} />
              </div>
            </div>
            <div className="w-px bg-white/15 self-stretch mx-0" />
            <div className="flex-1 pl-3">
              <p className="text-[9px] tracking-widest uppercase mb-1" style={{ color: '#00A651' }}>Betway Balance</p>
              <div className="flex items-center gap-1.5">
                <p className="font-black text-base" style={{ color: '#00A651' }}>£24.50</p>
                <button className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-betway-green/20 text-betway-green border border-betway-green/30">
                  + Deposit
                </button>
              </div>
              <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[49%] gradient-betway rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable account area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
          <div className="px-4 pt-3 pb-2">
            <p className="text-[9px] uppercase tracking-[0.24em] text-white/30 font-bold px-1">Account</p>
          </div>
          <div className="px-3 space-y-1">
            {accountActions.map(({ icon, label, sub, status }) => (
              <button
                key={label}
                className="btn-haptic w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left hover:bg-white/5 active:bg-white/10 transition-colors border border-transparent"
              >
                <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 text-white/80 flex items-center justify-center flex-shrink-0">
                  <AppIcon name={icon} className="w-[18px] h-[18px]" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-[13px] tracking-wide">{label}</span>
                  </div>
                  <p className="text-white/40 text-[11px] mt-0.5 leading-tight">{sub}</p>
                </div>
                <span className="text-[9px] text-white/30 font-semibold max-w-[56px] text-right">{status}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Utility footer – sticky */}
        <div className="border-t border-white/10 px-3 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {/* Responsible Gambling */}
          <div className="px-3 py-2.5 mb-1 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <AppIcon name="responsible" className="w-3.5 h-3.5 text-amber-400" />
              </span>
              <span className="text-amber-400 font-bold text-[11px] tracking-wide uppercase">Responsible Gambling</span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 pl-6">
              {['Betway Safe Play', 'Take a Break', 'BeGambleAware.org'].map((link) => (
                <a key={link} href="#" className="text-amber-400/70 text-[10px] hover:text-amber-400 underline">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <button className="btn-haptic w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
            <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <AppIcon name="settings" className="w-[18px] h-[18px] text-white/80" />
            </span>
            <div className="flex-1 text-left">
              <span className="text-white font-semibold text-[13px]">Account Settings</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-betway-green text-[10px]">✅ VERIFIED (18+)</span>
              </div>
            </div>
          </button>

          <button className="btn-haptic w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
            <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <AppIcon name="help" className="w-[18px] h-[18px] text-white/80" />
            </span>
            <span className="text-white font-semibold text-[13px]">Help &amp; Live Chat Support</span>
          </button>

          <button
            onClick={handleLogoutClick}
            className="btn-haptic w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors mt-1"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <AppIcon name="logout" className="w-[18px] h-[18px] text-white/50" />
            </span>
            <span className="text-white/45 font-medium text-[13px]">Log Out</span>
          </button>
        </div>
      </div>
    </>
  )
}
