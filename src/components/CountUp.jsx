import { useEffect, useRef, useState } from "react";

/*
  Usage:
  <CountUp end={4.8} decimals={1} duration={1800} />
  <CountUp end={10000} suffix="+" duration={2800} />
  <CountUp end={60} suffix="+" duration={1600} />

  Animates from 0 to `end` once the element scrolls into view. Uses an
  IntersectionObserver so it only triggers when actually visible, and only
  plays once per page visit.

  Default duration bumped up and eased more gently — a fast count on a big
  number (e.g. 10,000 in under a second) reads as fake/"rigged" rather than
  a genuine tally. Slower + smoother reads as more deliberate and trustworthy.
*/
export default function CountUp({
  end,
  duration = 2200,
  decimals = 0,
  prefix = "",
  suffix = "",
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out quart — gentler deceleration than cubic, so the final
      // stretch (the part people actually watch) slows down smoothly
      // instead of snapping to the end value.
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(end * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, end, duration]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-IN");

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
