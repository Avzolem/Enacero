import type { ReactNode } from "react";

export type Producto = {
  idx: string;
  eyebrow: string;
  title: string;
  sub: string;
  specs: string[];
  visual: ReactNode;
};

export function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <article className="relative mr-8 grid h-full max-w-[1100px] flex-[0_0_78vw] grid-cols-1 overflow-hidden border border-white/[.06] bg-bg-2 md:grid-cols-[1.15fr_1fr]">
      <div className="relative min-h-[280px] overflow-hidden bg-bg-3 md:min-h-[480px]">
        <span className="absolute left-6 top-6 z-[2] text-[11px] font-medium uppercase tracking-[.25em] text-n-400">
          {producto.idx}
        </span>
        <div className="absolute inset-0">{producto.visual}</div>
      </div>
      <div className="flex flex-col justify-between gap-8 p-8 md:min-h-[480px] md:p-10">
        <div>
          <span className="inline-flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[.22em] text-copper">
            <span className="h-px w-6 bg-copper" />
            {producto.eyebrow}
          </span>
          <h3
            className="mt-4 font-medium"
            style={{
              fontSize: "clamp(28px,3vw,48px)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-tighter)",
            }}
          >
            {producto.title}
          </h3>
          <p className="mt-2 max-w-[38ch] text-sm leading-[1.5] text-n-400">{producto.sub}</p>
        </div>
        <ul className="flex flex-col gap-3 border-t border-white/[.08] pt-6">
          {producto.specs.map((spec) => (
            <li key={spec} className="flex items-baseline gap-3.5 text-sm font-normal text-n-200">
              <span className="block h-1.5 w-1.5 flex-shrink-0 -translate-y-[2px] bg-copper" />
              {spec}
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="inline-flex items-center gap-2.5 self-start border-b border-white/20 pb-1.5 text-[13px] font-semibold tracking-[.04em] text-n-100 transition-colors hover:border-copper hover:text-copper"
        >
          Ver ficha técnica
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}
