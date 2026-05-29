"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Principal"
      className={`fixed inset-x-0 top-0 z-[60] flex items-center justify-between transition-[background,backdrop-filter,box-shadow,padding] duration-[450ms] ${
        scrolled ? "py-3" : "py-[18px]"
      }`}
      style={{
        paddingLeft: "var(--pad)",
        paddingRight: "var(--pad)",
        ...(scrolled
          ? {
              background:
                "linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.04) 55%, rgba(255,255,255,0)), rgba(13,14,17,.38)",
              backdropFilter: "blur(24px) saturate(185%) brightness(1.04)",
              WebkitBackdropFilter: "blur(24px) saturate(185%) brightness(1.04)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,.18), inset 0 -1px 0 rgba(255,255,255,.05), 0 10px 36px rgba(0,0,0,.28)",
            }
          : {
              background: "transparent",
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
              boxShadow: "none",
            }),
      }}
    >
      <a href="#hero" className="flex items-center gap-3">
        <Image
          src="/logo-mark.webp"
          alt=""
          width={40}
          height={37}
          priority
          className={`w-auto object-contain transition-[height] duration-[350ms] ${
            scrolled ? "h-9" : "h-10"
          }`}
        />
        <Image
          src="/logo-word-light.webp"
          alt="Enacero — Encuentro Acerero MX"
          width={1490}
          height={371}
          priority
          className={`w-auto object-contain transition-[height] duration-[350ms] ${
            scrolled ? "h-[22px]" : "h-[26px]"
          }`}
        />
      </a>

      <div className="hidden items-center gap-1 md:flex">
        {[
          { label: "Productos", href: "#productos" },
          { label: "Sectores", href: "#sectores" },
          { label: "Proceso", href: "#proceso" },
          { label: "Contacto", href: "#contacto" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="relative rounded-full px-4 py-2.5 text-[13px] font-medium tracking-[.04em] text-n-200 transition-colors duration-[250ms] hover:text-n-100"
          >
            {l.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <a
          href="https://wa.me/525548896854"
          aria-label="WhatsApp"
          className="grid h-[38px] w-[38px] place-items-center rounded-full border border-white/10 text-n-200 transition-colors hover:border-copper hover:text-copper"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M20.5 3.5A10.6 10.6 0 0 0 3.4 17.2L2 22l4.9-1.3A10.6 10.6 0 1 0 20.5 3.5Zm-8.4 16.3a8.7 8.7 0 0 1-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3a8.6 8.6 0 1 1 7 3.7Zm4.8-6.5c-.3-.1-1.5-.7-1.8-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
          </svg>
        </a>
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 rounded-full bg-copper px-[18px] py-2.5 text-[13px] font-semibold text-bg-0 transition-colors hover:bg-copper-bright"
        >
          Cotizar
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
