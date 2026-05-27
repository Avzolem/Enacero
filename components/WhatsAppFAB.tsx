export function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/525548896854"
      aria-label="WhatsApp directo"
      className="fixed bottom-6 right-6 z-[55] grid h-14 w-14 place-items-center rounded-full bg-copper text-bg-0 shadow-[0_16px_40px_-8px_rgba(194,111,58,.55),0_0_0_1px_rgba(255,255,255,.08)] transition-[transform,background] duration-300 hover:scale-110 hover:-translate-y-0.5 hover:bg-copper-bright"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1.5 rounded-full border border-copper/40"
        style={{ animation: "fab-pulse 2.4s ease-out infinite" }}
      />
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M20.5 3.5A10.6 10.6 0 0 0 3.4 17.2L2 22l4.9-1.3A10.6 10.6 0 1 0 20.5 3.5Zm-8.4 16.3a8.7 8.7 0 0 1-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3a8.6 8.6 0 1 1 7 3.7Zm4.8-6.5c-.3-.1-1.5-.7-1.8-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
      </svg>
    </a>
  );
}
