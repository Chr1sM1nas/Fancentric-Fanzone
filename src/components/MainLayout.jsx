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

export default function MainLayout({ userProfile, appUserSync, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeScreen, setActiveScreen] = useState('predictor')
  const goHome = () => setActiveScreen('predictor')

  return (
    <div className="relative min-h-screen w-full bg-mu-black flex flex-col overflow-hidden" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <AppHeader
        onMenuOpen={() => setMenuOpen(true)}
        onLogoClick={goHome}
        title={screenTitles[activeScreen]}
        userProfile={userProfile}
        appUserSync={appUserSync}
      />

      <BurgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        userProfile={userProfile}
        appUserSync={appUserSync}
        onLogout={onLogout}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {activeScreen === 'predictor' && <BetPredictor onGoHome={goHome} />}
        {activeScreen === 'carrington' && <CarringtonCut onGoHome={goHome} />}
        {activeScreen === 'rewind' && <MatchdayRewind onGoHome={goHome} />}
        {activeScreen === 'rewards' && <RedDevilRewards onGoHome={goHome} />}
      </main>

      <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
    </div>
  )
}
