import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { LOGO_URL } from "@/lib/api";

// Drop this once, right inside <BrowserRouter>, replacing the earlier
// ScrollToTop component (this does both jobs: resets scroll AND shows a
// branded transition loader on every route change).
export default function PageLoader() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip the loader on initial page load — only show it on navigation
    if (firstRender.current) {
      firstRender.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    setLoading(true);
    setProgress(15);

    // Fake progress ramps up quickly, then eases — feels responsive
    // even though there's no real async work being tracked.
    const rampUp = setTimeout(() => setProgress(70), 80);
    const rampFull = setTimeout(() => setProgress(100), 320);

    const finish = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setLoading(false);
      setProgress(0);
    }, 480);

    return () => {
      clearTimeout(rampUp);
      clearTimeout(rampFull);
      clearTimeout(finish);
    };
  }, [pathname]);

  return (
    <>
      {/* Top progress bar */}
      <div
        className={`fixed top-0 left-0 h-1 z-[100] bg-gradient-to-r from-brand-magenta via-brand-cyan to-brand-magenta transition-all ease-out ${
          loading ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "150ms" : "300ms",
          boxShadow:
            "0 0 14px rgba(0, 240, 255, 0.9), 0 0 5px rgba(255, 0, 85, 0.9)",
        }}
        data-testid="page-loader-progress-bar"
      />

      {/* Full-screen branded overlay */}
      <div
        className={`fixed inset-0 z-[99] flex items-center justify-center bg-[#050505] transition-opacity duration-300 ${
          loading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        data-testid="page-loader-overlay"
        aria-hidden={!loading}
      >
        <div className="absolute inset-0 goi-grid-bg opacity-30" />

        {/* Landed between the original (w-32) and the too-big version (w-64) */}
        <div className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48">
          {/* Orbiting ring */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin [animation-duration:1.4s]"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="80 200"
            />
            <defs>
              <linearGradient
                id="loaderGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF0055" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Pulsing glow behind logo */}
          <div className="absolute inset-5 md:inset-6 rounded-full bg-gradient-to-r from-brand-magenta/40 via-brand-cyan/30 to-brand-magenta/40 blur-2xl animate-pulse [animation-duration:1.2s]" />

          {/* Logo */}
          <img
            src={LOGO_URL}
            alt="Loading"
            className="relative z-10 w-28 h-28 md:w-32 md:h-32 object-contain animate-pulse [animation-duration:1.2s] drop-shadow-[0_0_24px_rgba(0,240,255,0.6)]"
          />
        </div>
      </div>
    </>
  );
}
