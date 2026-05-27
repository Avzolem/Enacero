const BRANDS = [
  "ArcelorMittal",
  "Ternium",
  "DeAcero",
  "Ahmsa",
  "Villacero",
  "Gerdau",
  "Aceros Camesa",
];

const CERTS = ["ISO 9001:2015", "NMX-B-284", "ASTM A36 / A572", "CANACERO", "NOM-008-SCFI"];

export function Aliados() {
  const track = [...BRANDS, ...BRANDS];

  return (
    <section
      className="relative overflow-hidden bg-bg-0"
      style={{ padding: "clamp(80px,10vw,140px) 0" }}
    >
      <div
        className="flex flex-wrap items-end justify-between gap-10"
        style={{ padding: "0 var(--pad)", marginBottom: "clamp(50px,6vw,80px)" }}
      >
        <div>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper">
            <span className="h-px w-6 bg-copper" />
            08 · Aliados y certificaciones
          </span>
          <h2
            className="mt-5 font-medium"
            style={{
              fontSize: "clamp(28px,3.4vw,48px)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-tighter)",
              maxWidth: "18ch",
            }}
          >
            Acero certificado, abastecido por molinos de primer nivel.
          </h2>
        </div>
        <p className="max-w-[40ch] text-sm leading-[1.55] text-n-400">
          Trabajamos con los principales molinos del país y mantenemos certificaciones que respaldan cada entrega.
        </p>
      </div>

      <div
        className="relative overflow-hidden border-y border-white/[.06] py-8"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max gap-16 hover:[animation-play-state:paused]"
          style={{ animation: "marquee 32s linear infinite" }}
        >
          {track.map((brand, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap font-semibold text-n-200 opacity-65 transition-opacity hover:opacity-100"
              style={{ fontSize: "clamp(22px,2.4vw,32px)" }}
            >
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-copper" />
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3" style={{ padding: "0 var(--pad)" }}>
        {CERTS.map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-2 rounded-full border border-white/[.12] px-4 py-2.5 text-xs font-medium uppercase tracking-[.12em] text-n-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-navy-bright" />
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}
