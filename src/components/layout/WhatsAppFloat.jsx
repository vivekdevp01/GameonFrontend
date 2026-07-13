import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchContactInfo } from "@/lib/api";

export default function WhatsAppFloat() {
  const [number, setNumber] = useState("917710661100");
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    fetchContactInfo()
      .then((d) => {
        if (d?.whatsapp_number) setNumber(d.whatsapp_number);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Entrance delay so it doesn't just pop in on load
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Pulse in short bursts every few seconds instead of running the
    // animation nonstop — same attention-grabbing effect, lighter on the page
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1800);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const message = encodeURIComponent(
    "Hi Game On India! 👋 I'd love to know more about pricing, party packages, and available slots.",
  );

  return (
    <a
      data-testid="whatsapp-float-btn"
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group fixed bottom-6 right-6 z-40 flex items-center justify-center transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-75"
      }`}
      aria-label="Chat with Game On India on WhatsApp"
    >
      {/* Outer pulse ring — fires in short bursts, not continuously */}
      {pulse && (
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-70 [animation-duration:1.8s]" />
      )}

      {/* Static glow behind button, intensifies on hover */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] blur-md opacity-50 group-hover:opacity-80 group-hover:blur-lg transition-all duration-300" />

      {/* Main button */}
      <span className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl shadow-[#25D366]/40 group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
        <MessageCircle
          className="w-6 h-6 text-white group-hover:rotate-[8deg] transition-transform duration-300"
          fill="white"
          strokeWidth={0}
        />
      </span>

      {/* Tooltip — slides in from the right on hover */}
      <span
        className="absolute right-full mr-3 whitespace-nowrap goi-glass px-3 py-1.5 rounded-full text-xs font-medium hidden md:flex items-center gap-1.5
                           opacity-0 translate-x-2 pointer-events-none
                           group-hover:opacity-100 group-hover:translate-x-0
                           transition-all duration-300 ease-out"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
        Chat with us
      </span>
    </a>
  );
}
