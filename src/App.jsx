import { useState } from 'react'
import OpeningScreen from './components/OpeningScreen'
import MainLayout from './components/MainLayout'

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)

  if (!authenticated) {
    return <OpeningScreen onEnter={() => setAuthenticated(true)} />
  }

  return <MainLayout />
}
