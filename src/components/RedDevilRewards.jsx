import ScreenTopBar from './ScreenTopBar'

const quests = [
  {
    icon: '⚽',
    title: 'Make Your First Prediction',
    desc: 'Call the scoreline for the next United fixture.',
    reward: '+1 Collectible',
    status: 'not_started',
    cta: 'Predict Now',
    ctaColor: 'text-betway-green',
  },
  {
    icon: '🎬',
    title: 'Watch a Matchday Rewind',
    desc: 'Watch any official United highlight reel this week.',
    reward: '+1 Collectible',
    status: 'completed',
    cta: null,
  },
  {
    icon: '📸',
    title: 'Submit a Fan Cam',
    desc: 'Upload your matchday video for the community vote.',
    reward: '+2 Collectibles',
    status: 'in_review',
    cta: null,
  },
  {
    icon: '🗳️',
    title: 'Vote in Fan Cam of the Week',
    desc: 'Cast your vote for the best fan-submitted video.',
    reward: '+1 Collectible',
    status: 'urgent',
    cta: 'Vote Now',
    ctaColor: 'text-mu-red',
    timeLeft: '6hrs',
  },
  {
    icon: '🔁',
    title: 'Predict 3 Matches in a Row',
    desc: 'Build a streak. Three consecutive predictions across any competition.',
    reward: '+3 Collectibles + Betway Odds Boost',
    status: 'in_progress',
    cta: 'Keep Going',
    ctaColor: 'text-amber-400',
    progress: '2 of 3 complete',
  },
  {
    icon: '🏆',
    title: 'Top Your Friend League',
    desc: 'Finish the week at the top of any Friend League you\'re in.',
    reward: '+5 Collectibles + Prize Draw Entry',
    status: 'urgent',
    cta: 'View League',
    ctaColor: 'text-mu-red',
    progress: 'Currently 2nd',
  },
]

const statusConfig = {
  not_started: { dot: 'bg-betway-green', label: 'Not started', textColor: 'text-betway-green' },
  completed: { dot: 'bg-betway-green', label: 'Completed', textColor: 'text-betway-green' },
  in_review: { dot: 'bg-amber-400', label: 'In review', textColor: 'text-amber-400' },
  urgent: { dot: 'bg-mu-red', label: 'Closes soon', textColor: 'text-mu-red' },
  in_progress: { dot: 'bg-amber-400', label: 'In progress', textColor: 'text-amber-400' },
}

export default function RedDevilRewards({ onGoHome }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-8">
      <ScreenTopBar
        onGoHome={onGoHome}
        eyebrow="Rewards and progression"
        title={<>Your Rewards.<br />Your Record.</>}
        description="Every prediction, every check-in, every match builds your standing. Keep going."
      />

      {/* Collectible progress */}
      <div className="mx-4 mt-4 glass-card rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white font-bold text-sm">Collectible Progress</p>
            <p className="text-mu-red text-[10px] font-semibold mt-0.5">🔴 3 of 5 collectibles earned this season.</p>
          </div>
          <div className="w-14 h-14 rounded-full gradient-mu border-2 border-mu-gold/40 flex items-center justify-center">
            <span className="text-white font-black text-base">3/5</span>
          </div>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-2">
          <div className="h-full w-[60%] gradient-mu rounded-full" />
        </div>
        <p className="text-white/40 text-[10px]">2 more to unlock your next signed merch drop.</p>
        <div className="flex gap-2 mt-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`flex-1 h-8 rounded-lg flex items-center justify-center border ${
                i <= 3
                  ? 'gradient-mu border-mu-red/50 text-white text-xs'
                  : 'border-white/10 bg-white/5 text-white/20'
              }`}
            >
              {i <= 3 ? '🔴' : '○'}
            </div>
          ))}
        </div>
      </div>

      {/* Quests */}
      <div className="px-4 mb-4">
        <p className="text-white font-black text-base mb-0.5">This Week's Quests</p>
        <p className="text-white/40 text-[10px] mb-3">Complete quests to earn collectibles and climb the leaderboard.</p>

        <div className="space-y-3">
          {quests.map((q) => {
            const cfg = statusConfig[q.status]
            return (
              <div key={q.title} className="glass-card rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{q.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm leading-snug mb-1">{q.title}</p>
                    <p className="text-white/50 text-[11px] leading-relaxed mb-2">{q.desc}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-bold text-betway-green bg-betway-green/10 px-2 py-0.5 rounded-full border border-betway-green/20">
                        Reward: {q.reward}
                      </span>
                      {q.timeLeft && (
                        <span className="text-[9px] font-bold text-amber-400">⏱ Closes in {q.timeLeft}</span>
                      )}
                      {q.progress && (
                        <span className="text-[9px] text-white/40">{q.progress}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/8">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${cfg.dot} ${q.status !== 'completed' ? 'animate-pulse' : ''}`} />
                    <span className={`text-[10px] font-semibold ${cfg.textColor}`}>{cfg.label}</span>
                  </div>
                  {q.cta && (
                    <button className={`btn-haptic text-[11px] font-bold ${q.ctaColor} border border-current/30 px-3 py-1.5 rounded-full hover:bg-current/10 transition-colors`}>
                      {q.cta} →
                    </button>
                  )}
                  {q.status === 'completed' && (
                    <span className="text-betway-green text-sm">✅ Completed</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active Rewards section */}
      <div className="px-4">
        <p className="text-[9px] text-white/35 uppercase tracking-widest mb-3">Active Rewards</p>
        <div className="space-y-3">

          {/* Red Devil Rewards */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏅</span>
              <div>
                <p className="text-white font-bold text-sm">Red Devil Rewards</p>
                <p className="text-white/45 text-[11px]">Stack collectibles to unlock signed merchandise and exclusive Betway odds boosts.</p>
              </div>
            </div>
            <button className="btn-haptic w-full py-2.5 rounded-xl gradient-mu text-white font-bold text-xs mt-1">
              View My Collectibles →
            </button>
          </div>

          {/* Fan Zone Prizes */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-start gap-3 mb-2">
              <span className="text-2xl">🎁</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold text-sm">Fan Zone Prizes</p>
                  <span className="text-[9px] font-bold bg-betway-green/20 text-betway-green px-2 py-0.5 rounded-full">2 Unlocked</span>
                </div>
                <p className="text-white/45 text-[11px] mt-0.5">Claim signed merchandise and hospitality entry.</p>
                <p className="text-betway-green text-[10px] mt-1">🟢 2 prizes ready to claim.</p>
              </div>
            </div>
            <button className="btn-haptic w-full py-2.5 rounded-xl gradient-betway text-white font-bold text-xs">
              Claim Your Prizes →
            </button>
          </div>

          {/* Leaderboards */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-white font-bold text-sm">Leaderboards</p>
                <p className="text-white/45 text-[11px]">View global ranks and your custom Friend Leagues.</p>
              </div>
            </div>
            <div className="flex gap-4 mb-3 px-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">🌍</span>
                <div>
                  <p className="text-[9px] text-white/40">Global Rank</p>
                  <p className="text-white font-bold text-sm">#1,847</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs">👥</span>
                <div>
                  <p className="text-[9px] text-white/40">Friend League</p>
                  <p className="text-white font-bold text-sm">2nd of 12</p>
                </div>
              </div>
            </div>
            <button className="btn-haptic w-full py-2.5 rounded-xl bg-white/8 text-white font-bold text-xs border border-white/10">
              View Leaderboards →
            </button>
          </div>

          {/* Prediction History */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎟️</span>
              <div>
                <p className="text-white font-bold text-sm">My Prediction History</p>
                <p className="text-white/45 text-[11px]">Track your past slips, wins, and accuracy rate.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center">
                <p className="text-white font-black text-xl">14</p>
                <p className="text-white/40 text-[9px]">Predictions</p>
              </div>
              <div className="text-center">
                <p className="text-betway-green font-black text-xl">64%</p>
                <p className="text-white/40 text-[9px]">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-mu-gold font-black text-xl">4</p>
                <p className="text-white/40 text-[9px]">Best Streak</p>
              </div>
            </div>
            <button className="btn-haptic w-full py-2.5 rounded-xl bg-white/8 text-white font-bold text-xs border border-white/10">
              View Full History →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
