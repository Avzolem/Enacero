import Image from "next/image";

export function ProductoVisualPhoto({
  src,
  alt,
  delay = 0,
}: {
  src: string;
  alt: string;
  delay?: number;
}) {
  return (
    <div className="absolute inset-0">
      {/* Brushed-steel base wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 38%, rgba(212,214,217,.10), transparent 72%)",
        }}
      />
      {/* Copper spotlight */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 42%, rgba(194,111,58,.16), transparent 70%)",
        }}
      />
      {/* Technical grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #000 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #000 35%, transparent 80%)",
        }}
      />

      {/* Floating product */}
      <div
        className="absolute inset-0 grid place-items-center p-10 md:p-14"
        style={{
          animation: "product-float 7s var(--ease-in-out-soft) infinite",
          animationDelay: `${delay}s`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={640}
          height={640}
          sizes="(max-width: 768px) 80vw, 540px"
          className="h-auto max-h-full w-auto max-w-full object-contain"
          style={{ filter: "drop-shadow(0 36px 48px rgba(0,0,0,.55))" }}
        />
      </div>

      {/* Floor reflection / contact shadow */}
      <div
        aria-hidden
        className="absolute inset-x-10 bottom-12 h-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(0,0,0,.5), transparent 75%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
