import { useState } from 'react'

// Replace with your own playlist id — it's the code in your playlist URL:
// https://open.spotify.com/playlist/THIS_PART
const PLAYLIST_ID = '37i9dQZF1DXcBWIGoYBM5M'

function SpotifyIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
    </svg>
  )
}

export default function SpotifyWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Player */}
      <div
        className={[
          'w-[320px] max-w-[calc(100vw-2.5rem)] origin-bottom-right overflow-hidden rounded-2xl shadow-soft transition-all duration-300 ease-spring',
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        ].join(' ')}
      >
        <iframe
          title="Alisha's playlist on Spotify"
          src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          loading="lazy"
          style={{ border: 0, display: 'block' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Hide playlist' : 'Show my playlist'}
        className="flex items-center gap-2 rounded-full bg-on-surface px-5 py-3 text-label-caps uppercase text-white shadow-soft transition-all duration-300 ease-spring hover:-translate-y-0.5"
      >
        <SpotifyIcon className="h-4 w-4" />
        {open ? 'Close' : 'My Playlist'}
      </button>
    </div>
  )
}
