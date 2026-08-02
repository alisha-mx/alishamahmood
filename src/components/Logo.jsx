export default function Logo({ className = '' }) {
  return (
    <span
      aria-label="Alisha"
      className={[
        'select-none font-brand font-bold uppercase tracking-[0.05em]',
        className,
      ].join(' ')}
    >
      ALISHA
    </span>
  )
}
