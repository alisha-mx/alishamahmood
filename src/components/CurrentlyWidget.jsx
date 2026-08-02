import { useState } from 'react'

// ─── Update these whenever your status changes ───────────────────────────────
const STATUS = 'Editing Croatia Travel Film'
const UPDATED = '2 days ago'
// ─────────────────────────────────────────────────────────────────────────────

export default function CurrentlyWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="fixed bottom-5 right-5 z-40"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <style>{`
        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .status-dot { animation: status-pulse 2.4s ease-in-out infinite; }
      `}</style>

      <div
        style={{
          background: open ? '#FDFCFA' : '#E8E0D5',
          border: open ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.13)',
          boxShadow: open
            ? '0 4px 24px rgba(0,0,0,0.08)'
            : '0 2px 10px rgba(0,0,0,0.1)',
          borderRadius: open ? 16 : 22,
          width: open ? 228 : 126,
          height: open ? 112 : 38,
          overflow: 'hidden',
          position: 'relative',
          cursor: 'default',
          transition: 'width 0.35s cubic-bezier(0.34,1.2,0.64,1), height 0.35s cubic-bezier(0.34,1.2,0.64,1), border-radius 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Collapsed: pill label */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            opacity: open ? 0 : 1,
            transition: 'opacity 0.15s ease',
            pointerEvents: 'none',
            paddingInline: 14,
          }}
        >
          <span
            className="status-dot"
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#5cb97e',
              flexShrink: 0,
            }}
          />
          <span style={{
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: 10.5,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.7)',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            Currently
          </span>
        </div>

        {/* Expanded content */}
        <div
          style={{
            opacity: open ? 1 : 0,
            transition: open ? 'opacity 0.2s ease 0.12s' : 'opacity 0.1s ease',
            padding: '15px 16px',
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          {/* Label */}
          <p style={{
            margin: 0,
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: 9.5,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.32)',
          }}>
            Currently...
          </p>

          {/* Status row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 9 }}>
            <span
              className="status-dot"
              style={{
                display: 'inline-block',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#5cb97e',
                marginTop: 4,
                flexShrink: 0,
              }}
            />
            <p style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 500,
              color: 'rgba(0,0,0,0.82)',
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
            }}>
              {STATUS}
            </p>
          </div>

          {/* Timestamp */}
          <p style={{
            margin: '9px 0 0',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            fontSize: 9.5,
            color: 'rgba(0,0,0,0.28)',
            letterSpacing: '0.04em',
          }}>
            Updated {UPDATED}
          </p>
        </div>
      </div>
    </div>
  )
}
