# Fancentric Fan Zone — Manchester United × Betway

A mobile-first fan engagement web app for Manchester United FC, powered by Betway. Built as a white-label template that can be embedded inside any football club's mobile app or website via an **iframe** or a dedicated **CTA link**.

---

## Quick Start

```bash
npm install
npm run dev        # development server → http://localhost:3000
npm run build      # production build  → dist/
npm run preview    # preview prod build
```

## ZITADEL OAuth Setup

This project supports ZITADEL OAuth (Authorization Code + PKCE) for Google, Apple, and email-based sign-in.

1. Copy [.env.example](.env.example) to `.env.local`.
2. Fill in:
  - `VITE_ZITADEL_AUTHORITY`
  - `VITE_ZITADEL_CLIENT_ID`
  - `VITE_ZITADEL_REDIRECT_URI`
3. In ZITADEL, set your app redirect URI to match your local/dev URL.
4. (Optional) add `VITE_ZITADEL_GOOGLE_IDP_HINT` and `VITE_ZITADEL_APPLE_IDP_HINT` if you want provider-specific routing.

If ZITADEL variables are not configured, the app runs in demo mode and bypasses OAuth for local UI testing.

## App DB Reconciliation

The frontend is now set up to reconcile a ZITADEL identity with your app database using the ZITADEL `sub` claim as the immutable external key.

Backend contract:

1. Create the SQL tables in [db/schema.sql](db/schema.sql).
2. Expose `POST /auth/bootstrap` on your app API.
3. Accept this payload from the frontend:
  - `provider`
  - `providerSubject`
  - `email`
  - `emailVerified`
  - `displayName`
  - `firstName`
  - `lastName`
4. Upsert the internal app user by `(provider, providerSubject)`.

Important rule: use ZITADEL `sub` as the reconciliation key, not email.

---

## Embedding (iframe / CTA)

### 1 — Standalone iframe

Drop the following snippet anywhere inside a partner club's app or website:

```html
<iframe
  src="https://your-deployed-domain.com"
  width="100%"
  height="100%"
  style="border:none; max-width:480px; min-height:812px;"
  allow="vibrate"
  title="United Fan Zone — Powered by Betway"
></iframe>
```

### 2 — CTA deep-link button

```html
<a
  href="https://your-deployed-domain.com"
  target="_blank"
  rel="noopener noreferrer"
  style="
    display: inline-block;
    background: #DA291C;
    color: #fff;
    font-weight: 700;
    padding: 14px 28px;
    border-radius: 999px;
    text-decoration: none;
    font-family: sans-serif;
  "
>
  Enter the Fan Zone
</a>
```

### 3 — React component embed

```jsx
import FanZone from 'fancentric-fanzone'

export default function PartnerApp() {
  return (
    <FanZone
      club="manchester-united"
      sponsor="betway"
      primaryColor="#DA291C"
      sponsorColor="#00A651"
    />
  )
}
```

---

## App Sections

| Screen | Route / Tab | Description |
|---|---|---|
| **Opening Screen** | `/` (pre-auth) | Landing page with age-gate (Apple / Google SSO) |
| **The Betway Predictor** | `predictor` tab | 3-tier prediction system (Bronze → Silver → Gold) |
| **The Carrington Cut** | `carrington` tab | Official club content & Betway data hub |
| **Matchday Rewind** | `rewind` tab | AI-curated, personalised video highlights |
| **Red Devil Rewards** | `rewards` tab | Weekly quests, collectibles & leaderboards |
| **Burger Menu** | Hamburger (top-left) | Profile, wallet, navigation & responsible gambling |

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--mu-red` | `#DA291C` | Primary Manchester United red |
| `--mu-gold` | `#FBE122` | Accent gold |
| `--betway-green` | `#00A651` | Betway brand green |
| `--mu-black` | `#0A0A0A` | App background |

---

## Tech Stack

- **React 18** + **Vite 5** — fast, modern bundler
- **Tailwind CSS 3** — utility-first styling, fully responsive
- **No external state library** — local `useState` keeps the bundle lean
- Haptic feedback via `navigator.vibrate()` (supported in Android Chrome, Firefox)
- Swipe-to-close burger menu via touch events

---

## White-Label Customisation

Each club instance is a theme layer over the same template. Swap out:

1. `tailwind.config.js` → `mu-red`, `mu-gold` for club colours
2. Club crest SVG in `AppHeader.jsx` and `OpeningScreen.jsx`
3. Sponsor logo (replace Betway wordmark)
4. Copy strings (`"Red Devil"`, `"Old Trafford"`, player names, etc.)

A full partner integration guide for digital agencies (UrbanZoo, Delta3, etc.) is available on request.

---

## Responsible Gambling

This product includes mandatory responsible gambling features:

- **Age gate** on the opening screen (18+ verification via Apple/Google)
- **Responsible Gambling** section pinned to the burger menu footer
- Links to **Betway Safe Play Tools**, **Take a Break**, and **BeGambleAware.org**
- **18+ badge** and **GDPR Compliant shield** displayed on every entry screen

---

*Built by Fancentric. Powered by Betway.*
