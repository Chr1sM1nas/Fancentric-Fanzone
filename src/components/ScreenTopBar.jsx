export default function ScreenTopBar({ eyebrow, title, description, onGoHome, action }) {
  return (
    <div className="px-4 pt-4 pb-4 border-b border-white/8 bg-mu-black/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <button
          onClick={onGoHome}
          className="btn-haptic inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-[10px] font-bold tracking-wide hover:bg-white/10 transition-colors"
          aria-label="Back to home"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Home
        </button>

        {action && <div>{action}</div>}
      </div>

      <p className="text-[9px] text-betway-green uppercase tracking-widest font-bold mb-1">{eyebrow}</p>
      <h2 className="text-white font-black text-2xl leading-tight mb-1">{title}</h2>
      {description && <p className="text-white/50 text-xs leading-relaxed">{description}</p>}
    </div>
  )
}