import AppIcon from './AppIcons'

const tabs = [
  { key: 'predictor', icon: 'predictor', label: 'Predictor' },
  { key: 'carrington', icon: 'carrington', label: 'Carrington' },
  { key: 'rewind', icon: 'rewind', label: 'Rewind' },
  { key: 'rewards', icon: 'rewards', label: 'Rewards' },
]

export default function BottomNav({ activeScreen, onNavigate }) {
  return (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 border-t border-white/10 bg-mu-black/95 backdrop-blur-sm shadow-[0_-12px_30px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-around px-3 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onNavigate(t.key)}
            className={`btn-haptic flex min-w-0 flex-1 flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all ${
              activeScreen === t.key
                ? 'text-white'
                : 'text-white/35 hover:text-white/60'
            }`}
          >
            <span
              className={`w-8 h-8 rounded-lg border flex items-center justify-center leading-none transition-all ${
                activeScreen === t.key
                  ? 'bg-gradient-to-br from-mu-red/25 to-betway-green/20 border-white/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <AppIcon
                name={t.icon}
                className={`w-[18px] h-[18px] ${activeScreen === t.key ? 'text-white' : 'text-white/60'}`}
              />
            </span>
            <span className={`text-[9px] font-semibold tracking-wide ${activeScreen === t.key ? 'text-white' : ''}`}>
              {t.label}
            </span>
            {activeScreen === t.key && (
              <span className="w-1 h-1 rounded-full gradient-mu bg-mu-red mt-0.5" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
