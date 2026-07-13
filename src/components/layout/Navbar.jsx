// import { useEffect, useState, useRef } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { Menu, X, MapPin, ChevronDown } from "lucide-react";
// import { LOGO_URL } from "@/lib/api";

// const links = [
//   { to: "/", label: "Home" },
//   { to: "/games", label: "Games" },
//   { to: "/offers", label: "Offers" },
//   { to: "/franchise", label: "Franchise" },
//   { to: "/contact", label: "Contact" },
// ];

// const BRANCHES = [
//   { slug: "jalandhar", city: "Jalandhar", state: "Punjab" },
//   { slug: "amritsar", city: "Amritsar", state: "Punjab" },
//   { slug: "zirakpur", city: "Zirakpur", state: "Punjab" },
//   { slug: "pune", city: "Pune", state: "Maharashtra" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [branchOpen, setBranchOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();
//   const branchRef = useRef(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     setOpen(false);
//     setBranchOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const onClick = (e) => {
//       if (branchRef.current && !branchRef.current.contains(e.target))
//         setBranchOpen(false);
//     };
//     document.addEventListener("mousedown", onClick);
//     return () => document.removeEventListener("mousedown", onClick);
//   }, []);

//   return (
//     <header
//       data-testid="site-navbar"
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? "goi-glass border-b border-white/10" : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
//         <Link
//           to="/"
//           data-testid="navbar-logo"
//           className="flex items-center group"
//         >
//           <div
//             className="
//       relative
//       h-16
//       w-16
//       md:h-20
//       md:w-20
//       flex
//       items-center
//       justify-center
//       transition-all
//       duration-300
//       group-hover:scale-110
//     "
//           >
//             {/* Neon Glow */}
//             <div
//               className="
//         absolute
//         inset-0
//         rounded-full
//         bg-gradient-to-r
//         from-cyan-500/30
//         via-fuchsia-500/20
//         to-pink-500/30
//         blur-xl
//       "
//             />

//             <img
//               src={LOGO_URL}
//               alt="Game On India"
//               className="
//         relative
//         z-10
//         h-full
//         w-full
//         object-contain
//         drop-shadow-[0_0_20px_rgba(0,255,255,0.45)]
//       "
//             />
//           </div>
//         </Link>
//         <nav className="hidden lg:flex items-center gap-1">
//           {links.map((l) => (
//             <NavLink
//               key={l.to}
//               to={l.to}
//               data-testid={`nav-link-${l.label.toLowerCase()}`}
//               className={({ isActive }) =>
//                 `px-4 py-2 text-sm font-medium rounded-full transition-all ${
//                   isActive
//                     ? "text-brand-cyan"
//                     : "text-white/70 hover:text-white"
//                 }`
//               }
//             >
//               {l.label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="flex items-center gap-2 sm:gap-3">
//           <div ref={branchRef} className="relative hidden md:block">
//             <button
//               data-testid="navbar-find-branch-btn"
//               onClick={() => setBranchOpen(!branchOpen)}
//               className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/10 transition text-sm font-semibold"
//               aria-expanded={branchOpen}
//               aria-haspopup="true"
//             >
//               <MapPin className="w-4 h-4" />
//               <span>Find Branch</span>
//               <ChevronDown
//                 className={`w-3.5 h-3.5 transition ${branchOpen ? "rotate-180" : ""}`}
//               />
//             </button>
//             {branchOpen && (
//               <div
//                 className="absolute right-0 top-full mt-2 w-64 goi-glass rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10"
//                 data-testid="navbar-branch-dropdown"
//               >
//                 <div className="px-4 py-3 border-b border-white/10 text-[11px] tracking-widest uppercase text-white/50">
//                   Our Branches
//                 </div>
//                 {BRANCHES.map((b) => (
//                   <Link
//                     key={b.slug}
//                     to={`/branches/${b.slug}`}
//                     data-testid={`navbar-branch-option-${b.slug}`}
//                     className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition group"
//                   >
//                     <div>
//                       <div className="font-semibold text-sm text-white group-hover:text-brand-magenta">
//                         {b.city}
//                       </div>
//                       <div className="text-xs text-white/50">{b.state}</div>
//                     </div>
//                     <MapPin className="w-4 h-4 text-white/40 group-hover:text-brand-magenta" />
//                   </Link>
//                 ))}
//                 <Link
//                   to="/branches"
//                   data-testid="navbar-view-all-branches"
//                   className="block px-4 py-3 text-center text-xs tracking-widest uppercase text-brand-cyan hover:bg-brand-cyan/10 border-t border-white/10 font-bold"
//                 >
//                   View All Branches
//                 </Link>
//               </div>
//             )}
//           </div>

//           <Link
//             to="/booking"
//             data-testid="navbar-book-now-btn"
//             className="goi-btn-primary text-sm hidden sm:inline-flex"
//           >
//             Book Now
//           </Link>
//           <button
//             data-testid="mobile-menu-toggle"
//             onClick={() => setOpen(!open)}
//             className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10"
//             aria-label="Menu"
//           >
//             {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//           </button>
//         </div>
//       </div>

//       {open && (
//         <div className="lg:hidden goi-glass border-t border-white/10">
//           <nav className="px-6 py-6 flex flex-col gap-1">
//             <div className="px-1 pb-2 text-[11px] tracking-widest uppercase text-brand-cyan font-bold flex items-center gap-2">
//               <MapPin className="w-3.5 h-3.5" /> Find Your Branch
//             </div>
//             <div className="grid grid-cols-2 gap-2 mb-4">
//               {BRANCHES.map((b) => (
//                 <Link
//                   key={b.slug}
//                   to={`/branches/${b.slug}`}
//                   data-testid={`mobile-branch-${b.slug}`}
//                   className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:border-brand-magenta hover:text-brand-magenta text-sm font-semibold"
//                 >
//                   <MapPin className="w-4 h-4" />
//                   {b.city}
//                 </Link>
//               ))}
//             </div>
//             {links.map((l) => (
//               <NavLink
//                 key={l.to}
//                 to={l.to}
//                 data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
//                 className={({ isActive }) =>
//                   `px-4 py-3 rounded-lg text-base font-medium ${isActive ? "text-brand-cyan bg-white/5" : "text-white/80 hover:bg-white/5"}`
//                 }
//               >
//                 {l.label}
//               </NavLink>
//             ))}
//             <Link
//               to="/booking"
//               data-testid="mobile-nav-book-now-btn"
//               className="goi-btn-primary mt-4 justify-center"
//             >
//               Book Now
//             </Link>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, MapPin, ChevronDown } from "lucide-react";
import { LOGO_URL } from "@/lib/api";

const links = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
  { to: "/offers", label: "Offers" },
  { to: "/franchise", label: "Franchise" },
  { to: "/contact", label: "Contact" },
];

const BRANCHES = [
  { slug: "jalandhar", city: "Jalandhar", state: "Punjab" },
  { slug: "amritsar", city: "Amritsar", state: "Punjab" },
  { slug: "zirakpur", city: "Zirakpur", state: "Punjab" },
  { slug: "pune", city: "Pune", state: "Maharashtra" },
];

// Magnetic pull effect for the primary CTA — subtle, follows cursor within button bounds
function MagneticButton({ children, className, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.35 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <Link
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className={`${className} transition-transform duration-150 ease-out`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const branchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setBranchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (branchRef.current && !branchRef.current.contains(e.target))
        setBranchOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "goi-glass border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link
          to="/"
          data-testid="navbar-logo"
          className="flex items-center group"
        >
          <div className="relative h-16 w-16 md:h-20 md:w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 via-fuchsia-500/20 to-pink-500/30 blur-xl group-hover:blur-2xl group-hover:from-cyan-500/50 group-hover:via-fuchsia-500/40 group-hover:to-pink-500/50 transition-all duration-300" />
            <img
              src={LOGO_URL}
              alt="Game On India"
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_20px_rgba(0,255,255,0.45)] group-hover:drop-shadow-[0_0_28px_rgba(0,255,255,0.7)] transition-all duration-300"
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-full group transition-colors ${
                  isActive
                    ? "text-brand-cyan"
                    : "text-white/70 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {/* animated underline: grows from center on hover, stays full-width if active */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[2px] rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300 ${
                      isActive ? "w-6" : "w-0 group-hover:w-6"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div ref={branchRef} className="relative hidden md:block">
            <button
              data-testid="navbar-find-branch-btn"
              onClick={() => setBranchOpen(!branchOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan hover:shadow-[0_0_20px_-2px_rgba(0,240,255,0.6)] transition-all duration-300 text-sm font-semibold"
              aria-expanded={branchOpen}
              aria-haspopup="true"
            >
              <MapPin className="w-4 h-4" />
              <span>Find Branch</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${branchOpen ? "rotate-180" : ""}`}
              />
            </button>
            {branchOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-64 goi-glass rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 animate-[fadeUp_0.2s_ease]"
                data-testid="navbar-branch-dropdown"
              >
                <div className="px-4 py-3 border-b border-white/10 text-[11px] tracking-widest uppercase text-white/50">
                  Our Branches
                </div>
                {BRANCHES.map((b) => (
                  <Link
                    key={b.slug}
                    to={`/branches/${b.slug}`}
                    data-testid={`navbar-branch-option-${b.slug}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-white/5 hover:pl-5 transition-all duration-200 group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-white group-hover:text-brand-magenta transition-colors">
                        {b.city}
                      </div>
                      <div className="text-xs text-white/50">{b.state}</div>
                    </div>
                    <MapPin className="w-4 h-4 text-white/40 group-hover:text-brand-magenta group-hover:scale-110 transition-all" />
                  </Link>
                ))}
                <Link
                  to="/branches"
                  data-testid="navbar-view-all-branches"
                  className="block px-4 py-3 text-center text-xs tracking-widest uppercase text-brand-cyan hover:bg-brand-cyan/10 border-t border-white/10 font-bold transition-colors"
                >
                  View All Branches
                </Link>
              </div>
            )}
          </div>

          <MagneticButton
            to="/booking"
            data-testid="navbar-book-now-btn"
            className="goi-btn-primary text-sm hidden sm:inline-flex"
          >
            Book Now
          </MagneticButton>

          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-magenta hover:shadow-[0_0_16px_-2px_rgba(255,0,85,0.6)] transition-all duration-300"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden goi-glass border-t border-white/10">
          <nav className="px-6 py-6 flex flex-col gap-1">
            <div className="px-1 pb-2 text-[11px] tracking-widest uppercase text-brand-cyan font-bold flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Find Your Branch
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {BRANCHES.map((b) => (
                <Link
                  key={b.slug}
                  to={`/branches/${b.slug}`}
                  data-testid={`mobile-branch-${b.slug}`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:border-brand-magenta hover:text-brand-magenta hover:bg-brand-magenta/5 transition-all text-sm font-semibold"
                >
                  <MapPin className="w-4 h-4" />
                  {b.city}
                </Link>
              ))}
            </div>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "text-brand-cyan bg-white/5"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/booking"
              data-testid="mobile-nav-book-now-btn"
              className="goi-btn-primary mt-4 justify-center"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
