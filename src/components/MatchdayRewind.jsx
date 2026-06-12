import ScreenTopBar from './ScreenTopBar'

const pillars = [
  {
    icon: '🎬',
    title: 'Match Highlights',
    desc: 'Official United highlights from every fixture across all competitions. Available shortly after full time.',
    tag: 'Latest',
    color: 'from-mu-red/30 to-mu-red-dark/10',
  },
  {
    icon: '⚽',
    title: 'Player Reels',
    desc: 'Follow your favourite United players and get a personalised cut — their goals, assists, and key moments.',
    tag: 'For You',
    color: 'from-blue-900/30 to-blue-800/10',
  },
  {
    icon: '📼',
    title: 'Archive Classics',
    desc: 'Iconic United moments from the official club archive. Relive the goals, the nights, the seasons.',
    tag: 'All-Time',
    color: 'from-amber-900/30 to-amber-800/10',
  },
  {
    icon: '🎙️',
    title: 'Reaction & Press',
    desc: 'Post-match manager and player interviews. Official and unfiltered.',
    tag: 'Post-Match',
    color: 'from-purple-900/30 to-purple-800/10',
  },
  {
    icon: '🏆',
    title: 'Season in Focus',
    desc: 'Competition-by-competition video review. League, FA Cup, Carabao Cup, Europe — all in one place.',
    tag: 'Season',
    color: 'from-indigo-900/30 to-indigo-800/10',
  },
  {
    icon: '🤝',
    title: 'Betway x United Originals',
    desc: 'Co-produced video features exclusive to the Fan Zone. Player challenges, tactical breakdowns, and matchday stories.',
    tag: 'Exclusive',
    color: 'from-betway-green/20 to-betway-green-dark/5',
  },
  {
    icon: '📱',
    title: 'Fan Cam',
    desc: 'The best fan-submitted matchday videos from Old Trafford and around the world. Submit yours. Get featured.',
    tag: 'Community',
    color: 'from-rose-900/30 to-rose-800/10',
  },
]

const recentHighlights = [
  {
    match: 'Man Utd 3 – 1 Chelsea',
    comp: 'Premier League',
    duration: '4:22',
    thumb: '🔴',
    views: '1.2M',
  },
  {
    match: 'Man Utd 2 – 0 Villarreal',
    comp: 'UEFA Champions League',
    duration: '3:58',
    thumb: '🔴',
    views: '890K',
  },
  {
    match: 'Man Utd 1 – 1 Tottenham',
    comp: 'Premier League',
    duration: '3:10',
    thumb: '🔴',
    views: '650K',
  },
]

const playerReels = [
  { name: 'Bruno Fernandes', role: 'Midfielder', reels: 8, icon: '🎯' },
  { name: 'Marcus Rashford', role: 'Forward', reels: 6, icon: '⚡' },
  { name: 'Alejandro Garnacho', role: 'Forward', reels: 5, icon: '🔥' },
  { name: 'Rasmus Højlund', role: 'Striker', reels: 7, icon: '💥' },
]

export default function MatchdayRewind({ onGoHome }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-8">
      <ScreenTopBar
        onGoHome={onGoHome}
        eyebrow="Your United. Your Highlights."
        title={<>Every Match.<br />Every Moment. Made for You.</>}
        description="Official United video content and AI-curated highlights — personalised around the players and moments you care about most."
      />

      {/* Recent Highlights */}
      <div className="px-4 pt-4">
        <p className="text-[9px] text-white/35 uppercase tracking-widest mb-3">Latest Highlights</p>
        <div className="space-y-3 mb-6">
          {recentHighlights.map((h) => (
            <div key={h.match} className="glass-card rounded-2xl overflow-hidden flex items-center">
              {/* Video thumbnail */}
              <div className="relative w-28 h-20 flex-shrink-0 bg-gradient-to-br from-mu-red/40 to-mu-black flex items-center justify-center">
                <span className="text-4xl opacity-60">{h.thumb}</span>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-mu-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-1.5 text-[9px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded">
                  {h.duration}
                </span>
              </div>
              <div className="flex-1 px-3 py-2">
                <p className="text-[8px] text-betway-green uppercase font-bold tracking-wide mb-0.5">{h.comp}</p>
                <p className="text-white font-bold text-xs leading-snug mb-1">{h.match}</p>
                <p className="text-white/35 text-[9px]">{h.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Reels – personalised */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] text-white/35 uppercase tracking-widest">Your Player Reels</p>
          <button className="text-betway-green text-[10px] font-bold">Edit Follows</button>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide gap-3 -mx-4 px-4 pb-2">
          {playerReels.map((p) => (
            <div key={p.name} className="flex-shrink-0 glass-card rounded-2xl p-3 w-36 text-center">
              <div className="w-14 h-14 rounded-full gradient-mu border-2 border-mu-gold/40 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">{p.icon}</span>
              </div>
              <p className="text-white font-bold text-xs mb-0.5">{p.name}</p>
              <p className="text-white/40 text-[9px] mb-2">{p.role}</p>
              <span className="text-[9px] font-bold text-betway-green bg-betway-green/10 px-2 py-0.5 rounded-full">
                {p.reels} Reels
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content pillars */}
      <div className="px-4 mb-6">
        <p className="text-[9px] text-white/35 uppercase tracking-widest mb-3">Explore Channels</p>
        <div className="flex overflow-x-auto scrollbar-hide gap-3 -mx-4 px-4 pb-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className={`flex-shrink-0 w-44 rounded-2xl bg-gradient-to-br ${p.color} border border-white/10 p-4 cursor-pointer hover:border-white/25 transition-all`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/50">
                  {p.tag}
                </span>
              </div>
              <p className="text-white font-bold text-sm mb-1 leading-snug">{p.title}</p>
              <p className="text-white/45 text-[9px] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fan Cam – UGC */}
      <div className="mx-4 glass-card rounded-2xl p-4 mb-4 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">📱</span>
          <p className="text-white font-bold text-sm">Fan Cam</p>
        </div>
        <p className="text-white/50 text-xs mb-3 leading-relaxed">
          Submit your matchday video for the community vote. Get featured. Build your rep in the United community.
        </p>
        <button className="btn-haptic w-full py-3 rounded-xl gradient-mu text-white font-bold text-sm">
          📤 Submit Your Fan Cam
        </button>
      </div>

      {/* Positioning line */}
      <div className="text-center px-4 mt-2">
        <p className="text-[10px] text-white/25 italic">Official content. Personalised for you. Only on Betway.</p>
      </div>
    </div>
  )
}
