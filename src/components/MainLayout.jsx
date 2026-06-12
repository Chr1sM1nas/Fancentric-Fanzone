import { useState } from 'react'
import AppHeader from './AppHeader'
import BurgerMenu from './BurgerMenu'
import BottomNav from './BottomNav'
import BetPredictor from './BetPredictor'
import CarringtonCut from './CarringtonCut'
import MatchdayRewind from './MatchdayRewind'
import RedDevilRewards from './RedDevilRewards'

const screenTitles = {
  predictor: 'The Predictor',
  carrington: 'Carrington Cut',
  rewind: 'Matchday Rewind',
  rewards: 'Red Devil Rewards',
}

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeScreen, setActiveScreen] = useState('predictor')

  return (
    <div className="relative min-h-screen w-full bg-mu-black flex flex-col overflow-hidden" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <AppHeader onMenuOpen={() => setMenuOpen(true)} title={screenTitles[activeScreen]} />

      <BurgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={setActiveScreen}
        currentScreen={activeScreen}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {activeScreen === 'predictor' && <BetPredictor />}
        {activeScreen === 'carrington' && <CarringtonCut />}
        {activeScreen === 'rewind' && <MatchdayRewind />}
        {activeScreen === 'rewards' && <RedDevilRewards />}
      </main>

      <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
    </div>
  )
}
