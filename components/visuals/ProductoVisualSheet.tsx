export function ProductoVisualSheet() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(115deg, #14171c 0%, #20252b 30%, #2a3038 50%, #20252b 70%, #14171c 100%)",
      }}
    >
      <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="g-sheet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#aaadb0" />
            <stop offset=".3" stopColor="#5a5d62" />
            <stop offset=".7" stopColor="#3a3d42" />
            <stop offset="1" stopColor="#1a1d22" />
          </linearGradient>
        </defs>
        <g transform="translate(120 120)">
          <ellipse cx="180" cy="120" rx="180" ry="100" fill="url(#g-sheet)" />
          <ellipse cx="180" cy="120" rx="120" ry="65" fill="#0a0c10" />
          <ellipse cx="180" cy="120" rx="90" ry="50" fill="#1a1d22" stroke="#3a3d42" strokeWidth="1" />
          <ellipse cx="180" cy="120" rx="60" ry="33" fill="#0a0c10" />
        </g>
        <line x1="60" y1="380" x2="540" y2="380" stroke="#c26f3a" strokeWidth="1" opacity=".6" />
        <text x="60" y="402" fill="#c26f3a" fontFamily="General Sans" fontSize="11" letterSpacing="3">
          LÁMINA · ROLLO · GALVANIZADO
        </text>
      </svg>
    </div>
  );
}
