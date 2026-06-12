const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL

function trimTrailingSlash(value) {
  return value?.endsWith('/') ? value.slice(0, -1) : value
}

export function buildAppUserBootstrapPayload(authProfile) {
  if (!authProfile?.subject) {
    return null
  }

  return {
    provider: authProfile.provider || 'zitadel',
    providerSubject: authProfile.subject,
    email: authProfile.email || null,
    emailVerified: Boolean(authProfile.emailVerified),
    displayName: authProfile.displayName || null,
    firstName: authProfile.firstName || null,
    lastName: authProfile.lastName || null,
  }
}

export async function bootstrapAppUser(authProfile) {
  const payload = buildAppUserBootstrapPayload(authProfile)

  if (!payload) {
    return {
      status: 'skipped',
      reason: 'missing-subject',
      appUser: null,
    }
  }

  if (!apiBaseUrl) {
    return {
      status: 'pending-backend',
      created: false,
      appUser: {
        id: null,
        zitadelSubject: payload.providerSubject,
        primaryEmail: payload.email,
        displayName: payload.displayName,
      },
    }
  }

  const response = await fetch(`${trimTrailingSlash(apiBaseUrl)}/auth/bootstrap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`App user bootstrap failed: ${response.status} ${message}`.trim())
  }

  const result = await response.json()
  return {
    status: 'connected',
    ...result,
  }
}