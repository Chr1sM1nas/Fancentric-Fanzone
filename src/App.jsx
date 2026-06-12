import { useEffect, useMemo, useState } from 'react'
import OpeningScreen from './components/OpeningScreen'
import MainLayout from './components/MainLayout'
import { bootstrapAppUser } from './lib/appUserBootstrap'
import {
  completeSignIn,
  hasAuthCallbackParams,
  isZitadelEnabled,
  restoreSession,
  signOut,
  startSignIn,
} from './lib/zitadelAuth'

export default function App() {
  const oauthEnabled = useMemo(() => isZitadelEnabled(), [])
  const [authenticated, setAuthenticated] = useState(false)
  const [authProfile, setAuthProfile] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [appUserSync, setAppUserSync] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationSource, setConfirmationSource] = useState('login')

  const resetAuthState = () => {
    setAuthenticated(false)
    setAuthProfile(null)
    setAppUserSync(null)
    setShowConfirmation(false)
    setConfirmationSource('login')
  }

  useEffect(() => {
    let isMounted = true

    const initAuth = async () => {
      if (!oauthEnabled) {
        if (isMounted) {
          setAuthReady(true)
        }
        return
      }

      try {
        if (hasAuthCallbackParams()) {
          const pendingRegistration = window.sessionStorage.getItem('pendingRegistrationProfile')
          const profile = await completeSignIn()
          if (isMounted) {
            setAuthenticated(Boolean(profile))
            setAuthProfile(profile)
            setConfirmationSource(pendingRegistration ? 'register' : 'login')
            setShowConfirmation(Boolean(profile))
          }
          window.history.replaceState({}, document.title, window.location.pathname)
        } else {
          const profile = await restoreSession()
          if (isMounted) {
            setAuthenticated(Boolean(profile))
            setAuthProfile(profile)
          }
        }
      } catch (error) {
        console.error('ZITADEL auth initialization failed:', error)
      } finally {
        if (isMounted) {
          setAuthReady(true)
        }
      }
    }

    initAuth()

    return () => {
      isMounted = false
    }
  }, [oauthEnabled])

  useEffect(() => {
    let isMounted = true

    const syncAppUser = async () => {
      if (!authenticated || !authProfile?.subject) {
        return
      }

      try {
        const result = await bootstrapAppUser(authProfile)
        if (isMounted) {
          setAppUserSync(result)
        }
      } catch (error) {
        console.error('Failed to bootstrap app user:', error)
        if (isMounted) {
          setAppUserSync({ status: 'error', message: error.message, appUser: null })
        }
      }
    }

    syncAppUser()

    return () => {
      isMounted = false
    }
  }, [authenticated, authProfile])

  const handleProviderLogin = async ({ provider, email, mode, profile }) => {
    if (!oauthEnabled) {
      setAuthenticated(true)
      setAuthProfile(
        profile || {
          email: email || '',
          displayName: profile?.displayName || email || 'Fan Zone Member',
          firstName: profile?.firstName || '',
          lastName: profile?.lastName || '',
          isAuthenticated: true,
        },
      )
      setConfirmationSource(mode === 'register' ? 'register' : 'login')
      setShowConfirmation(true)
      return
    }

    try {
      await startSignIn({ provider, email, mode })
    } catch (error) {
      console.error('Failed to start ZITADEL sign-in:', error)
    }
  }

  const handleLogout = async () => {
    try {
      if (oauthEnabled) {
        await signOut()
      }
    } catch (error) {
      console.error('Failed to sign out:', error)
    } finally {
      resetAuthState()
    }
  }

  if (!authReady) {
    return (
      <div className="min-h-screen bg-mu-black text-white flex items-center justify-center px-6">
        <div className="glass-dark rounded-2xl px-6 py-4 text-center">
          <p className="text-sm text-white/75">Initializing secure sign-in...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return <OpeningScreen onProviderLogin={handleProviderLogin} oauthEnabled={oauthEnabled} />
  }

  return (
    <>
      <MainLayout userProfile={authProfile} appUserSync={appUserSync} onLogout={handleLogout} />

      {showConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-card rounded-3xl p-5 border border-white/15 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-full gradient-mu border-2 border-mu-gold/40 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-[0.22em] text-betway-green font-bold text-center mb-2">
              Account confirmed
            </p>
            <h3 className="text-white font-black text-xl text-center leading-tight mb-2">
              {confirmationSource === 'register' ? 'Welcome to the Fan Zone' : 'Welcome back to the Fan Zone'}
            </h3>
            <p className="text-white/60 text-sm text-center leading-relaxed">
              {authProfile?.displayName || authProfile?.email || 'Fan Zone Member'}, your account is confirmed and you’re ready to continue.
            </p>

            {appUserSync?.status && (
              <p className="text-[11px] text-center mt-3 text-white/45 leading-relaxed">
                {appUserSync.status === 'connected' && 'Your app profile has been linked to your secure ZITADEL identity.'}
                {appUserSync.status === 'pending-backend' && 'Your secure identity is active. App database sync is ready once the backend endpoint is connected.'}
                {appUserSync.status === 'error' && 'Your identity is active, but app database sync still needs attention.'}
              </p>
            )}

            <button
              onClick={() => setShowConfirmation(false)}
              className="btn-haptic w-full mt-5 py-3 rounded-xl gradient-betway text-white font-bold text-sm"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  )
}
