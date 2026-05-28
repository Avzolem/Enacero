import Image from "next/image";

export function Footer() {
  return (
    <footer
      className="bg-bg-0 text-n-200"
      style={{
        padding: "clamp(60px,8vw,100px) var(--pad) 32px",
        borderTop: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <div
        className="grid gap-10 border-b border-white/[.06]"
        style={{ paddingBottom: "60px", gridTemplateColumns: "minmax(0,1fr)" }}
      >
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/logo-mark.webp"
              alt="Enacero — Encuentro Acerero MX"
              width={62}
              height={58}
              className="mb-5 h-14 w-auto object-contain"
            />
            <h3 className="text-sm font-semibold uppercase tracking-[.14em] text-n-100">
              ENACERO
              <small className="mt-1 block text-[11px] tracking-[.2em] text-copper">
                Encuentro Acerero MX
              </small>
            </h3>
            <p className="mt-5 max-w-[32ch] text-[13px] leading-[1.55] text-n-400">
              Distribuidora de acero B2B con base en Ciudad de México. Servicio a construcción, industria,
              fabricantes, techadores y distribuidores.
            </p>
          </div>

          <FooterCol
            title="Productos"
            links={[
              { label: "Aceros Planos", href: "#productos" },
              { label: "Perfiles Estructurales", href: "#productos" },
              { label: "Aceros de Refuerzo", href: "#productos" },
            ]}
          />

          <FooterCol
            title="Sectores"
            links={[
              { label: "Construcción", href: "#sectores" },
              { label: "Industria Metal Mecánica", href: "#sectores" },
              { label: "Estructuras Metálicas", href: "#sectores" },
              { label: "Distribución y Gobierno", href: "#sectores" },
            ]}
          />

          <FooterCol
            title="Contacto"
            links={[
              { label: "+52 554 889 6854", href: "https://wa.me/525548896854" },
              { label: "contacto@encuentroacerero.com.mx", href: "mailto:contacto@encuentroacerero.com.mx" },
              { label: "CDMX, México" },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-8 text-xs text-n-400">
        <span>© 2026 Enacero — Encuentro Acerero MX. Todos los derechos reservados.</span>
        <div className="flex gap-6">
          <span>Aviso de privacidad</span>
          <span>Términos</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href?: string }>;
}) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[.2em] text-n-400">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((l, i) => (
          <li key={i} className="text-sm text-n-200">
            {l.href ? (
              <a href={l.href} className="transition-colors hover:text-copper">
                {l.label}
              </a>
            ) : (
              l.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
