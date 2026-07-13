import { useEffect, useState, useRef } from "react";
import { X, Ticket, Copy, Check, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const PRIZES = [
  { label: "10% OFF", code: "GAMEON10", weight: 28, color: "#FF0055" },
  {
    label: "Free Arcade Credit",
    code: "FREECREDIT",
    weight: 18,
    color: "#00F0FF",
  },
  { label: "15% OFF Party", code: "PARTY15", weight: 14, color: "#39FF14" },
  { label: "Try Again Next Visit", code: null, weight: 18, color: "#71717A" },
  { label: "Free VR Session", code: "FREEVR", weight: 10, color: "#FBBF24" },
  { label: "20% OFF Booking", code: "GAMEON20", weight: 12, color: "#A78BFA" },
];

const STORAGE_KEY = "goi_spin_wheel_state"; // { dismissedUntil, wonCode }
const SEGMENT_ANGLE = 360 / PRIZES.length;

function pickWeightedIndex() {
  const total = PRIZES.reduce((sum, p) => sum + p.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < PRIZES.length; i++) {
    r -= PRIZES[i].weight;
    if (r <= 0) return i;
  }
  return PRIZES.length - 1;
}

export default function SpinWheelPopup() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState("form"); // form | spinning | result
  const [email, setEmail] = useState("");
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [copied, setCopied] = useState(false);
  const spinTimeout = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const state = raw ? JSON.parse(raw) : null;
      const now = Date.now();
      if (!state || !state.dismissedUntil || state.dismissedUntil < now) {
        const t = setTimeout(() => setVisible(true), 6000);
        return () => clearTimeout(t);
      }
    } catch {
      const t = setTimeout(() => setVisible(true), 6000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => () => clearTimeout(spinTimeout.current), []);

  const dismiss = (days = 7) => {
    setVisible(false);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          dismissedUntil: Date.now() + days * 24 * 60 * 60 * 1000,
        }),
      );
    } catch {
      /* localStorage unavailable — fail silently, popup just may reappear */
    }
  };

  const handleSpin = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStep("spinning");

    const index = pickWeightedIndex();
    const targetCenter = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const jitter = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.6);
    const spins = 6;
    const finalRotation =
      rotation + spins * 360 + (360 - targetCenter) + jitter;

    setRotation(finalRotation);

    spinTimeout.current = setTimeout(() => {
      setWonPrize(PRIZES[index]);
      setStep("result");
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            dismissedUntil: Date.now() + 30 * 24 * 60 * 60 * 1000,
            wonCode: PRIZES[index].code,
          }),
        );
      } catch {
        /* ignore */
      }
    }, 4200);
  };

  const copyCode = () => {
    if (!wonPrize?.code) return;
    navigator.clipboard?.writeText(wonPrize.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      data-testid="spin-wheel-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        className="relative w-full max-w-md goi-glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl shadow-black/60 animate-[fadeUp_0.3s_ease]"
        data-testid="spin-wheel-panel"
      >
        <button
          onClick={() => dismiss()}
          data-testid="spin-wheel-close-btn"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {step !== "result" && (
          <div className="text-center mb-5">
            <div className="goi-overline mb-2 flex items-center justify-center gap-2">
              <Ticket className="w-3.5 h-3.5" /> Spin & Win
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl">
              Your Weekend Just Got{" "}
              <span className="text-brand-magenta">Luckier</span>
            </h3>
          </div>
        )}

        {/* Wheel */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-6">
          {/* Pointer */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />

          <div
            className="w-full h-full rounded-full relative border-4 border-white/20 shadow-[0_0_40px_-4px_rgba(255,0,85,0.5)]"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition:
                step === "spinning"
                  ? "transform 4.2s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                  : "none",
              background: `conic-gradient(${PRIZES.map((p, i) => `${p.color} ${i * SEGMENT_ANGLE}deg ${(i + 1) * SEGMENT_ANGLE}deg`).join(", ")})`,
            }}
            data-testid="spin-wheel-wheel"
          >
            {PRIZES.map((p, i) => (
              <div
                key={p.label}
                className="absolute inset-0 flex justify-center"
                style={{
                  transform: `rotate(${i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2}deg)`,
                }}
              >
                <span
                  className="mt-3 text-[9px] sm:text-[10px] font-black uppercase text-white text-center leading-tight px-1"
                  style={{
                    width: "70px",
                    textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                  }}
                >
                  {p.label}
                </span>
              </div>
            ))}
          </div>

          {/* Center hub */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-brand-ink border-2 border-white/30 flex items-center justify-center shadow-lg">
              <Ticket className="w-5 h-5 text-brand-cyan" />
            </div>
          </div>
        </div>

        {/* Form step */}
        {step === "form" && (
          <form onSubmit={handleSpin} data-testid="spin-wheel-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to spin"
              data-testid="spin-wheel-email-input"
              className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-cyan focus:outline-none mb-3 text-center"
            />
            <button
              type="submit"
              data-testid="spin-wheel-submit-btn"
              className="goi-btn-primary w-full justify-center"
            >
              Spin the Wheel
            </button>
            <p className="text-[10px] text-white/30 text-center mt-3">
              One spin per visitor. No purchase necessary.
            </p>
          </form>
        )}

        {/* Spinning step */}
        {step === "spinning" && (
          <p className="text-center text-sm text-white/60 animate-pulse">
            Spinning... good luck! 🎯
          </p>
        )}

        {/* Result step */}
        {step === "result" && wonPrize && (
          <div className="text-center" data-testid="spin-wheel-result">
            {wonPrize.code ? (
              <>
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="font-display font-black text-2xl mb-1">
                  You won!
                </h3>
                <p className="text-white/70 mb-4">{wonPrize.label}</p>
                <div
                  className="flex items-center justify-between gap-2 bg-white/5 border border-dashed border-brand-cyan/50 rounded-xl px-4 py-3 mb-5"
                  data-testid="spin-wheel-coupon-code"
                >
                  <span className="font-display font-black text-lg tracking-widest text-brand-cyan">
                    {wonPrize.code}
                  </span>
                  <button
                    onClick={copyCode}
                    data-testid="spin-wheel-copy-btn"
                    className="flex items-center gap-1 text-xs font-bold text-white/70 hover:text-white transition"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-brand-lime" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <Link
                  to="/booking"
                  onClick={() => dismiss(30)}
                  data-testid="spin-wheel-claim-btn"
                  className="goi-btn-primary w-full justify-center"
                >
                  Claim & Book Now <ArrowUpRight className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">😅</div>
                <h3 className="font-display font-black text-2xl mb-1">
                  So close!
                </h3>
                <p className="text-white/60 mb-5">
                  No prize this time — but come back on your next visit for
                  another spin.
                </p>
                <button
                  onClick={() => dismiss(1)}
                  data-testid="spin-wheel-close-result-btn"
                  className="goi-btn-outline w-full justify-center"
                >
                  Got it
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
