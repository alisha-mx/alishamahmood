function Sprockets({ count = 7 }) {
  return (
    <div className="flex items-center justify-around py-[7px] px-1">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-full bg-[#FAF6EF]/50"
          style={{ width: 5, height: 5 }}
        />
      ))}
    </div>
  )
}

export default function FilmStrip({ images, style, className = '' }) {
  return (
    <div
      className={`bg-[#1C1C1C] flex flex-col shadow-[0_16px_48px_rgba(0,0,0,0.55)] ${className}`}
      style={style}
    >
      <Sprockets />
      {images.map((src, i) => (
        <div key={i}>
          <div className="px-[10px]">
            <img
              src={src}
              alt=""
              draggable={false}
              className="w-full aspect-square object-cover object-top block"
              style={{ filter: 'grayscale(100%) contrast(1.12) brightness(0.88)' }}
            />
          </div>
          <Sprockets />
        </div>
      ))}
    </div>
  )
}
