const pillars = [
  {
    icon: '📸',
    title: 'Matchday Gallery',
    desc: 'First access to official United photography. Every game, every moment.',
    color: 'from-mu-red/30 to-mu-red-dark/20',
    tag: 'New Photos',
  },
  {
    icon: '🎬',
    title: 'Behind the Scenes',
    desc: 'Training ground and dressing room content produced by United\'s media team.',
    color: 'from-purple-900/40 to-purple-800/20',
    tag: 'Exclusive',
  },
  {
    icon: '🗣️',
    title: 'Player & Manager Reaction',
    desc: 'Official quotes and post-match reaction. Direct from the people that matter.',
    color: 'from-blue-900/40 to-blue-800/20',
    tag: 'Post-Match',
  },
  {
    icon: '📊',
    title: 'Season Stats',
    desc: 'Licensed club data across all competitions — goals, assists, form, and key performance numbers.',
    color: 'from-indigo-900/40 to-indigo-800/20',
    tag: 'Updated',
  },
  {
    icon: '🏆',
    title: 'Competition Tracker',
    desc: 'Where United stand. League, cups, Europe. Updated after every fixture.',
    color: 'from-amber-900/40 to-amber-800/20',
    tag: 'Live',
  },
  {
    icon: '⚡',
    title: 'Betway Data Edge',
    desc: 'Stat-backed bets, enhanced odds, and trend data built around United\'s season.',
    color: 'from-betway-green/20 to-betway-green-dark/10',
    tag: 'Betway',
  },
  {
    icon: '🎯',
    title: 'Player Spotlight',
    desc: 'One United player under the microscope each week. Official stats meet Betway markets.',
    color: 'from-rose-900/40 to-rose-800/20',
    tag: 'This Week',
  },
  {
    icon: '🎟️',
    title: 'Rewards & Experiences',
    desc: 'Signed merch drops and matchday experiences — exclusively for Betway Fan Zone members.',
    color: 'from-mu-red/20 to-betway-green/10',
    tag: 'Members',
  },
]

const featuredStats = [
  { label: 'Goals Scored', value: 52, icon: '⚽', sub: 'All Comps' },
  { label: 'Clean Sheets', value: 14, icon: '🧤', sub: 'Season' },
  { label: 'League Position', value: 3, icon: '📍', sub: 'Premier League' },
  { label: 'Form', value: 'W W D W W', icon: '📈', sub: 'Last 5' },
]

export default function CarringtonCut() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-8">
      {/* Label / Header */}
      <div className="px-4 pt-5 pb-4 border-b border-white/8">
        <p className="text-[9px] text-betway-green uppercase tracking-widest font-bold mb-1">
          United Intelligence. Betway Exclusive.
        </p>
        <h2 className="text-white font-black text-2xl leading-tight mb-1">
          Inside United.<br />All Season Long.
        </h2>
        <p className="text-white/50 text-xs leading-relaxed">
          Official club content, licensed stats, and Betway match data — one destination, built for United fans.
        </p>
      </div>

      {/* Quick stats row */}
      <div className="flex overflow-x-auto scrollbar-hide gap-3 px-4 py-4">
        {featuredStats.map((s) => (
          <div key={s.label} className="flex-shrink-0 glass-card rounded-xl px-4 py-3 min-w-[110px] text-center">
            <span className="text-2xl block mb-1">{s.icon}</span>
            <p className="text-white font-black text-xl leading-none">{s.value}</p>
            <p className="text-white/70 text-[10px] font-semibold mt-0.5">{s.label}</p>
            <p className="text-white/35 text-[9px]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Content pillars */}
      <div className="px-4">
        <p className="text-[9px] text-white/35 uppercase tracking-widest mb-3">Content Pillars</p>
        <div className="flex overflow-x-auto scrollbar-hide gap-3 -mx-4 px-4 pb-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className={`flex-shrink-0 w-48 rounded-2xl bg-gradient-to-br ${p.color} border border-white/10 p-4 cursor-pointer hover:border-white/25 transition-all`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                  {p.tag}
                </span>
              </div>
              <p className="text-white font-bold text-sm mb-1 leading-snug">{p.title}</p>
              <p className="text-white/50 text-[10px] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured article cards */}
      <div className="px-4 mt-4">
        <p className="text-[9px] text-white/35 uppercase tracking-widest mb-3">Featured Today</p>
        <div className="space-y-3">
          {[
            {
              category: 'Betway Data Edge',
              headline: 'Why United\'s High Press is Generating 3.1 xG Per Game',
              time: '2h ago',
              read: '4 min',
              locked: false,
            },
            {
              category: 'Player Spotlight',
              headline: 'Bruno Fernandes: Key Pass Master — 97th Percentile in the Premier League',
              time: '5h ago',
              read: '6 min',
              locked: false,
            },
            {
              category: 'Competition Tracker',
              headline: 'Champions League Path: How United Reach the Quarter-Finals',
              time: '1d ago',
              read: '3 min',
              locked: true,
            },
          ].map((a) => (
            <div key={a.headline} className="glass-card rounded-2xl overflow-hidden flex">
              {/* Thumbnail placeholder */}
              <div
                className="w-20 flex-shrink-0 bg-gradient-to-br from-mu-red/30 to-mu-black flex items-center justify-center"
              >
                <span className="text-3xl">📰</span>
              </div>
              <div className="flex-1 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-bold text-betway-green uppercase tracking-wide">{a.category}</span>
                  {a.locked && <span className="text-[8px] text-white/30">🔒 Members</span>}
                </div>
                <p className="text-white font-semibold text-xs leading-snug mb-1">{a.headline}</p>
                <p className="text-white/30 text-[9px]">{a.time} · {a.read} read</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positioning line */}
      <div className="text-center px-4 mt-6">
        <p className="text-[10px] text-white/30 italic">Updated daily. Official content. Betway exclusive.</p>
      </div>
    </div>
  )
}
