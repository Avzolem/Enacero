export function ProductoVisualRebar() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(180deg, #0a0c10 0%, #14171c 100%)" }}
    >
      <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="g-rebar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7a7d82" />
            <stop offset=".5" stopColor="#3a3d42" />
            <stop offset="1" stopColor="#1a1d22" />
          </linearGradient>
        </defs>
        <g transform="translate(80 80) rotate(-12 250 160)">
          <rect x="0" y="0" width="500" height="22" fill="url(#g-rebar)" />
          <g transform="translate(20 50)">
            <rect x="0" y="0" width="500" height="20" fill="url(#g-rebar)" />
          </g>
          <g transform="translate(-20 100)">
            <rect x="0" y="0" width="500" height="24" fill="url(#g-rebar)" />
          </g>
          <g transform="translate(40 160)">
            <rect x="0" y="0" width="500" height="18" fill="url(#g-rebar)" />
          </g>
          <g transform="translate(10 215)">
            <rect x="0" y="0" width="500" height="22" fill="url(#g-rebar)" />
          </g>
        </g>
        <line x1="60" y1="380" x2="540" y2="380" stroke="#c26f3a" strokeWidth="1" opacity=".6" />
        <text x="60" y="402" fill="#c26f3a" fontFamily="General Sans" fontSize="11" letterSpacing="3">
          VARILLA · MALLA · ALAMBRÓN
        </text>
      </svg>
    </div>
  );
}
