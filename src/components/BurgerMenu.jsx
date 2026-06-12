import { useState, useEffect } from 'react'

const menuItems = [
  {
    group: 'primary',
    items: [
      {
        icon: '🏟️',
        label: 'MATCHDAY HUB',
        sub: 'Predictions, lineups, and live match center.',
        screen: 'predictor',
      },
      {
        icon: '🏆',
        label: 'THE 3-TIER PREDICTOR',
        sub: 'Jump back into your Bronze, Silver, or Gold picks.',
        screen: 'predictor',
        badge: true,
      },
      {
        icon: '🧠',
        label: 'THE CARRINGTON CUT',
        sub: 'Performance analytics and exclusive tactical stats.',
        screen: 'carrington',
      },
      {
        icon: '🎬',
        label: 'MATCHDAY REWIND',
        sub: 'Your personalised, AI-powered highlights.',
        screen: 'rewind',
      },
    ],
  },
  {
    group: 'rewards',
    items: [
      {
        icon: '🎁',
        label: 'FAN ZONE PRIZES',
        sub: 'Claim signed merchandise and hospitality entry.',
        screen: 'rewards',
        tag: '2 Unlocked',
      },
      {
        icon: '📊',
        label: 'LEADERBOARDS',
        sub: 'View global ranks and your custom Friend Leagues.',
        screen: 'rewards',
      },
      {
        icon: '🎟️',
        label: 'MY PREDICTION HISTORY',
        sub: 'Track your past slips, wins, and accuracy rate.',
        screen: 'rewards',
      },
    ],
  },
]

export default function BurgerMenu({ isOpen, onClose, onNavigate, currentScreen }) {
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

  const handleNavClick = (screen) => {
    // Haptic feedback (where supported)
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10)
    }
    onNavigate(screen)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[340px] z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'linear-gradient(180deg, #0F0F0F 0%, #0A0A0A 100%)' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* User Header */}
        <div className="px-5 pt-8 pb-5 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-mu-red to-mu-red-dark flex items-center justify-center border-2 border-mu-gold/60">
                  <span className="text-white font-black text-base">RD</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-betway-green rounded-full border-2 border-mu-black" />
              </div>
              <div>
                <p className="text-white/50 text-[10px] tracking-wide">WELCOME BACK, RED DEVIL</p>
                <p className="text-white font-bold text-sm">@RedDevil1878</p>
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
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full gradient-bronze">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot" />
              <span className="text-white font-bold text-xs tracking-wide">🥉 BRONZE LEVEL</span>
            </div>
          </div>

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

        {/* Scrollable nav area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide py-3">
          {menuItems.map(({ group, items }, gi) => (
            <div key={group}>
              {gi > 0 && <div className="mx-5 my-3 h-px bg-white/10" />}
              <nav className="px-3">
                {items.map(({ icon, label, sub, screen, badge, tag }) => (
                  <button
                    key={label}
                    onClick={() => handleNavClick(screen)}
                    className="btn-haptic w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left hover:bg-white/5 active:bg-white/10 transition-colors relative"
                  >
                    <span className="text-xl w-7 text-center flex-shrink-0">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold text-[13px] tracking-wide">{label}</span>
                        {tag && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full gradient-betway text-white">
                            {tag}
                          </span>
                        )}
                      </div>
                      <p className="text-white/40 text-[11px] mt-0.5 leading-tight">{sub}</p>
                    </div>
                    {badge && (
                      <span className="w-2 h-2 rounded-full bg-mu-red animate-pulse-dot flex-shrink-0" />
                    )}
                    <svg className="w-3.5 h-3.5 text-white/25 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Utility footer – sticky */}
        <div className="border-t border-white/10 px-3 pt-3 pb-6">
          {/* Responsible Gambling */}
          <div className="px-3 py-2.5 mb-1 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">🛑</span>
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
            <span className="text-lg">⚙️</span>
            <div className="flex-1 text-left">
              <span className="text-white font-semibold text-[13px]">Account Settings</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-betway-green text-[10px]">✅ VERIFIED (18+)</span>
              </div>
            </div>
          </button>

          <button className="btn-haptic w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
            <span className="text-lg">❓</span>
            <span className="text-white font-semibold text-[13px]">Help &amp; Live Chat Support</span>
          </button>

          <button className="btn-haptic w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors mt-1">
            <span className="text-lg">🚪</span>
            <span className="text-white/35 font-medium text-[13px]">Log Out</span>
          </button>
        </div>
      </div>
    </>
  )
}
