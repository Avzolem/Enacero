"use client";

import { useState } from "react";

export function CtaFinal() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-bg-0"
      style={{ padding: "clamp(100px,14vw,180px) var(--pad)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "repeating-linear-gradient(95deg, rgba(0,0,0,0) 0px, rgba(0,0,0,.07) 1px, rgba(255,255,255,.04) 2px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 5px), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(217,129,71,.4), transparent 60%), radial-gradient(ellipse 80% 60% at 20% 80%, rgba(143,79,36,.6), transparent 60%), linear-gradient(135deg, #8f4f24 0%, #c26f3a 50%, #6e3a18 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(7,8,10,.15) 0%, rgba(7,8,10,.6) 100%)",
          }}
        />
      </div>

      <div
        className="relative z-[2] mx-auto grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]"
        style={{ maxWidth: "var(--container-max)", columnGap: "clamp(40px,6vw,80px)" }}
      >
        <div>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-white">
            <span className="h-px w-6 bg-white" />
            09 · Cotización
          </span>
          <h2
            className="mt-6 font-medium"
            style={{
              fontSize: "clamp(40px,6.5vw,104px)",
              lineHeight: 0.95,
              letterSpacing: "var(--tracking-tightest)",
              textWrap: "balance",
            }}
          >
            ¿Tu próximo proyecto necesita{" "}
            <span className="font-normal italic text-copper">acero confiable</span>?
          </h2>
          <p className="mt-8 max-w-[40ch] text-[15px] leading-[1.55] text-white/85">
            Escríbenos o levanta el teléfono. Si trae especificación, recibes cotización el mismo día. Si necesitas
            asesoría técnica, agendamos llamada con el equipo.
          </p>

          <div className="mt-12 flex flex-col gap-5">
            <ContactRow
              label="WhatsApp"
              value="+52 554 889 6854"
              sub="Respuesta directa · L-V 8:00 a 18:00"
              href="https://wa.me/525548896854"
            />
            <ContactRow
              label="Email"
              value="contacto@acerossidiva.com"
              sub="Respuesta en máx. 4 horas"
              href="mailto:contacto@acerossidiva.com"
            />
            <ContactRow
              label="Almacén"
              value="Calle Ote. 182 #362"
              sub="Col. Moctezuma 2da Secc, Venustiano Carranza, CDMX 15530"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="border border-white/10 bg-bg-0/60 p-8 backdrop-blur-[18px] md:p-9"
        >
          <div className="mb-6 flex justify-between text-[11px] font-medium uppercase tracking-[.25em] text-white/70">
            <span>Cotización rápida</span>
            <span className="text-copper-bright">— 4 campos</span>
          </div>

          <Field label="Nombre" id="f-nombre" placeholder="Juan Pérez" required />
          <Field label="Empresa" id="f-empresa" placeholder="Constructora MX" required />
          <Field label="Email" id="f-email" type="email" placeholder="tu@empresa.com" required />
          <Field
            label="¿Qué necesitas?"
            id="f-msg"
            placeholder="Ej: 12 ton de varilla #4, entrega en CDMX, semana del 15"
            textarea
          />

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/525548896854"
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-copper px-7 py-4 text-sm font-semibold text-bg-0 transition-colors hover:bg-copper-bright"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M20.5 3.5A10.6 10.6 0 0 0 3.4 17.2L2 22l4.9-1.3A10.6 10.6 0 1 0 20.5 3.5Z" />
              </svg>
              WhatsApp ahora
            </a>
            <button
              type="submit"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-n-100 transition-colors hover:border-n-100 hover:bg-white/[.06]"
            >
              {sent ? "Enviado ✓" : "Enviar"}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  sub,
  href,
}: {
  label: string;
  value: string;
  sub: string;
  href?: string;
}) {
  const inner = (
    <span
      className="font-medium text-n-100"
      style={{ fontSize: "clamp(16px,1.4vw,20px)", letterSpacing: "var(--tracking-tight)" }}
    >
      {value}
      <small className="mt-1 block text-[13px] font-normal tracking-normal text-white/70">{sub}</small>
    </span>
  );
  return (
    <div className="grid grid-cols-[100px_1fr] items-baseline gap-6 border-b border-white/[.18] pb-4.5">
      <span className="text-[10px] font-medium uppercase tracking-[.25em] text-white/65">{label}</span>
      {href ? <a href={href}>{inner}</a> : inner}
    </div>
  );
}

function Field({
  label,
  id,
  placeholder,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div className="relative mb-1 flex flex-col border-b border-white/15 py-3.5 focus-within:border-copper">
      <label
        htmlFor={id}
        className="mb-2 text-[10px] font-medium uppercase tracking-[.2em] text-white/50"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={3}
          className="resize-none bg-transparent text-[15px] text-n-100 outline-none placeholder:text-white/40"
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className="bg-transparent text-[15px] text-n-100 outline-none placeholder:text-white/40"
        />
      )}
    </div>
  );
}
