import type { ReactNode } from "react";

type Sector = {
  num: string;
  title: string;
  desc: string;
  icon: ReactNode;
  feature?: boolean;
};

const SECTORES: Sector[] = [
  {
    num: "01 — Énfasis",
    title: "Construcción",
    desc: "Edificación, obra civil e infraestructura que requieren acero estructural de alta calidad.",
    feature: true,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-14 w-14">
        <path d="M4 42h40M8 42V20l16-12 16 12v22M16 42V28h16v14M22 28v14M28 28v14" />
      </svg>
    ),
  },
  {
    num: "02 — Énfasis",
    title: "Industria Metal Mecánica",
    desc: "Fabricantes y talleres que transforman el acero en productos y componentes industriales.",
    feature: true,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-14 w-14">
        <path d="M4 42h40M8 42V24l10 6V18l10 8V12l12 10v20" />
        <rect x="12" y="34" width="4" height="6" />
        <rect x="22" y="34" width="4" height="6" />
        <rect x="32" y="34" width="4" height="6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Estructuras Metálicas",
    desc: "Talleres de naves, estructuras metálicas y proyectos a medida.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
        <path d="M4 8h40M4 16h40M4 24h40M4 32h40M4 40h40M12 4v40M24 4v40M36 4v40" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Distribución y Gobierno",
    desc: "Distribuidores mayoristas, sector privado y proyectos gubernamentales de gran escala.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
        <path d="M4 16l20-8 20 8-20 8-20-8zM4 16v16l20 8 20-8V16M4 24l20 8 20-8" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Techadores",
    desc: "Lámina galvanizada, perfiles de soporte y herraje para cubiertas.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
        <path d="M4 36L24 8l20 28M4 36h40M10 36v6h28v-6" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Manufactura",
    desc: "Producción y distribución de componentes con suministro confiable de acero.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
        <rect x="6" y="10" width="36" height="32" />
        <path d="M6 18h36M14 10V6M34 10V6M14 26h8M14 32h12M28 26h6M28 32h6" />
      </svg>
    ),
  },
];

export function Sectores() {
  return (
    <section
      id="sectores"
      className="bg-bg-light text-[#14171c]"
      style={{ padding: "clamp(80px,12vw,160px) var(--pad)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div
          className="flex flex-wrap items-end justify-between gap-10"
          style={{ marginBottom: "clamp(50px,6vw,80px)" }}
        >
          <div>
            <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper-deep">
              <span className="h-px w-6 bg-copper-deep" />
              05 · A quién atendemos
            </span>
            <h2
              className="mt-4 font-medium"
              style={{
                fontSize: "clamp(36px,5vw,80px)",
                lineHeight: 1,
                letterSpacing: "var(--tracking-tighter)",
                maxWidth: "14ch",
              }}
            >
              Sectores que confían en nuestro acero.
            </h2>
          </div>
          <p className="max-w-[36ch] text-sm leading-[1.55] text-n-600">
            Atendemos a constructores, fabricantes y distribuidores con el mismo estándar: respuesta puntual,
            material en especificación, entrega documentada.
          </p>
        </div>

        <div
          className="grid border border-[#14171c]/12 sm:grid-cols-2 md:grid-cols-6"
          style={{ gridAutoRows: "200px" }}
        >
          {SECTORES.map((s, i) => (
            <SectorTile key={s.title} sector={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorTile({ sector, index }: { sector: Sector; index: number }) {
  const featureColClass =
    index === 0
      ? "md:col-start-1 md:col-end-4 md:row-span-2"
      : "md:col-start-4 md:col-end-7 md:row-span-2";

  return (
    <a
      href="#contacto"
      className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden border-b border-r border-[#14171c]/12 bg-bg-light p-7 transition-colors duration-500 hover:bg-[#14171c] hover:text-n-100 ${
        sector.feature ? featureColClass : "md:col-span-2"
      }`}
    >
      <span className="text-[10px] font-medium uppercase tracking-[.25em] text-n-600 group-hover:text-n-400">
        {sector.num}
      </span>
      <div>
        <span className="block text-n-700 transition-colors duration-500 group-hover:text-copper">
          {sector.icon}
        </span>
        <h3
          className="mt-4 font-medium"
          style={{
            fontSize: sector.feature ? "clamp(32px,3.6vw,56px)" : "clamp(22px,2.2vw,34px)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          {sector.title}
        </h3>
        <p className="mt-3 max-h-0 max-w-[32ch] overflow-hidden text-sm leading-[1.5] text-n-600 opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-[100px] group-hover:opacity-100 group-hover:text-n-200">
          {sector.desc}
        </p>
      </div>
      <div className="flex items-end justify-between gap-4">
        <span />
        <div className="grid h-8 w-8 place-items-center rounded-full border border-[#14171c]/20 transition-colors duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-bg-0">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </div>
      </div>
    </a>
  );
}
