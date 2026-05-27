export function ProductoVisualBeam() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(194,111,58,.15), transparent 70%), linear-gradient(180deg, #14171c 0%, #0a0c10 100%)",
      }}
    >
      <svg
        viewBox="0 0 600 480"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="g-beam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a4048" />
            <stop offset=".5" stopColor="#8a8f94" />
            <stop offset="1" stopColor="#2a2d32" />
          </linearGradient>
          <linearGradient id="g-beam-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a4d52" />
            <stop offset="1" stopColor="#1a1d22" />
          </linearGradient>
        </defs>
        <g transform="translate(120 120) skewY(-12)">
          <rect x="0" y="0" width="360" height="40" fill="url(#g-beam)" />
          <rect x="160" y="40" width="40" height="200" fill="url(#g-beam-side)" />
          <rect x="0" y="240" width="360" height="40" fill="url(#g-beam)" />
        </g>
        <line x1="60" y1="380" x2="540" y2="380" stroke="#c26f3a" strokeWidth="1" opacity=".6" />
        <text x="60" y="402" fill="#c26f3a" fontFamily="General Sans" fontSize="11" letterSpacing="3">
          IPR · HSS · IPS
        </text>
      </svg>
    </div>
  );
}
