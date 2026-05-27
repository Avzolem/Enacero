export function ProductoVisualTube() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 70% 30%, rgba(31,45,122,.25), transparent 50%), linear-gradient(135deg, #0a0c10 0%, #14171c 50%, #0a0c10 100%)",
      }}
    >
      <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="g-tube" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6a6f74" />
            <stop offset=".4" stopColor="#3a3d42" />
            <stop offset="1" stopColor="#1a1d22" />
          </linearGradient>
          <linearGradient id="g-tube-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a8f94" />
            <stop offset="1" stopColor="#2a2d32" />
          </linearGradient>
        </defs>
        <g transform="translate(80 80)">
          <rect x="0" y="0" width="380" height="60" fill="url(#g-tube)" />
          <ellipse cx="380" cy="30" rx="14" ry="30" fill="url(#g-tube-r)" />
          <rect x="20" y="80" width="380" height="40" fill="url(#g-tube)" />
          <ellipse cx="400" cy="100" rx="10" ry="20" fill="url(#g-tube-r)" />
          <rect x="40" y="140" width="380" height="80" fill="url(#g-tube)" />
          <ellipse cx="420" cy="180" rx="18" ry="40" fill="url(#g-tube-r)" />
          <rect x="60" y="240" width="380" height="30" fill="url(#g-tube)" />
          <ellipse cx="440" cy="255" rx="8" ry="15" fill="url(#g-tube-r)" />
        </g>
        <line x1="60" y1="380" x2="540" y2="380" stroke="#c26f3a" strokeWidth="1" opacity=".6" />
        <text x="60" y="402" fill="#c26f3a" fontFamily="General Sans" fontSize="11" letterSpacing="3">
          PTR · ÁNGULOS · CANALES
        </text>
      </svg>
    </div>
  );
}
