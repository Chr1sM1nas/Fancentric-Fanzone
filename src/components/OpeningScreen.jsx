import { useState } from 'react'
import AppIcon from './AppIcons'

export default function OpeningScreen({ onProviderLogin, oauthEnabled }) {
  const [authView, setAuthView] = useState('choices')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleProviderAuth = (provider) => {
    onProviderLogin({ provider })
  }

  const submitEmailAuth = async (mode) => {
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      return
    }

    setIsSubmitting(true)
    try {
      await onProviderLogin({ provider: mode === 'register' ? 'email-register' : 'email-login', email: trimmedEmail, mode })
    } finally {
      setIsSubmitting(false)
    }
  }

  const submitRegistration = async () => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !agreeToTerms) {
      return
    }

    setIsSubmitting(true)
    try {
      await onProviderLogin({
        provider: 'email-register',
        email: trimmedEmail,
        mode: 'register',
        profile: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          displayName: `${firstName.trim()} ${lastName.trim()}`.trim(),
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter' && email.trim()) {
      submitEmailAuth('login')
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-mu-black flex flex-col">
      {/* Cinematic background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(10,10,10,0.75) 40%, rgba(10,10,10,0.92) 80%, #0A0A0A 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&w=800&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          filter: 'blur(2px) brightness(0.45)',
        }}
      />

      {/* Header: Club crest + Betway logo */}
      <header className="relative z-10 flex items-center justify-center gap-4 pt-10 pb-6 px-6">
        {/* Man Utd Crest SVG placeholder */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-mu-red border-2 border-mu-gold shadow-lg">
          <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
            <circle cx="20" cy="20" r="18" fill="#DA291C" stroke="#FBE122" strokeWidth="2" />
            <text x="20" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="900" fontFamily="serif">
              MU
            </text>
          </svg>
        </div>

        {/* Divider */}
        <div className="h-10 w-px bg-white/30" />

        {/* Betway logo */}
        <div className="flex items-center justify-center px-4 py-1.5 rounded-lg bg-betway-green/90">
          <span className="text-white font-black text-lg tracking-wide uppercase">betway</span>
        </div>
      </header>

      {/* Official banner */}
      <div className="relative z-10 text-center mb-2">
        <span className="inline-block text-[10px] tracking-[0.25em] text-white/50 uppercase font-semibold border border-white/20 px-4 py-1 rounded-full">
          The Official Digital Fan Zone
        </span>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 pt-6 pb-4">
        {/* Headline */}
        <h1 className="text-4xl font-black text-white text-center leading-tight mb-3 text-glow-red">
          Step Inside the<br />
          <span className="text-mu-red">United</span> Fan Zone.
        </h1>
        <p className="text-sm text-white/70 text-center leading-relaxed max-w-sm mb-8">
          Powered by Betway. Predict the match, unlock exclusive Carrington insights,
          and win ultimate Old Trafford experiences.
        </p>

        {/* Value propositions */}
        <div className="w-full max-w-sm space-y-3 mb-8">
          {[
            {
              icon: 'homePredictor',
              title: 'The Betway Predictor',
              desc: 'Call the score. Top the global United leaderboard to win VIP hospitality tickets.',
              accent: 'from-mu-red/25 to-mu-red-dark/10',
            },
            {
              icon: 'homeInsights',
              title: 'The Carrington Cut',
              desc: 'Unlock exclusive pre-match tactical data and enhanced Betway match stats.',
              accent: 'from-betway-green/18 to-betway-green/6',
            },
            {
              icon: 'homeRewind',
              title: 'Matchday Rewind',
              desc: 'Watch personalised, AI-curated video highlights of your favourite United players.',
              accent: 'from-indigo-500/18 to-blue-500/8',
            },
            {
              icon: 'homeRewards',
              title: 'Red Devil Rewards',
              desc: 'Earn digital collectibles to unlock signed merch and exclusive Betway odds boosts.',
              accent: 'from-amber-500/18 to-orange-500/8',
            },
          ].map(({ icon, title, desc, accent }) => (
            <div key={title} className="flex items-start gap-3 glass-dark rounded-2xl p-3.5 border border-white/10">
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${accent} border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_10px_25px_rgba(0,0,0,0.2)]`}>
                <div className="w-8 h-8 rounded-xl bg-black/20 border border-white/10 flex items-center justify-center">
                  <AppIcon name={icon} className="w-4.5 h-4.5 text-white" strokeWidth={1.9} />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">{title}</p>
                <p className="text-white/55 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Auth card */}
        <div className="w-full max-w-sm mb-6">
          <div className="glass-dark rounded-2xl p-4 border border-white/15">
            {authView === 'choices' && (
              <>
                <div className="text-center mb-4">
                  <p className="text-white font-semibold text-sm">Sign in or create your account</p>
                  <p className="text-white/55 text-[11px] mt-1 leading-relaxed">
                    Use ZITADEL to keep your predictions, rewards, and matchday history synced across devices.
                  </p>
                </div>

                {/* CTA: Google */}
                <button
                  onClick={() => handleProviderAuth('google')}
                  className="btn-haptic w-full flex items-center justify-center gap-3 bg-white text-black font-semibold rounded-xl py-3.5 mb-2 shadow-lg active:scale-95 transition-transform border border-black/10"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* CTA: Apple */}
                <button
                  onClick={() => handleProviderAuth('apple')}
                  className="btn-haptic w-full flex items-center justify-center gap-3 bg-black text-white font-semibold rounded-xl py-3.5 mb-3 border border-white/20 active:scale-95 transition-transform"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
                  </svg>
                  <span>Continue with Apple</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAuthView('login')}
                    className="btn-haptic w-full py-3 rounded-xl bg-white/5 text-white font-semibold text-sm border border-white/15"
                  >
                    Log in with email
                  </button>
                  <button
                    onClick={() => setAuthView('register')}
                    className="btn-haptic w-full py-3 rounded-xl gradient-mu text-white font-semibold text-sm"
                  >
                    Register with email
                  </button>
                </div>

                <p className="text-[10px] text-white/45 text-center mt-3 leading-relaxed">
                  By continuing, you agree to Betway and Manchester United terms. Access is limited to users aged{' '}
                  <span className="text-amber-400 font-semibold">18+</span>.
                </p>
              </>
            )}

            {authView === 'login' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white font-semibold text-sm">Log in with email</p>
                    <p className="text-white/55 text-[11px] mt-1 leading-relaxed">Enter your email and we’ll take you to your ZITADEL sign-in.</p>
                  </div>
                  <button
                    onClick={() => setAuthView('choices')}
                    className="btn-haptic text-white/60 text-[10px] font-bold px-2.5 py-1.5 rounded-full border border-white/10"
                  >
                    Back
                  </button>
                </div>

                <div className="relative mb-3">
                  <svg className="w-4 h-4 text-white/45 absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16v10H4z" />
                    <path d="M4 8l8 6 8-6" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onKeyDown={handleEmailKeyDown}
                    className="w-full rounded-xl bg-white/5 border border-white/20 pl-10 pr-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-betway-green/60 focus:border-betway-green/60"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => submitEmailAuth('login')}
                    disabled={isSubmitting || !email.trim()}
                    className="btn-haptic flex-1 w-full flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-xl py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform border border-black/10"
                  >
                    <span>Continue</span>
                  </button>
                  <button
                    onClick={() => setAuthView('register')}
                    className="btn-haptic flex-1 w-full flex items-center justify-center gap-2 bg-transparent text-white font-semibold rounded-xl py-3 text-sm active:scale-95 transition-transform border border-white/20"
                  >
                    Need an account?
                  </button>
                </div>
              </>
            )}

            {authView === 'register' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white font-semibold text-sm">Create your account</p>
                    <p className="text-white/55 text-[11px] mt-1 leading-relaxed">Set up your ZITADEL account with your email and basic profile details.</p>
                  </div>
                  <button
                    onClick={() => setAuthView('choices')}
                    className="btn-haptic text-white/60 text-[10px] font-bold px-2.5 py-1.5 rounded-full border border-white/10"
                  >
                    Back
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="First name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/20 px-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-betway-green/60 focus:border-betway-green/60"
                  />
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/20 px-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-betway-green/60 focus:border-betway-green/60"
                  />
                </div>

                <div className="relative mb-2">
                  <svg className="w-4 h-4 text-white/45 absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16v10H4z" />
                    <path d="M4 8l8 6 8-6" />
                  </svg>
                  <input
                    type="email"
                    name="registerEmail"
                    autoComplete="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/20 pl-10 pr-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-betway-green/60 focus:border-betway-green/60"
                  />
                </div>

                <label className="flex items-start gap-2 mb-3 text-[11px] text-white/60 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(event) => setAgreeToTerms(event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-betway-green focus:ring-betway-green/60"
                  />
                  <span>
                    I confirm I am 18+ and agree to the Betway and Manchester United terms.
                  </span>
                </label>

                <button
                  onClick={submitRegistration}
                  disabled={isSubmitting || !email.trim() || !agreeToTerms}
                  className="btn-haptic w-full flex items-center justify-center gap-2 gradient-betway text-white font-semibold rounded-xl py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-transform"
                >
                  Create account
                </button>

                <button
                  onClick={() => setAuthView('login')}
                  className="btn-haptic w-full flex items-center justify-center gap-2 bg-white/5 text-white font-semibold rounded-xl py-3 text-sm mt-2 border border-white/15 active:scale-95 transition-transform"
                >
                  I already have an account
                </button>
              </>
            )}
          </div>

          <p className="text-[11px] text-white/50 text-center mt-4 leading-relaxed">
            {authView === 'choices' ? (
              <>Already have an account? <button onClick={() => setAuthView('login')} className="text-betway-green font-semibold">Log in</button></>
            ) : authView === 'login' ? (
              <>Need to register? <button onClick={() => setAuthView('register')} className="text-betway-green font-semibold">Create an account</button></>
            ) : (
              <>Need to log in? <button onClick={() => setAuthView('login')} className="text-betway-green font-semibold">Go to login</button></>
            )}
          </p>

          {/* Compliance helper */}
          <button
            onClick={() => submitEmailAuth('login')}
            className="btn-haptic w-full flex items-center justify-center gap-2 bg-transparent text-white/60 font-semibold rounded-xl py-2.5 mt-2 border border-white/10 active:scale-95 transition-transform"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>{oauthEnabled ? 'Secure OAuth enabled' : 'Demo mode (OAuth not configured)'}</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 pb-8 text-center">
        <p className="text-white font-bold text-sm mb-2">
          Please Gamble Responsibly.{' '}
          <span className="text-betway-green">BeGambleAware.org</span>
        </p>
        <div className="flex items-center justify-center gap-4 text-[10px] text-white/40 mb-3">
          <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-white/70 transition-colors">Betway T&Cs</a>
          <span>·</span>
          <a href="#" className="hover:text-white/70 transition-colors">Man Utd T&Cs</a>
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-amber-400 text-amber-400 font-black text-xs">
            18+
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-white/50 text-[10px] font-semibold">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            GDPR Compliant
          </span>
        </div>
      </footer>
    </div>
  )
}
