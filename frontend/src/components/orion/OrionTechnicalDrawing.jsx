const OrionTechnicalDrawing = ({ className = '', variant = 'platform', label = 'ORION SYSTEM STUDY' }) => {
  const palette = {
    ink: '#10223b',
    line: '#8ea2b8',
    soft: '#dbe4ee',
    purple: '#8f38ff',
    gold: '#b98448',
  }

  const grid = Array.from({ length: 13 }, (_, index) => index * 48)

  return (
    <div className={`relative overflow-hidden rounded-[26px] border border-[#10223b]/10 bg-[#f6f8fb] ${className}`}>
      <svg viewBox="0 0 600 400" role="img" aria-label={`${label} technical illustration`} className="h-full w-full">
        <defs>
          <pattern id="orion-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke={palette.soft} strokeWidth="0.75" />
          </pattern>
          <linearGradient id="orion-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.45" stopColor="#d7e0e8" />
            <stop offset="1" stopColor="#f8fafc" />
          </linearGradient>
        </defs>

        <rect width="600" height="400" fill="url(#orion-grid)" />
        {grid.map((x) => <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="400" stroke={palette.soft} strokeWidth="0.35" opacity="0.7" />)}
        {[56, 120, 280, 344].map((y) => <line key={`h-${y}`} x1="0" y1={y} x2="600" y2={y} stroke={palette.soft} strokeWidth="0.35" opacity="0.7" />)}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M52 62h94M52 62v30M454 330h94M548 300v30" stroke={palette.ink} strokeWidth="1.4" opacity="0.65" />
          <path d="M52 92h70M478 300h70" stroke={palette.purple} strokeWidth="1.5" />
          <circle cx="51" cy="62" r="3" fill={palette.gold} stroke="none" />
          <circle cx="548" cy="330" r="3" fill={palette.gold} stroke="none" />

          {variant === 'satellite' ? (
            <>
              <g transform="translate(300 202)">
                <path d="M-68-45 L0-80 L68-45 L68 45 L0 80 L-68 45Z" fill="url(#orion-metal)" stroke={palette.ink} strokeWidth="2" />
                <path d="M-68-45 L0-8 L68-45M-68 45 L0 8 L68 45M0-80V80" stroke={palette.ink} strokeWidth="1.25" opacity="0.8" />
                <circle r="31" stroke={palette.purple} strokeWidth="2" />
                <circle r="9" fill={palette.gold} stroke="none" />
                <path d="M-155-20H-68M68-20H155M-155 20H-68M68 20H155" stroke={palette.ink} strokeWidth="2" />
                <path d="M-220-44H-155V44H-220ZM155-44H220V44H155Z" fill="#e7edf4" stroke={palette.ink} strokeWidth="1.5" />
                {[-198, -176, 176, 198].map((x) => <line key={x} x1={x} y1="-44" x2={x} y2="44" stroke={palette.ink} strokeWidth="0.7" opacity="0.75" />)}
              </g>
              <path d="M88 165H196L226 198M512 149H416L373 178M86 246H198L230 213M513 252H403L373 226" stroke={palette.line} strokeWidth="1" />
            </>
          ) : variant === 'robotics' ? (
            <>
              <g transform="translate(300 205)">
                <rect x="-105" y="58" width="210" height="30" rx="5" fill="url(#orion-metal)" stroke={palette.ink} strokeWidth="2" />
                <path d="M-68 58V10H-18V-31H34V-92H88" stroke={palette.ink} strokeWidth="15" />
                <path d="M-68 58V10H-18V-31H34V-92H88" stroke="#edf2f7" strokeWidth="9" />
                {[[-68, 10], [-18, -31], [34, -92]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="17" fill="#fff" stroke={palette.purple} strokeWidth="2" />)}
                <path d="M86-108l27 16M88-92l31 7M87-77l24-10" stroke={palette.ink} strokeWidth="4" />
                <circle cx="-65" cy="73" r="9" fill={palette.gold} stroke="none" />
                <circle cx="65" cy="73" r="9" fill={palette.gold} stroke="none" />
              </g>
              <path d="M85 114H270L283 174M519 85H390L364 112M86 295H224L258 262M518 307H380L359 250" stroke={palette.line} strokeWidth="1" />
            </>
          ) : (
            <>
              <g transform="translate(306 206)">
                <ellipse cx="0" cy="78" rx="128" ry="22" fill="none" stroke={palette.line} strokeWidth="1.5" strokeDasharray="5 6" />
                <path d="M-126 78H126M0-92V103" stroke={palette.soft} strokeWidth="1" />
                <path d="M-92-35 L0-82 L92-35 L92 42 L0 90 L-92 42Z" fill="url(#orion-metal)" stroke={palette.ink} strokeWidth="2" />
                <path d="M-92-35L0 10L92-35M-92 42L0-3L92 42M0-82V90" stroke={palette.ink} strokeWidth="1" opacity="0.8" />
                <path d="M-166-5H-92M92-5H166" stroke={palette.ink} strokeWidth="2" />
                <rect x="-238" y="-38" width="72" height="66" fill="#e8eff6" stroke={palette.ink} strokeWidth="1.5" />
                <rect x="166" y="-38" width="72" height="66" fill="#e8eff6" stroke={palette.ink} strokeWidth="1.5" />
                {[-220, -202, -184, 184, 202, 220].map((x) => <line key={x} x1={x} y1="-38" x2={x} y2="28" stroke={palette.ink} strokeWidth="0.55" />)}
                <circle cx="0" cy="5" r="24" fill="none" stroke={palette.purple} strokeWidth="2" />
                <circle cx="0" cy="5" r="6" fill={palette.gold} stroke="none" />
                <path d="M25-57 L80-126 M-26-57 L-80-126" stroke={palette.ink} strokeWidth="4" />
                <circle cx="80" cy="-126" r="13" fill="#fff" stroke={palette.purple} strokeWidth="2" />
                <circle cx="-80" cy="-126" r="13" fill="#fff" stroke={palette.purple} strokeWidth="2" />
              </g>
              <path d="M70 128H210L250 172M532 110H405L365 151M71 285H208L251 238M533 288H401L365 248" stroke={palette.line} strokeWidth="1" />
            </>
          )}
        </g>
        <g fill={palette.ink} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9" letterSpacing="1.5" opacity="0.72">
          <text x="52" y="50">{label}</text>
          <text x="52" y="106">SYSTEM REFERENCE / 01</text>
          <text x="407" y="342">CONCEPT STUDY / 2026</text>
          <text x="52" y="370">ALG OFORCE R&amp;D • ORION</text>
        </g>
        <g fill={palette.purple} fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="8" letterSpacing="1.3">
          <text x="52" y="119">AUTONOMY • MODULARITY • VALIDATION</text>
        </g>
      </svg>
    </div>
  )
}

export default OrionTechnicalDrawing
