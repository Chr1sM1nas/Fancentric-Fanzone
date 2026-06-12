const iconPaths = {
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </>
  ),
  bell: (
    <>
      <path d="M15 17h4l-1.2-1.2a2 2 0 01-.6-1.4v-2.6a5.2 5.2 0 00-10.4 0v2.6a2 2 0 01-.6 1.4L5 17h4" />
      <path d="M10 17a2 2 0 004 0" />
    </>
  ),
  predictor: (
    <>
      <path d="M12 4l2.2 4.5L19 9.2l-3.4 3.3.8 4.7-4.4-2.3-4.4 2.3.8-4.7L5 9.2l4.8-.7L12 4z" />
    </>
  ),
  carrington: (
    <>
      <path d="M9 8.5a3 3 0 116 0" />
      <path d="M8.2 15.5A4.6 4.6 0 0112 13.6a4.6 4.6 0 013.8 1.9" />
      <path d="M4.8 9.5a2.4 2.4 0 014.4-1.3" />
      <path d="M14.8 8.2a2.4 2.4 0 014.4 1.3" />
    </>
  ),
  rewind: (
    <>
      <rect x="5" y="7" width="14" height="10" rx="2" />
      <path d="M10 10l4 2-4 2v-4z" />
    </>
  ),
  rewards: (
    <>
      <path d="M8 10h8v8H8z" />
      <path d="M6 10h12" />
      <path d="M12 10v8" />
      <path d="M9.2 7.8a1.6 1.6 0 012.8 1.2H8.8a1.5 1.5 0 01.4-1.2z" />
      <path d="M14.8 7.8a1.6 1.6 0 00-2.8 1.2h3.2c.2-.4.1-.8-.4-1.2z" />
    </>
  ),
  hub: (
    <>
      <path d="M12 4l8 4.5v7L12 20 4 15.5v-7L12 4z" />
      <path d="M8.5 11.2l2.2 2.2 4.8-4.8" />
    </>
  ),
  leaderboard: (
    <>
      <path d="M7 17V11" />
      <path d="M12 17V8" />
      <path d="M17 17V13" />
      <path d="M5 17h14" />
    </>
  ),
  history: (
    <>
      <path d="M12 6v6l3.5 2" />
      <path d="M4.8 12a7.2 7.2 0 111.2 4" />
      <path d="M4.8 12H2.8" />
    </>
  ),
  settings: (
    <>
      <path d="M12 8.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4z" />
      <path d="M18 12a6.2 6.2 0 00-.1-1l1.7-1.3-1.7-2.9-2 .7a6.5 6.5 0 00-1.7-1l-.3-2.1h-3.4l-.3 2.1c-.6.2-1.1.5-1.7 1l-2-.7-1.7 2.9L6.1 11a6.2 6.2 0 000 2l-1.7 1.3 1.7 2.9 2-.7c.5.4 1.1.7 1.7 1l.3 2.1h3.4l.3-2.1c.6-.2 1.2-.6 1.7-1l2 .7 1.7-2.9L17.9 13c.1-.3.1-.7.1-1z" />
    </>
  ),
  help: (
    <>
      <path d="M9.3 9a2.7 2.7 0 115.2.9c0 1.9-2.5 2.2-2.5 3.9" />
      <path d="M12 17h.01" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  logout: (
    <>
      <path d="M10 6H6v12h4" />
      <path d="M13.5 9.5L17 13l-3.5 3.5" />
      <path d="M9 13h8" />
    </>
  ),
  responsible: (
    <>
      <path d="M12 4l8 4.2V12c0 3.9-2.6 6.6-8 8-5.4-1.4-8-4.1-8-8V8.2L12 4z" />
      <path d="M9.5 9.5l5 5" />
      <path d="M14.5 9.5l-5 5" />
    </>
  ),
  homePredictor: (
    <>
      <path d="M12 4l7 3.8v8.6L12 20l-7-3.6V7.8L12 4z" />
      <path d="M8.8 10.2h6.4" />
      <path d="M8.8 13.2h4.4" />
      <path d="M10.1 8.2l1.9 2 2.1-2" />
    </>
  ),
  homeInsights: (
    <>
      <path d="M7.2 15.8V12l3-3 3.2 3.2 3.4-4.3" />
      <path d="M16.8 8.2l.8 2.6-2.6.8" />
      <path d="M5 5h14v14H5z" />
      <path d="M8 17v-3" />
      <path d="M11 17v-6" />
      <path d="M14 17v-4" />
    </>
  ),
  homeRewind: (
    <>
      <path d="M7 8h10v8H7z" />
      <path d="M10 10.2l4 1.8-4 1.8v-3.6z" />
      <path d="M9 5.8L7 8l2 2.2" />
      <path d="M15 5.8L17 8l-2 2.2" />
    </>
  ),
  homeRewards: (
    <>
      <path d="M8 9.5h8v7H8z" />
      <path d="M9.5 9.5V8.2a2.5 2.5 0 015 0v1.3" />
      <path d="M12 9.5v7" />
      <path d="M8 12.5h8" />
      <path d="M8.5 7.5h2.2a1.2 1.2 0 010 2.4H8.5v-2.4z" />
      <path d="M13.3 7.5h2.2v2.4h-2.2a1.2 1.2 0 010-2.4z" />
    </>
  ),
}

export default function AppIcon({ name, className = '', strokeWidth = 1.8 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name] || iconPaths.menu}
    </svg>
  )
}
