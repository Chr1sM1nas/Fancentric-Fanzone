const tabs = [
  { key: 'predictor', icon: '🏆', label: 'Predictor' },
  { key: 'carrington', icon: '🧠', label: 'Carrington' },
  { key: 'rewind', icon: '🎬', label: 'Rewind' },
  { key: 'rewards', icon: '🏅', label: 'Rewards' },
]

export default function BottomNav({ activeScreen, onNavigate }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-mu-black/95 backdrop-blur-sm safe-area-pb">
      <div className="flex items-center justify-around px-2 pt-2 pb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onNavigate(t.key)}
            className={`btn-haptic flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              activeScreen === t.key
                ? 'text-white'
                : 'text-white/35 hover:text-white/60'
            }`}
          >
            <span className="text-xl leading-none">{t.icon}</span>
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
