import { useState, useEffect } from 'react'

// All photos from the website masonry folder + existing masonry images
const photos = [
  '/images/camera-photos/WhatsApp Image 2026-06-30 at 13.19.45.jpeg',
  '/images/camera-photos/WhatsApp Image 2026-06-30 at 13.19.46.jpeg',
  '/images/camera-photos/WhatsApp Image 2026-06-30 at 13.19.49 (1).jpeg',
  '/images/camera-photos/WhatsApp Image 2026-06-30 at 13.19.49.jpeg',
  '/images/camera-photos/WhatsApp Image 2026-06-30 at 13.19.50.jpeg',
  '/images/camera-photos/WhatsApp Image 2026-06-30 at 13.20.27.jpeg',
  '/images/camera-photos/WhatsApp Image 2026-06-30 at 13.20.47 (1).jpeg',
  '/images/camera-photos/WhatsApp Image 2026-06-30 at 13.20.47.jpeg',
  '/images/camera-photos/masonry-1.jpg',
  '/images/camera-photos/masonry-2.jpg',
  '/images/camera-photos/masonry-3.jpg',
  '/images/camera-photos/masonry-4.jpg',
  '/images/camera-photos/masonry-5.jpg',
  '/images/camera-photos/masonry-6.jpg',
  '/images/camera-photos/masonry-7.jpg',
  '/images/camera-photos/masonry-8.jpg',
]

// LCD screen position as % of the camera image — tweak if needed
const LCD = { left: '22%', top: '35%', width: '43%', height: '35%' }

export default function CameraHero() {
  const [idx, setIdx] = useState(0)

  // Plain CSS opacity flicker — avoids Framer Motion/WAAPI, which can freeze
  // in iframe/background contexts and get stuck mid-transition.
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % photos.length), 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative select-none mx-auto w-full max-w-[560px] lg:mx-0 lg:w-[820px] lg:max-w-none lg:shrink-0 transition-transform duration-500 ease-out hover:-translate-y-1.5">
      {/* Camera photograph */}
      <img
        src="/images/camera-g7x.png"
        alt="Canon G7X Mark III"
        draggable={false}
        className="w-full h-auto block"
      />

      {/* Photos flicking through on the LCD screen */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: LCD.left,
          top: LCD.top,
          width: LCD.width,
          height: LCD.height,
          borderRadius: '3px',
        }}
      >
        {photos.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: i === idx ? 1 : 0, transition: 'opacity 0.12s linear' }}
          />
        ))}

        {/* Screen glare overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)',
          }}
        />
      </div>
    </div>
  )
}
