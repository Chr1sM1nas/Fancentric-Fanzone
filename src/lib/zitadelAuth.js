import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

const zitadelConfig = {
  authority: import.meta.env.VITE_ZITADEL_AUTHORITY,
  client_id: import.meta.env.VITE_ZITADEL_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_ZITADEL_REDIRECT_URI || window.location.origin,
  post_logout_redirect_uri:
    import.meta.env.VITE_ZITADEL_POST_LOGOUT_REDIRECT_URI || window.location.origin,
  response_type: 'code',
  scope: import.meta.env.VITE_ZITADEL_SCOPE || 'openid profile email',
  automaticSilentRenew: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
}

let manager

function isConfigured() {
  return Boolean(zitadelConfig.authority && zitadelConfig.client_id)
}

function getManager() {
  if (!isConfigured()) {
    return null
  }
  if (!manager) {
    manager = new UserManager(zitadelConfig)
  }
  return manager
}

function normalizeProfile(user) {
  const oidcProfile = user?.profile || {}
  const pendingRegistrationProfile = consumePendingRegistrationProfile() || {}
  const displayName =
    oidcProfile.name ||
    [oidcProfile.given_name, oidcProfile.family_name].filter(Boolean).join(' ') ||
    [pendingRegistrationProfile.firstName, pendingRegistrationProfile.lastName].filter(Boolean).join(' ') ||
    oidcProfile.preferred_username ||
    pendingRegistrationProfile.email ||
    oidcProfile.email ||
    'Fan Zone Member'

  return {
    subject: oidcProfile.sub || '',
    provider: 'zitadel',
    email: oidcProfile.email || pendingRegistrationProfile.email || '',
    emailVerified: Boolean(oidcProfile.email_verified),
    firstName: oidcProfile.given_name || pendingRegistrationProfile.firstName || '',
    lastName: oidcProfile.family_name || pendingRegistrationProfile.lastName || '',
    displayName,
    isAuthenticated: Boolean(user && !user.expired),
  }
}

export function isZitadelEnabled() {
  return isConfigured()
}

export function hasAuthCallbackParams() {
  const params = new URLSearchParams(window.location.search)
  return params.has('code') && params.has('state')
}

export async function restoreSession() {
  const userManager = getManager()
  if (!userManager) {
    return null
  }

  const user = await userManager.getUser()
  return user && !user.expired ? normalizeProfile(user) : null
}

export async function completeSignIn() {
  const userManager = getManager()
  if (!userManager) {
    return null
  }

  const user = await userManager.signinRedirectCallback()
  return user && !user.expired ? normalizeProfile(user) : null
}

export async function startSignIn({ provider, email, mode } = {}) {
  const userManager = getManager()
  if (!userManager) {
    return false
  }

  const extraQueryParams = {}

  if (mode === 'register' && typeof window !== 'undefined') {
    const profile = {
      email: email || '',
      provider,
    }
    window.sessionStorage.setItem('pendingRegistrationProfile', JSON.stringify(profile))
  }

  if ((provider === 'email-login' || provider === 'email-register' || provider === 'email') && email) {
    extraQueryParams.login_hint = email
  }

  if (provider === 'email-register' || mode === 'register') {
    extraQueryParams.prompt = 'create'
  }

  if (provider === 'email-login' || mode === 'login') {
    extraQueryParams.prompt = 'login'
  }

  if (provider === 'google' && import.meta.env.VITE_ZITADEL_GOOGLE_IDP_HINT) {
    extraQueryParams.idp_hint = import.meta.env.VITE_ZITADEL_GOOGLE_IDP_HINT
  }

  if (provider === 'apple' && import.meta.env.VITE_ZITADEL_APPLE_IDP_HINT) {
    extraQueryParams.idp_hint = import.meta.env.VITE_ZITADEL_APPLE_IDP_HINT
  }

  await userManager.signinRedirect({ extraQueryParams })
  return true
}

export async function signOut() {
  const userManager = getManager()
  if (!userManager) {
    return false
  }

  await userManager.removeUser()
  return true
}

export function consumePendingRegistrationProfile() {
  if (typeof window === 'undefined') {
    return null
  }

  const rawProfile = window.sessionStorage.getItem('pendingRegistrationProfile')
  if (!rawProfile) {
    return null
  }

  window.sessionStorage.removeItem('pendingRegistrationProfile')

  try {
    return JSON.parse(rawProfile)
  } catch {
    return null
  }
}
