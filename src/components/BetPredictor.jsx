import { useState } from 'react'

// ──────────────────────────────────────────────
// Bronze Tier – Around the Grounds
// ──────────────────────────────────────────────
const bronzeMatches = [
  { home: 'Man City', away: 'Liverpool', time: '14h', homeOdds: 2.1, drawOdds: 3.4, awayOdds: 4.2 },
  { home: 'Arsenal', away: 'Chelsea', time: '2d 6h', homeOdds: 1.85, drawOdds: 3.6, awayOdds: 3.9 },
  { home: 'Spurs', away: 'Newcastle', time: '3d', homeOdds: 2.3, drawOdds: 3.2, awayOdds: 3.1 },
]

function BronzeCard({ match }) {
  const [selected, setSelected] = useState(null)
  const [stake, setStake] = useState(10)

  const odds = [
    { label: 'Home Win', value: match.homeOdds, key: 'home' },
    { label: 'Draw', value: match.drawOdds, key: 'draw' },
    { label: 'Away Win', value: match.awayOdds, key: 'away' },
  ]

  const selectedOdds = odds.find((o) => o.key === selected)?.value
  const potentialReturn = selectedOdds ? (stake * selectedOdds).toFixed(2) : null

  return (
    <div className="flex-shrink-0 w-72 glass-card rounded-2xl overflow-hidden mr-4">
      <div className="px-4 pt-4 pb-3 border-b border-white/8">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] text-white/40 uppercase tracking-widest">Premier League</span>
          <span className="text-[10px] font-bold text-betway-green">⏱ KO in {match.time}</span>
        </div>
        <p className="text-white font-bold text-sm">
          {match.home} <span className="text-white/40 font-normal text-xs">vs</span> {match.away}
        </p>
      </div>

      <div className="px-4 py-3">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {odds.map((o) => (
            <button
              key={o.key}
              onClick={() => setSelected(selected === o.key ? null : o.key)}
              className={`btn-haptic flex flex-col items-center py-2 rounded-xl border transition-all ${
                selected === o.key
                  ? 'bg-betway-green border-betway-green text-white'
                  : 'border-white/15 bg-white/5 hover:border-white/30 text-white'
              }`}
            >
              <span className="text-[9px] text-white/50 mb-0.5">{o.label}</span>
              <span className="font-black text-sm">{o.value}</span>
            </button>
          ))}
        </div>

        {/* Winnings calculator tray */}
        {selected && (
          <div className="animate-tray-down overflow-hidden">
            <div className="bg-black/40 rounded-xl p-3 border border-white/10">
              <p className="text-[9px] text-white/40 uppercase tracking-widest mb-2">Calculate Your Betway Upside</p>
              <div className="flex gap-2 mb-2">
                {[10, 25, 50].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStake(s)}
                    className={`btn-haptic flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      stake === s ? 'gradient-betway text-white' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    £{s}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/50 text-xs">Potential Return</span>
                <span className="text-betway-green font-black text-sm">£{potentialReturn}</span>
              </div>
              <button className="btn-haptic w-full py-2 rounded-lg gradient-betway text-white font-bold text-xs">
                ⚡ Convert to Bet via Betway
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Silver Tier – The Matchday Six
// ──────────────────────────────────────────────
const silverQuestions = [
  { id: 'score', label: 'Correct Score', icon: '⚽' },
  { id: 'scorer', label: 'First Goalscorer', icon: '🎯' },
  { id: 'corners', label: 'Total United Corners', icon: '🚩' },
  { id: 'htft', label: 'Half-Time / Full-Time Result', icon: '🔄' },
  { id: 'booking', label: 'First Booking', icon: '🟨' },
  { id: 'motm', label: 'Man of the Match', icon: '🏅' },
]

const correctScores = ['1-0', '2-0', '2-1', '3-0', '3-1', '3-2', '0-0', '1-1', '0-1', '0-2']
const goalscorers = [
  { name: 'Bruno', odds: 3.5 },
  { name: 'Rashford', odds: 4.0 },
  { name: 'Garnacho', odds: 5.0 },
  { name: 'Højlund', odds: 3.8 },
]
const motmPlayers = [
  { name: 'Bruno', pct: 38 },
  { name: 'Rashford', pct: 22 },
  { name: 'Garnacho', pct: 19 },
  { name: 'Dalot', pct: 11 },
  { name: 'Other', pct: 10 },
]

function SilverCard({ q }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="btn-haptic w-full flex items-center gap-3 px-4 py-4 text-left"
      >
        <span className="text-xl">{q.icon}</span>
        <span className="flex-1 text-white font-semibold text-sm">{q.label}</span>
        {selected && (
          <span className="text-betway-green text-[10px] font-bold bg-betway-green/15 px-2 py-0.5 rounded-full">
            ✓ Picked
          </span>
        )}
        <svg
          className={`w-4 h-4 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-white/8 pt-3 animate-tray-down">
          {q.id === 'score' && (
            <div className="grid grid-cols-5 gap-2">
              {correctScores.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelected(s)}
                  className={`btn-haptic py-2 rounded-lg text-xs font-bold transition-all ${
                    selected === s ? 'gradient-mu text-white' : 'bg-white/8 text-white/70 hover:bg-white/15'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          {q.id === 'scorer' && (
            <div className="grid grid-cols-4 gap-2">
              {goalscorers.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelected(p.name)}
                  className={`btn-haptic flex flex-col items-center py-2.5 rounded-xl border transition-all ${
                    selected === p.name ? 'border-betway-green bg-betway-green/15' : 'border-white/15 bg-white/5'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-mu-red/40 flex items-center justify-center mb-1 border border-mu-red/40">
                    <span className="text-white text-[10px] font-bold">{p.name[0]}</span>
                  </div>
                  <span className="text-white text-[10px] font-bold">{p.name}</span>
                  <span className="text-betway-green text-[9px]">{p.odds}</span>
                </button>
              ))}
            </div>
          )}
          {q.id === 'corners' && (
            <div className="grid grid-cols-2 gap-3">
              {[{ label: 'Under 5.5', odds: 1.9 }, { label: 'Over 5.5', odds: 1.85 }].map((o) => (
                <button
                  key={o.label}
                  onClick={() => setSelected(o.label)}
                  className={`btn-haptic py-3 rounded-xl border text-sm font-bold transition-all ${
                    selected === o.label ? 'border-betway-green bg-betway-green/15 text-white' : 'border-white/15 bg-white/5 text-white/70'
                  }`}
                >
                  {o.label} <span className="text-betway-green font-black">{o.odds}</span>
                </button>
              ))}
            </div>
          )}
          {q.id === 'htft' && (
            <div className="grid grid-cols-3 gap-2">
              {['Man Utd / Man Utd', 'Draw / Man Utd', 'Any Other'].map((o) => (
                <button
                  key={o}
                  onClick={() => setSelected(o)}
                  className={`btn-haptic py-2.5 rounded-xl border text-[10px] font-bold text-center transition-all ${
                    selected === o ? 'border-betway-green bg-betway-green/15 text-white' : 'border-white/15 bg-white/5 text-white/60'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
          {q.id === 'booking' && (
            <div className="grid grid-cols-2 gap-3">
              {['United Player', 'Opponent Player'].map((o) => (
                <button
                  key={o}
                  onClick={() => setSelected(o)}
                  className={`btn-haptic py-3 rounded-xl border text-sm font-bold transition-all ${
                    selected === o ? 'border-mu-red bg-mu-red/15 text-white' : 'border-white/15 bg-white/5 text-white/70'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
          {q.id === 'motm' && (
            <div className="space-y-2">
              {motmPlayers.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelected(p.name)}
                  className={`btn-haptic w-full flex items-center gap-3 px-3 py-2 rounded-xl border transition-all ${
                    selected === p.name ? 'border-mu-gold bg-mu-gold/10' : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-mu-red/40 flex items-center justify-center border border-mu-red/30 flex-shrink-0">
                    <span className="text-white text-[9px] font-bold">{p.name[0]}</span>
                  </div>
                  <span className="text-white font-semibold text-sm flex-1 text-left">{p.name}</span>
                  <div className="flex-1 max-w-[80px]">
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full gradient-mu rounded-full"
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-white/50 text-[10px] w-8 text-right">{p.pct}%</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────
// Gold Tier – Red Devil Fan Specials
// ──────────────────────────────────────────────
const noveltyCards = [
  {
    question: 'Will the Manager wear a suit or the club tracksuit on the touchline?',
    options: [{ label: 'Suit', odds: 1.8 }, { label: 'Tracksuit', odds: 1.95 }],
  },
  {
    question: 'Total camera cuts to Sir Alex in the stands during the 90 mins.',
    options: [{ label: 'Under 2.5', odds: 2.1 }, { label: 'Over 2.5', odds: 1.65 }],
  },
  {
    question: '🎤 UGC: Will Bruno complete a successful no-look pass in the final third?',
    options: [{ label: 'Yes', odds: 3.5 }, { label: 'No', odds: 1.25 }],
  },
]

const formationPlayers = [
  { name: 'Onana', pos: 'GK' },
  { name: 'Dalot', pos: 'RB' },
  { name: 'Lindelöf', pos: 'CB' },
  { name: 'Martínez', pos: 'CB' },
  { name: 'Shaw', pos: 'LB' },
  { name: 'Casemiro', pos: 'DM' },
  { name: 'Mainoo', pos: 'CM' },
  { name: 'Bruno', pos: 'AM' },
  { name: 'Rashy', pos: 'LW' },
  { name: 'Garnacho', pos: 'RW' },
  { name: 'Højlund', pos: 'ST' },
]

function GoldTier() {
  const [tab, setTab] = useState('lineup')
  const [selections, setSelections] = useState({})

  const toggleNovelty = (qi, key) => {
    setSelections((prev) => ({ ...prev, [qi]: prev[qi] === key ? null : key }))
  }

  return (
    <div>
      {/* Nested tab control */}
      <div className="flex gap-2 mb-4 p-1 rounded-xl bg-white/8">
        {[
          { key: 'lineup', label: 'Tactical Lineup' },
          { key: 'novelty', label: 'Culture Club' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`btn-haptic flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
              tab === t.key ? 'gradient-gold text-black' : 'text-white/50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'lineup' && (
        <div>
          <p className="text-white/50 text-[11px] text-center mb-3">Drag players into your predicted starting XI</p>
          {/* Formation grid – simplified interactive pitch */}
          <div
            className="relative rounded-2xl overflow-hidden mb-3"
            style={{ background: 'linear-gradient(180deg, #1a4a1a 0%, #2d6b2d 50%, #1a4a1a 100%)', minHeight: 280 }}
          >
            {/* Pitch lines */}
            <div className="absolute inset-0 flex items-center justify-center opacity-15">
              <div className="w-24 h-24 rounded-full border-2 border-white" />
            </div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/15" />

            <div className="relative z-10 p-4">
              {/* 4-2-3-1 layout rows */}
              {[
                formationPlayers.slice(10, 11),   // ST
                formationPlayers.slice(7, 10),    // LW AM RW
                formationPlayers.slice(5, 7),     // DM CM
                formationPlayers.slice(1, 5),     // Back 4
                formationPlayers.slice(0, 1),     // GK
              ].map((row, ri) => (
                <div key={ri} className="flex justify-around mb-2.5">
                  {row.map((p) => (
                    <div key={p.name} className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full gradient-mu border-2 border-mu-gold/50 flex items-center justify-center shadow-lg">
                        <span className="text-white text-[9px] font-black">{p.name.slice(0, 3).toUpperCase()}</span>
                      </div>
                      <span className="text-white/80 text-[8px] mt-0.5 font-medium">{p.pos}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Betway special notification */}
          <div className="glass-card rounded-xl p-3 border border-mu-gold/30">
            <p className="text-mu-gold text-[10px] font-bold uppercase tracking-wide mb-1">⚡ Betway Special</p>
            <p className="text-white/80 text-xs mb-2">Academy Product to Start &amp; Score — Odds: <span className="text-betway-green font-black">14.00</span></p>
            <p className="text-white/50 text-[10px]">Potential Return on £10: <span className="text-betway-green font-bold">£140.00</span></p>
          </div>
        </div>
      )}

      {tab === 'novelty' && (
        <div className="space-y-3">
          {noveltyCards.map((card, qi) => (
            <div key={qi} className="glass-card rounded-2xl p-4">
              <p className="text-white font-semibold text-sm mb-3 leading-snug">{card.question}</p>
              <div className="grid grid-cols-2 gap-2">
                {card.options.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => toggleNovelty(qi, o.label)}
                    className={`btn-haptic flex flex-col items-center py-3 rounded-xl border transition-all ${
                      selections[qi] === o.label
                        ? 'border-betway-green bg-betway-green/15 text-white'
                        : 'border-white/15 bg-white/5 text-white/70'
                    }`}
                  >
                    <span className="font-bold text-sm">{o.label}</span>
                    <span className="text-betway-green font-black text-lg">{o.odds}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────
// Main Predictor screen
// ──────────────────────────────────────────────
const tiers = ['bronze', 'silver', 'gold']
const tierLabels = {
  bronze: { label: 'Bronze: Active', locked: false, color: 'gradient-bronze' },
  silver: { label: 'Silver: Locked', locked: true, color: 'gradient-silver' },
  gold: { label: 'Gold: Locked', locked: true, color: 'gradient-gold' },
}

export default function BetPredictor() {
  const [activeTier, setActiveTier] = useState('bronze')
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showPrizes, setShowPrizes] = useState(false)
  const [stake, setStake] = useState(10)
  const silverSelections = 4

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
      {/* Sub-header branding + global actions */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-mu-red flex items-center justify-center">
              <span className="text-white text-[8px] font-black">MU</span>
            </div>
            <span className="text-white/60 text-[10px] font-semibold tracking-wide">Fan Zone Powered by</span>
            <span className="text-betway-green font-black text-[10px] uppercase">Betway</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLeaderboard(true)}
              className="btn-haptic flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-betway-green/60 text-betway-green text-[9px] font-bold border-glow-green"
            >
              🏆 Leaderboard
            </button>
            <button
              onClick={() => setShowPrizes(true)}
              className="btn-haptic flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-mu-red/60 text-mu-red text-[9px] font-bold border-glow-red"
            >
              🎁 Prizes
            </button>
          </div>
        </div>

        {/* Tier progress bar */}
        <div className="flex items-center gap-0 rounded-xl overflow-hidden border border-white/10 mb-5">
          {tiers.map((t, i) => (
            <button
              key={t}
              onClick={() => !tierLabels[t].locked && setActiveTier(t)}
              className={`btn-haptic flex-1 py-2.5 text-[10px] font-bold text-center transition-all relative ${
                activeTier === t
                  ? `${tierLabels[t].color} text-white`
                  : tierLabels[t].locked
                  ? 'bg-white/5 text-white/25 cursor-not-allowed'
                  : 'bg-white/8 text-white/60'
              } ${i > 0 ? 'border-l border-white/10' : ''}`}
            >
              {tierLabels[t].locked ? '🔒 ' : ''}{tierLabels[t].label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        {/* BRONZE TIER */}
        {activeTier === 'bronze' && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full gradient-bronze" />
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Bronze Tier</p>
                <p className="text-white font-black text-base">Around the Grounds</p>
              </div>
            </div>
            <div className="flex overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
              {bronzeMatches.map((m, i) => (
                <BronzeCard key={i} match={m} />
              ))}
            </div>
          </div>
        )}

        {/* SILVER TIER */}
        {activeTier === 'silver' && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full gradient-silver" />
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Silver Tier</p>
                <p className="text-white font-black text-base">United vs Chelsea | The Matchday Six</p>
              </div>
            </div>
            <div className="space-y-0">
              {silverQuestions.map((q) => (
                <SilverCard key={q.id} q={q} />
              ))}
            </div>

            {/* Unified Multiplier Slip */}
            <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-mu-black/95 border-t border-white/10 backdrop-blur-sm">
              <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">
                Your United 6-Fold Prediction Combo
              </p>
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                  {[10, 25, 50].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStake(s)}
                      className={`btn-haptic px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        stake === s ? 'gradient-betway text-white' : 'bg-white/10 text-white/50'
                      }`}
                    >
                      £{s}
                    </button>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-white/40">Est. Betway ACCA Return</p>
                  <p className="text-betway-green font-black text-lg">
                    £{(stake * 125).toLocaleString()}.00
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="btn-haptic py-3 rounded-xl gradient-mu text-white font-bold text-xs">
                  🏆 Lock In Free Fan Points
                </button>
                <button className="btn-haptic py-3 rounded-xl gradient-betway text-white font-bold text-xs">
                  ⚡ Place as Betway ACCA
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GOLD TIER */}
        {activeTier === 'gold' && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full gradient-gold" />
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Gold Tier</p>
                <p className="text-white font-black text-base">Carrington Insights &amp; Culture Club</p>
              </div>
            </div>
            <GoldTier />
          </div>
        )}
      </div>

      {/* Leaderboard slide-over */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60" onClick={() => setShowLeaderboard(false)} />
          <div className="w-[80vw] max-w-sm bg-[#0F0F0F] border-l border-white/10 flex flex-col animate-slide-in-left" style={{ direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }} className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <p className="text-white font-black text-base">🏆 Global Leaderboard</p>
                <button onClick={() => setShowLeaderboard(false)} className="text-white/40 hover:text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-3">
                {[
                  { rank: 1, name: 'SirAlex99', pts: 18400, badge: '🥇' },
                  { rank: 2, name: 'RedArmy1878', pts: 17200, badge: '🥈' },
                  { rank: 3, name: 'Fergie Time', pts: 16800, badge: '🥉' },
                  { rank: 1847, name: 'You (@RedDevil1878)', pts: 14250, badge: '👤', highlight: true },
                ].map((u) => (
                  <div
                    key={u.rank}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl ${u.highlight ? 'gradient-mu border border-mu-red/50' : 'glass-card'}`}
                  >
                    <span className="text-xl w-6 text-center">{u.badge}</span>
                    <div className="flex-1">
                      <p className="text-white font-bold text-sm">{u.name}</p>
                      <p className="text-white/50 text-[10px]">{u.pts.toLocaleString()} PTS</p>
                    </div>
                    <span className="text-white/60 text-sm font-black">#{u.rank.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prizes slide-over */}
      {showPrizes && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="flex-1 bg-black/60" onClick={() => setShowPrizes(false)} />
          <div className="bg-[#0F0F0F] border-t border-white/10 rounded-t-2xl animate-slide-in-up max-h-[70vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <p className="text-white font-black text-base">🎁 Fan Zone Prizes</p>
              <button onClick={() => setShowPrizes(false)} className="text-white/40 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4">
              {[
                { name: 'Signed United Shirt', status: 'Unlocked', icon: '👕' },
                { name: 'VIP Hospitality Ticket', status: 'Unlocked', icon: '🎟️' },
                { name: 'Signed Ball', status: 'Locked', icon: '⚽' },
                { name: 'Old Trafford Tour', status: 'Locked', icon: '🏟️' },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`rounded-2xl p-4 flex flex-col items-center text-center border ${
                    p.status === 'Unlocked'
                      ? 'glass-card border-betway-green/30'
                      : 'bg-white/3 border-white/8 opacity-60'
                  }`}
                >
                  <span className="text-3xl mb-2">{p.icon}</span>
                  <p className="text-white font-bold text-xs mb-1">{p.name}</p>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      p.status === 'Unlocked' ? 'bg-betway-green/20 text-betway-green' : 'bg-white/10 text-white/30'
                    }`}
                  >
                    {p.status === 'Unlocked' ? '✓ ' : '🔒 '}{p.status}
                  </span>
                  {p.status === 'Unlocked' && (
                    <button className="mt-2 w-full py-1.5 rounded-lg gradient-betway text-white text-[9px] font-bold">
                      Claim
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
