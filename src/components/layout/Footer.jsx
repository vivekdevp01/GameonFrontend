// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   Instagram,
//   Facebook,
//   Youtube,
//   Mail,
//   MapPin,
//   Phone,
// } from "lucide-react";
// import { toast } from "sonner";
// import { subscribeNewsletter, fetchContactInfo, LOGO_URL } from "@/lib/api";

// export default function Footer() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [info, setInfo] = useState({});

//   useEffect(() => {
//     fetchContactInfo()
//       .then(setInfo)
//       .catch(() => {});
//   }, []);

//   const submit = async (e) => {
//     e.preventDefault();
//     if (!email) return;
//     setLoading(true);
//     try {
//       await subscribeNewsletter({ email });
//       toast.success("You're on the list. Let's play.");
//       setEmail("");
//     } catch (err) {
//       toast.error("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <footer
//       data-testid="site-footer"
//       className="relative bg-brand-ink border-t border-white/5 pt-20 pb-10 goi-noise overflow-hidden"
//     >
//       {/* Full-footer background watermark — sits behind everything, clipped by
//           the footer's own overflow-hidden so it never affects layout height */}
//       <div
//         className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
//         aria-hidden="true"
//       >
//         <span className="font-display font-black text-[26vw] sm:text-[18vw] leading-none tracking-tighter whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white/[0.06] to-white/[0.015]">
//           GAME ON
//         </span>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
//           <div className="md:col-span-4">
//             <Link to="/" className="inline-block mb-6">
//               <img
//                 src={LOGO_URL}
//                 alt="Game On India"
//                 className="h-16 w-auto object-contain"
//               />
//             </Link>
//             <p className="text-white/60 max-w-sm mb-6">
//               India's fastest-growing premium Family Entertainment Center.
//               Arcade, VR, bowling, parties — one epic destination.
//             </p>
//             <form
//               onSubmit={submit}
//               className="flex gap-2 max-w-sm"
//               data-testid="newsletter-form"
//             >
//               <input
//                 data-testid="newsletter-email-input"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Your email"
//                 className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-cyan focus:outline-none"
//               />
//               <button
//                 type="submit"
//                 data-testid="newsletter-submit-btn"
//                 disabled={loading}
//                 className="goi-btn-primary text-sm !py-3 !px-5 disabled:opacity-50"
//               >
//                 {loading ? "..." : "Join"}
//               </button>
//             </form>
//           </div>

//           <div className="md:col-span-2">
//             <div className="goi-overline mb-4">Explore</div>
//             <ul className="space-y-3 text-white/70">
//               <li>
//                 <Link to="/games" className="hover:text-brand-cyan">
//                   Games
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/offers" className="hover:text-brand-cyan">
//                   Offers
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/gallery" className="hover:text-brand-cyan">
//                   Gallery
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/upcoming-stores" className="hover:text-brand-cyan">
//                   Upcoming
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className="md:col-span-2">
//             <div className="goi-overline mb-4">Company</div>
//             <ul className="space-y-3 text-white/70">
//               <li>
//                 <Link to="/about-us" className="hover:text-brand-cyan">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/franchise" className="hover:text-brand-cyan">
//                   Franchise
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/careers" className="hover:text-brand-cyan">
//                   Careers
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:text-brand-cyan">
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/branches" className="hover:text-brand-cyan">
//                   Branches
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className="md:col-span-4">
//             <div className="goi-overline mb-4">Contact HQ</div>
//             <ul className="space-y-4 text-white/70">
//               <li className="flex gap-3">
//                 <MapPin className="w-5 h-5 text-brand-magenta shrink-0 mt-0.5" />
//                 <span>
//                   {info.hq_address ||
//                     "Namdev Chowk, Civil Lines, Jalandhar, Punjab 144001"}
//                 </span>
//               </li>
//               <li className="flex gap-3 items-center">
//                 <Phone className="w-5 h-5 text-brand-magenta shrink-0" />
//                 <a
//                   href={`tel:${(info.hq_phone || "+917710661100").replace(/\s/g, "")}`}
//                   className="hover:text-brand-cyan"
//                 >
//                   {info.hq_phone || "+91 77106 61100"}
//                 </a>
//               </li>
//               <li className="flex gap-3 items-center">
//                 <Mail className="w-5 h-5 text-brand-magenta shrink-0" />
//                 <a
//                   href={`mailto:${info.hq_email || "hello@gameonindia.in"}`}
//                   className="hover:text-brand-cyan"
//                 >
//                   {info.hq_email || "hello@gameonindia.in"}
//                 </a>
//               </li>
//             </ul>
//             <div className="flex gap-3 mt-6">
//               <a
//                 href={info.instagram || "#"}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 data-testid="social-link-instagram"
//                 className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-magenta hover:text-brand-magenta transition"
//               >
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a
//                 href={info.facebook || "#"}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 data-testid="social-link-facebook"
//                 className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-magenta hover:text-brand-magenta transition"
//               >
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a
//                 href={info.youtube || "#"}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 data-testid="social-link-youtube"
//                 className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-magenta hover:text-brand-magenta transition"
//               >
//                 <Youtube className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-white/40 border-t border-white/5 pt-8">
//           <div>
//             © {new Date().getFullYear()} Game On India. All rights reserved.
//           </div>
//           <div className="flex gap-6">
//             <Link to="/admin/login" className="hover:text-white">
//               Admin
//             </Link>
//             <Link to="/privacy" className="hover:text-white">
//               Privacy
//             </Link>
//             <Link to="/terms" className="hover:text-white">
//               Terms
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import { subscribeNewsletter, fetchContactInfo, LOGO_URL } from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetchContactInfo()
      .then(setInfo)
      .catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await subscribeNewsletter({ email });
      toast.success("You're on the list. Let's play.");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      data-testid="site-footer"
      className="relative bg-brand-ink border-t border-white/5 pt-20 pb-10 goi-noise overflow-hidden"
    >
      {/* Full-footer background watermark — sized to actually fit within
          the viewport on mobile instead of overflowing and getting clipped */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[14vw] sm:text-[16vw] md:text-[18vw] leading-none tracking-tighter whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white/[0.06] to-white/[0.015]">
          GAME ON
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Mobile: 2 equal columns so Explore/Company sit side by side.
            Logo block and Contact HQ each span both columns (full width).
            Desktop: switches to the original 12-column layout. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-12 mb-16">
          <div className="col-span-2 md:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img
                src={LOGO_URL}
                alt="Game On India"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-white/60 max-w-sm mb-6">
              India's fastest-growing premium Family Entertainment Center.
              Arcade, VR, bowling, parties — one epic destination.
            </p>
            <form
              onSubmit={submit}
              className="flex gap-2 max-w-sm"
              data-testid="newsletter-form"
            >
              <input
                data-testid="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-cyan focus:outline-none"
              />
              <button
                type="submit"
                data-testid="newsletter-submit-btn"
                disabled={loading}
                className="goi-btn-primary text-sm !py-3 !px-5 disabled:opacity-50"
              >
                {loading ? "..." : "Join"}
              </button>
            </form>
          </div>

          <div className="md:col-span-2">
            <div className="goi-overline mb-4">Explore</div>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link to="/games" className="hover:text-brand-cyan">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-brand-cyan">
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-brand-cyan">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-cyan">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/upcoming-stores" className="hover:text-brand-cyan">
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="goi-overline mb-4">Company</div>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link to="/about-us" className="hover:text-brand-cyan">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="hover:text-brand-cyan">
                  Franchise
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-brand-cyan">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-cyan">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/branches" className="hover:text-brand-cyan">
                  Branches
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4">
            <div className="goi-overline mb-4">Contact HQ</div>
            <ul className="space-y-4 text-white/70">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand-magenta shrink-0 mt-0.5" />
                <span>
                  {info.hq_address ||
                    "Namdev Chowk, Civil Lines, Jalandhar, Punjab 144001"}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-brand-magenta shrink-0" />
                <a
                  href={`tel:${(info.hq_phone || "+917710661100").replace(/\s/g, "")}`}
                  className="hover:text-brand-cyan"
                >
                  {info.hq_phone || "+91 77106 61100"}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-brand-magenta shrink-0" />
                <a
                  href={`mailto:${info.hq_email || "hello@gameonindia.in"}`}
                  className="hover:text-brand-cyan"
                >
                  {info.hq_email || "hello@gameonindia.in"}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a
                href={info.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-link-instagram"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-magenta hover:text-brand-magenta transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={info.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-link-facebook"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-magenta hover:text-brand-magenta transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={info.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-link-youtube"
                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-magenta hover:text-brand-magenta transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-white/40 border-t border-white/5 pt-8">
          <div>
            © {new Date().getFullYear()} Game On India. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/admin/login" className="hover:text-white">
              Admin
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
