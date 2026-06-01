const PageVideoBackdrop = ({
  src = '/video2.mp4',
  overlay = 'dark',
  className = '',
  videoClassName = 'opacity-[0.24]',
}) => {
  const overlayClass = overlay === 'light'
    ? 'bg-white/72'
    : 'bg-[#03070d]/72'

  const gradientClass = overlay === 'light'
    ? 'bg-[linear-gradient(180deg,rgba(247,249,252,0.68),rgba(247,249,252,0.94)_76%,#f7f9fc)]'
    : 'bg-[linear-gradient(180deg,rgba(3,7,13,0.2),rgba(3,7,13,0.82)_76%,#03070d)]'

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        defaultMuted
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        src={src}
        className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className={`absolute inset-0 ${gradientClass}`} />
      <div className="absolute inset-0 subtle-ai-grid opacity-40" />
    </div>
  )
}

export default PageVideoBackdrop
