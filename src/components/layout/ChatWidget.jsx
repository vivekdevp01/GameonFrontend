// // import { useEffect, useState, useRef } from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   MessageCircle,
// //   X,
// //   Send,
// //   ArrowUpRight,
// //   Sparkles,
// //   RotateCcw,
// // } from "lucide-react";
// // import { fetchContactInfo, LOGO_URL } from "@/lib/api";

// // const FAQS = [
// //   {
// //     q: "What are your timings?",
// //     a: "Most Game On branches are open 11 AM – 11 PM, all days including weekends. Timings can vary slightly by branch, so it's worth checking your nearest branch page for exact hours.",
// //   },
// //   {
// //     q: "Where are your branches?",
// //     a: "We currently have branches in Jalandhar, Amritsar, Zirakpur, and Pune — with more cities on the way!",
// //     link: { to: "/branches", label: "View all branches" },
// //   },
// //   {
// //     q: "How do I book a birthday party?",
// //     a: "You can book directly on our Booking page in under a minute, or chat with our team on WhatsApp if you'd like a custom package.",
// //     link: { to: "/booking", label: "Book a party" },
// //   },
// //   {
// //     q: "What packages & pricing do you offer?",
// //     a: "We have Silver, Gold & Platinum party packages, plus pay-per-play arcade credits. Pricing varies slightly by branch — check current offers or chat with us for the latest rates.",
// //     link: { to: "/offers", label: "See offers" },
// //   },
// //   {
// //     q: "Do you have VR & bowling?",
// //     a: "Yes! Every branch features next-gen VR, bowling lanes, 60+ arcade cabinets, racing sims, and kids rides.",
// //     link: { to: "/games", label: "Explore games" },
// //   },
// //   {
// //     q: "I'm interested in a franchise",
// //     a: "We'd love to hear from you — our franchise team can walk you through investment details and next steps.",
// //     link: { to: "/franchise", label: "Franchise info" },
// //   },
// // ];

// // export default function ChatWidget() {
// //   const [number, setNumber] = useState("917710661100");
// //   const [entranceVisible, setEntranceVisible] = useState(false);
// //   const [greetingVisible, setGreetingVisible] = useState(false);
// //   const [open, setOpen] = useState(false);
// //   const [messages, setMessages] = useState([]); // { from: "bot" | "user", text, link? }
// //   const panelRef = useRef(null);

// //   useEffect(() => {
// //     fetchContactInfo()
// //       .then((d) => {
// //         if (d?.whatsapp_number) setNumber(d.whatsapp_number);
// //       })
// //       .catch(() => {});
// //   }, []);

// //   useEffect(() => {
// //     const t = setTimeout(() => setEntranceVisible(true), 800);
// //     // Auto-popup the greeting bubble a moment after entrance, to draw the eye
// //     const g = setTimeout(() => setGreetingVisible(true), 2200);
// //     return () => {
// //       clearTimeout(t);
// //       clearTimeout(g);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (open) {
// //       setGreetingVisible(false);
// //       if (messages.length === 0) {
// //         setMessages([
// //           {
// //             from: "bot",
// //             text: "Hey! 👋 I'm the Game On Assistant. Pick a question below, or jump straight to WhatsApp for anything else.",
// //           },
// //         ]);
// //       }
// //     }
// //   }, [open]);

// //   useEffect(() => {
// //     const onClick = (e) => {
// //       if (open && panelRef.current && !panelRef.current.contains(e.target))
// //         setOpen(false);
// //     };
// //     document.addEventListener("mousedown", onClick);
// //     return () => document.removeEventListener("mousedown", onClick);
// //   }, [open]);

// //   const askedQuestions = new Set(
// //     messages.filter((m) => m.from === "user").map((m) => m.text),
// //   );
// //   const remainingFaqs = FAQS.filter((f) => !askedQuestions.has(f.q));

// //   const askQuestion = (faq) => {
// //     setMessages((prev) => [
// //       ...prev,
// //       { from: "user", text: faq.q },
// //       { from: "bot", text: faq.a, link: faq.link },
// //     ]);
// //   };

// //   const resetChat = () => {
// //     setMessages([
// //       {
// //         from: "bot",
// //         text: "Hey! 👋 I'm the Game On Assistant. Pick a question below, or jump straight to WhatsApp for anything else.",
// //       },
// //     ]);
// //   };

// //   const waMessage = encodeURIComponent(
// //     "Hi Game On India! 👋 I'd love to know more about pricing, party packages, and available slots.",
// //   );
// //   const waLink = `https://wa.me/${number}?text=${waMessage}`;

// //   return (
// //     <div
// //       className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
// //       data-testid="chat-widget-root"
// //     >
// //       {/* Chat panel */}
// //       {open && (
// //         <div
// //           ref={panelRef}
// //           className="w-[92vw] max-w-sm goi-glass rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 flex flex-col animate-[fadeUp_0.25s_ease] mb-1"
// //           style={{ maxHeight: "min(70vh, 560px)" }}
// //           data-testid="chat-widget-panel"
// //         >
// //           {/* Header */}
// //           <div className="relative flex items-center gap-3 px-5 py-4 bg-brand-ink border-b border-white/10 shrink-0">
// //             <div className="absolute inset-0 goi-grid-bg opacity-20" />
// //             <div className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
// //               <img
// //                 src={LOGO_URL}
// //                 alt="Game On India"
// //                 className="w-7 h-7 object-contain"
// //               />
// //             </div>
// //             <div className="relative flex-1 min-w-0">
// //               <div className="font-display font-bold text-sm text-white">
// //                 Game On Assistant
// //               </div>
// //               <div className="flex items-center gap-1.5">
// //                 <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
// //                 <span className="text-[11px] text-brand-lime font-medium">
// //                   Usually replies instantly
// //                 </span>
// //               </div>
// //             </div>
// //             <button
// //               onClick={() => setOpen(false)}
// //               data-testid="chat-widget-close-btn"
// //               className="relative w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
// //               aria-label="Close chat"
// //             >
// //               <X className="w-4 h-4" />
// //             </button>
// //           </div>

// //           {/* Messages */}
// //           <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
// //             {messages.map((m, i) => (
// //               <div
// //                 key={i}
// //                 className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
// //               >
// //                 <div
// //                   className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
// //                     m.from === "user"
// //                       ? "bg-brand-magenta text-white rounded-br-sm"
// //                       : "bg-white/5 border border-white/10 text-white/80 rounded-bl-sm"
// //                   }`}
// //                 >
// //                   {m.text}
// //                   {m.link && (
// //                     <Link
// //                       to={m.link.to}
// //                       onClick={() => setOpen(false)}
// //                       className="flex items-center gap-1 mt-2 text-brand-cyan hover:text-white text-xs font-bold tracking-wide"
// //                     >
// //                       {m.link.label} <ArrowUpRight className="w-3 h-3" />
// //                     </Link>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Quick-reply chips */}
// //           <div className="px-4 pb-3 shrink-0">
// //             {remainingFaqs.length > 0 ? (
// //               <div className="flex flex-wrap gap-2 mb-3">
// //                 {remainingFaqs.map((f) => (
// //                   <button
// //                     key={f.q}
// //                     onClick={() => askQuestion(f)}
// //                     data-testid={`chat-faq-${f.q
// //                       .slice(0, 12)
// //                       .toLowerCase()
// //                       .replace(/[^a-z]+/g, "-")}`}
// //                     className="text-xs px-3 py-2 rounded-full border border-white/15 text-white/70 hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all"
// //                   >
// //                     {f.q}
// //                   </button>
// //                 ))}
// //               </div>
// //             ) : (
// //               <button
// //                 onClick={resetChat}
// //                 data-testid="chat-widget-reset-btn"
// //                 className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white mb-3 transition"
// //               >
// //                 <RotateCcw className="w-3 h-3" /> Ask something else
// //               </button>
// //             )}

// //             {/* WhatsApp handoff — always visible */}
// //             <a
// //               href={waLink}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               data-testid="chat-widget-whatsapp-handoff"
// //               className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] text-white text-sm font-bold py-3 hover:brightness-110 transition"
// //             >
// //               <Send className="w-4 h-4" /> Continue on WhatsApp
// //             </a>
// //           </div>
// //         </div>
// //       )}

// //       {/* Auto-popup greeting bubble */}
// //       {!open && greetingVisible && (
// //         <div
// //           className="goi-glass rounded-2xl px-4 py-3 max-w-[220px] shadow-xl shadow-black/50 border border-white/10 relative animate-[fadeUp_0.3s_ease]"
// //           data-testid="chat-widget-greeting-bubble"
// //         >
// //           <button
// //             onClick={() => setGreetingVisible(false)}
// //             className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-ink border border-white/20 flex items-center justify-center text-white/60 hover:text-white"
// //             aria-label="Dismiss"
// //           >
// //             <X className="w-3 h-3" />
// //           </button>
// //           <p className="text-xs text-white/80 leading-relaxed">
// //             👋 <span className="font-semibold text-white">Need help?</span> Ask
// //             me about timings, pricing, or booking a party!
// //           </p>
// //         </div>
// //       )}

// //       {/* Floating action button */}
// //       <button
// //         onClick={() => setOpen((v) => !v)}
// //         data-testid="chat-widget-toggle-btn"
// //         className={`group relative flex items-center justify-center transition-all duration-500 ease-out ${
// //           entranceVisible
// //             ? "opacity-100 translate-y-0 scale-100"
// //             : "opacity-0 translate-y-4 scale-75"
// //         }`}
// //         aria-label={open ? "Close chat" : "Chat with Game On India"}
// //       >
// //         {!open && (
// //           <span className="absolute inset-0 rounded-full bg-brand-magenta animate-ping opacity-60 [animation-duration:2.2s]" />
// //         )}
// //         <span
// //           className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
// //             open
// //               ? "bg-brand-cyan opacity-60"
// //               : "bg-brand-magenta opacity-50 group-hover:opacity-80 group-hover:blur-lg"
// //           }`}
// //         />
// //         <span
// //           className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-active:scale-95 transition-all duration-300 ${
// //             open
// //               ? "bg-brand-cyan shadow-brand-cyan/40"
// //               : "bg-brand-magenta shadow-brand-magenta/40"
// //           }`}
// //         >
// //           {open ? (
// //             <X className="w-6 h-6 text-white" />
// //           ) : (
// //             <>
// //               <MessageCircle className="w-6 h-6 text-white group-hover:rotate-[8deg] transition-transform duration-300" />
// //               <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 drop-shadow-[0_0_4px_rgba(250,204,21,0.8)]" />
// //             </>
// //           )}
// //         </span>

// //         {!open && (
// //           <span className="absolute right-full mr-3 whitespace-nowrap goi-glass px-3 py-1.5 rounded-full text-xs font-medium hidden md:flex items-center gap-1.5 opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
// //             <span className="w-1.5 h-1.5 rounded-full bg-brand-magenta animate-pulse" />
// //             Need help?
// //           </span>
// //         )}
// //       </button>
// //     </div>
// //   );
// // }
// import { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import {
//   X,
//   Send,
//   ArrowUpRight,
//   RotateCcw,
//   MessageCircleQuestion,
// } from "lucide-react";
// import { fetchContactInfo, LOGO_URL } from "@/lib/api";

// const FAQS = [
//   {
//     q: "What are your timings?",
//     keywords: ["time", "timing", "open", "close", "hours"],
//     a: "Most Game On branches are open 11 AM – 11 PM, all days including weekends. Timings can vary slightly by branch, so it's worth checking your nearest branch page for exact hours.",
//   },
//   {
//     q: "Where are your branches?",
//     keywords: ["where", "location", "branch", "address", "near"],
//     a: "We currently have branches in Jalandhar, Amritsar, Zirakpur, and Pune — with more cities on the way!",
//     link: { to: "/branches", label: "View all branches" },
//   },
//   {
//     q: "How do I book a birthday party?",
//     keywords: ["party", "birthday", "book", "booking", "reserve"],
//     a: "You can book directly on our Booking page in under a minute, or chat with our team on WhatsApp if you'd like a custom package.",
//     link: { to: "/booking", label: "Book a party" },
//   },
//   {
//     q: "What packages & pricing do you offer?",
//     keywords: ["price", "pricing", "cost", "package", "rate", "fee"],
//     a: "We have Silver, Gold & Platinum party packages, plus pay-per-play arcade credits. Pricing varies slightly by branch — check current offers or chat with us for the latest rates.",
//     link: { to: "/offers", label: "See offers" },
//   },
//   {
//     q: "Do you have VR & bowling?",
//     keywords: ["vr", "virtual reality", "bowling", "games", "arcade", "ride"],
//     a: "Yes! Every branch features next-gen VR, bowling lanes, 60+ arcade cabinets, racing sims, and kids rides.",
//     link: { to: "/games", label: "Explore games" },
//   },
//   {
//     q: "Is there a minimum age for VR or rides?",
//     keywords: ["age", "minor", "kid", "child", "height", "weight"],
//     a: "Some attractions — like VR, bowling, and select rides — have minimum age, height, or weight requirements for safety. Our staff will guide you on what's suitable for your group at check-in.",
//   },
//   {
//     q: "Can you host school or corporate groups?",
//     keywords: ["school", "corporate", "group", "team", "event", "office"],
//     a: "Absolutely — we regularly host school trips and corporate team events with custom group packages. Reach out on WhatsApp with your group size and preferred date and we'll put a plan together.",
//   },
//   {
//     q: "What's your cancellation policy?",
//     keywords: ["cancel", "refund", "reschedule", "postpone"],
//     a: "Cancellations or rescheduling made at least 48 hours before your slot are generally accommodated. Deposit refundability depends on the package — see our full Terms for details.",
//     link: { to: "/terms", label: "Read full terms" },
//   },
//   {
//     q: "I'm interested in a franchise",
//     keywords: ["franchise", "invest", "partner", "business", "own a branch"],
//     a: "We'd love to hear from you — our franchise team can walk you through investment details and next steps.",
//     link: { to: "/franchise", label: "Franchise info" },
//   },
// ];

// const FALLBACK_ANSWER =
//   "I don't have a ready answer for that one yet — but our team on WhatsApp can help right away. Tap below to continue the conversation there.";

// export default function ChatWidget() {
//   const [number, setNumber] = useState("917710661100");
//   const [entranceVisible, setEntranceVisible] = useState(false);
//   const [greetingVisible, setGreetingVisible] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([]); // { from: "bot" | "user", text, link? }
//   const [inputValue, setInputValue] = useState("");
//   const panelRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     fetchContactInfo()
//       .then((d) => {
//         if (d?.whatsapp_number) setNumber(d.whatsapp_number);
//       })
//       .catch(() => {});
//   }, []);

//   useEffect(() => {
//     const t = setTimeout(() => setEntranceVisible(true), 800);
//     const g = setTimeout(() => setGreetingVisible(true), 2200);
//     return () => {
//       clearTimeout(t);
//       clearTimeout(g);
//     };
//   }, []);

//   useEffect(() => {
//     if (open) {
//       setGreetingVisible(false);
//       if (messages.length === 0) {
//         setMessages([
//           {
//             from: "bot",
//             text: "Hey! 👋 I'm the Game On Assistant. Tap a question below, or type your own — I'll do my best to help.",
//           },
//         ]);
//       }
//     }
//   }, [open]);

//   useEffect(() => {
//     const onClick = (e) => {
//       if (open && panelRef.current && !panelRef.current.contains(e.target))
//         setOpen(false);
//     };
//     document.addEventListener("mousedown", onClick);
//     return () => document.removeEventListener("mousedown", onClick);
//   }, [open]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//     });
//   }, [messages, open]);

//   const askedQuestions = new Set(
//     messages.filter((m) => m.from === "user").map((m) => m.text),
//   );
//   const remainingFaqs = FAQS.filter((f) => !askedQuestions.has(f.q));

//   const askQuestion = (faq) => {
//     setMessages((prev) => [
//       ...prev,
//       { from: "user", text: faq.q },
//       { from: "bot", text: faq.a, link: faq.link },
//     ]);
//   };

//   const matchFreeText = (text) => {
//     const lower = text.toLowerCase();
//     return FAQS.find((f) => f.keywords.some((k) => lower.includes(k)));
//   };

//   const handleSend = () => {
//     const trimmed = inputValue.trim();
//     if (!trimmed) return;
//     const match = matchFreeText(trimmed);
//     setMessages((prev) => [
//       ...prev,
//       { from: "user", text: trimmed },
//       match
//         ? { from: "bot", text: match.a, link: match.link }
//         : { from: "bot", text: FALLBACK_ANSWER, whatsappFallback: true },
//     ]);
//     setInputValue("");
//   };

//   const resetChat = () => {
//     setMessages([
//       {
//         from: "bot",
//         text: "Hey! 👋 I'm the Game On Assistant. Tap a question below, or type your own — I'll do my best to help.",
//       },
//     ]);
//   };

//   const buildWaLink = (customText) => {
//     const base = customText
//       ? `I have a question: "${customText}"`
//       : "Hi Game On India! 👋 I'd love to know more about pricing, party packages, and available slots.";
//     return `https://wa.me/${number}?text=${encodeURIComponent(base)}`;
//   };

//   return (
//     <div
//       className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3"
//       style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       data-testid="chat-widget-root"
//     >
//       {/* Chat panel */}
//       {open && (
//         <div
//           ref={panelRef}
//           className="w-[92vw] max-w-sm goi-glass rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 flex flex-col animate-[fadeUp_0.25s_ease]"
//           style={{ maxHeight: "min(75dvh, 600px)" }}
//           data-testid="chat-widget-panel"
//         >
//           {/* Header */}
//           <div className="relative flex items-center gap-3 px-5 py-4 bg-brand-ink border-b border-white/10 shrink-0">
//             <div className="absolute inset-0 goi-grid-bg opacity-20" />
//             <div className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
//               <img
//                 src={LOGO_URL}
//                 alt="Game On India"
//                 className="w-7 h-7 object-contain"
//               />
//             </div>
//             <div className="relative flex-1 min-w-0">
//               <div className="font-display font-bold text-sm text-white">
//                 Game On Assistant
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
//                 <span className="text-[11px] text-brand-lime font-medium">
//                   Usually replies instantly
//                 </span>
//               </div>
//             </div>
//             <button
//               onClick={() => setOpen(false)}
//               data-testid="chat-widget-close-btn"
//               className="relative w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
//               aria-label="Close chat"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Messages — scrollable, takes remaining space */}
//           <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
//                     m.from === "user"
//                       ? "bg-brand-magenta text-white rounded-br-sm"
//                       : "bg-white/5 border border-white/10 text-white/80 rounded-bl-sm"
//                   }`}
//                 >
//                   {m.text}
//                   {m.link && (
//                     <Link
//                       to={m.link.to}
//                       onClick={() => setOpen(false)}
//                       className="flex items-center gap-1 mt-2 text-brand-cyan hover:text-white text-xs font-bold tracking-wide"
//                     >
//                       {m.link.label} <ArrowUpRight className="w-3 h-3" />
//                     </Link>
//                   )}
//                   {m.whatsappFallback && (
//                     <a
//                       href={buildWaLink(messages[i - 1]?.text)}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-1 mt-2 text-[#25D366] hover:text-white text-xs font-bold tracking-wide"
//                     >
//                       Ask on WhatsApp <ArrowUpRight className="w-3 h-3" />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Quick-reply chips */}
//           <div className="px-4 pt-1 shrink-0 max-h-24 overflow-y-auto">
//             {remainingFaqs.length > 0 ? (
//               <div className="flex flex-wrap gap-2 pb-2">
//                 {remainingFaqs.map((f) => (
//                   <button
//                     key={f.q}
//                     onClick={() => askQuestion(f)}
//                     data-testid={`chat-faq-${f.q
//                       .slice(0, 12)
//                       .toLowerCase()
//                       .replace(/[^a-z]+/g, "-")}`}
//                     className="text-xs px-3 py-2 rounded-full border border-white/15 text-white/70 hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all whitespace-nowrap"
//                   >
//                     {f.q}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <button
//                 onClick={resetChat}
//                 data-testid="chat-widget-reset-btn"
//                 className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white pb-2 transition"
//               >
//                 <RotateCcw className="w-3 h-3" /> Start over
//               </button>
//             )}
//           </div>

//           {/* Text input */}
//           <div className="px-4 pb-3 pt-1 shrink-0 border-t border-white/5">
//             <div className="flex items-center gap-2 mb-2">
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Type your question..."
//                 data-testid="chat-widget-text-input"
//                 className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-brand-cyan focus:outline-none"
//               />
//               <button
//                 onClick={handleSend}
//                 data-testid="chat-widget-send-btn"
//                 disabled={!inputValue.trim()}
//                 className="w-10 h-10 shrink-0 rounded-full bg-brand-magenta flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition"
//                 aria-label="Send message"
//               >
//                 <Send className="w-4 h-4" />
//               </button>
//             </div>

//             {/* WhatsApp handoff — always visible */}
//             <a
//               href={buildWaLink()}
//               target="_blank"
//               rel="noopener noreferrer"
//               data-testid="chat-widget-whatsapp-handoff"
//               className="flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] text-white text-sm font-bold py-2.5 hover:brightness-110 transition"
//             >
//               <Send className="w-4 h-4" /> Continue on WhatsApp
//             </a>
//           </div>
//         </div>
//       )}

//       {/* Auto-popup greeting bubble */}
//       {!open && greetingVisible && (
//         <div
//           className="goi-glass rounded-2xl px-4 py-3 max-w-[220px] shadow-xl shadow-black/50 border border-white/10 relative animate-[fadeUp_0.3s_ease]"
//           data-testid="chat-widget-greeting-bubble"
//         >
//           <button
//             onClick={() => setGreetingVisible(false)}
//             className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-ink border border-white/20 flex items-center justify-center text-white/60 hover:text-white"
//             aria-label="Dismiss"
//           >
//             <X className="w-3 h-3" />
//           </button>
//           <p className="text-xs text-white/80 leading-relaxed">
//             👋 <span className="font-semibold text-white">Need help?</span> Ask
//             me about timings, pricing, or booking a party!
//           </p>
//         </div>
//       )}

//       {/* Floating action button — comic-style "HELP" speech bubble */}
//       <button
//         onClick={() => setOpen((v) => !v)}
//         data-testid="chat-widget-toggle-btn"
//         className={`group relative flex items-center justify-center transition-all duration-500 ease-out ${
//           entranceVisible
//             ? "opacity-100 translate-y-0 scale-100"
//             : "opacity-0 translate-y-4 scale-75"
//         }`}
//         aria-label={open ? "Close chat" : "Get help"}
//       >
//         {!open && (
//           <span className="absolute inset-0 rounded-[45%] bg-brand-magenta animate-ping opacity-50 [animation-duration:2.2s]" />
//         )}
//         <span
//           className={`absolute inset-0 rounded-[45%] blur-md transition-all duration-300 ${
//             open
//               ? "bg-brand-cyan opacity-60"
//               : "bg-brand-magenta opacity-50 group-hover:opacity-80 group-hover:blur-lg"
//           }`}
//         />

//         {open ? (
//           <span className="relative w-14 h-14 rounded-full bg-brand-cyan flex items-center justify-center shadow-2xl shadow-brand-cyan/40 group-hover:scale-110 group-active:scale-95 transition-all duration-300">
//             <X className="w-6 h-6 text-white" />
//           </span>
//         ) : (
//           // Speech-bubble shaped button, comic-sticker style, with a tail
//           <span className="relative flex flex-col items-center group-hover:scale-110 group-active:scale-95 transition-all duration-300">
//             <span className="relative flex items-center gap-1.5 px-5 py-3 rounded-[45%_45%_45%_8px_/_60%_60%_60%_15%] bg-gradient-to-br from-brand-magenta to-pink-600 shadow-2xl shadow-brand-magenta/50 border-2 border-white/20">
//               <MessageCircleQuestion className="w-5 h-5 text-white" />
//               <span className="font-display font-black text-sm uppercase tracking-wide text-white">
//                 Help
//               </span>
//             </span>
//           </span>
//         )}

//         {!open && (
//           <span className="absolute right-full mr-3 whitespace-nowrap goi-glass px-3 py-1.5 rounded-full text-xs font-medium hidden md:flex items-center gap-1.5 opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
//             <span className="w-1.5 h-1.5 rounded-full bg-brand-magenta animate-pulse" />
//             Need help?
//           </span>
//         )}
//       </button>
//     </div>
//   );
// }
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Send,
  ArrowUpRight,
  RotateCcw,
  MessageCircleQuestion,
  Phone,
} from "lucide-react";
import { fetchContactInfo, LOGO_URL } from "@/lib/api";

const FAQS = [
  {
    q: "What are your timings?",
    keywords: ["time", "timing", "open", "close", "hours"],
    a: "Most Game On branches are open 11 AM – 11 PM, all days including weekends. Timings can vary slightly by branch, so it's worth checking your nearest branch page for exact hours.",
  },
  {
    q: "Where are your branches?",
    keywords: ["where", "location", "branch", "address", "near"],
    a: "We currently have branches in Jalandhar, Amritsar, Zirakpur, and Pune — with more cities on the way!",
    link: { to: "/branches", label: "View all branches" },
  },
  {
    q: "How do I book a birthday party?",
    keywords: ["party", "birthday", "book", "booking", "reserve"],
    a: "You can book directly on our Booking page in under a minute, or chat with our team on WhatsApp if you'd like a custom package.",
    link: { to: "/booking", label: "Book a party" },
  },
  {
    q: "What packages & pricing do you offer?",
    keywords: ["price", "pricing", "cost", "package", "rate", "fee"],
    a: "We have Silver, Gold & Platinum party packages, plus pay-per-play arcade credits. Pricing varies slightly by branch — check current offers or chat with us for the latest rates.",
    link: { to: "/offers", label: "See offers" },
  },
  {
    q: "Do you have VR & bowling?",
    keywords: ["vr", "virtual reality", "bowling", "games", "arcade", "ride"],
    a: "Yes! Every branch features next-gen VR, bowling lanes, 60+ arcade cabinets, racing sims, and kids rides.",
    link: { to: "/games", label: "Explore games" },
  },
  {
    q: "Is there a minimum age for VR or rides?",
    keywords: ["age", "minor", "kid", "child", "height", "weight"],
    a: "Some attractions — like VR, bowling, and select rides — have minimum age, height, or weight requirements for safety. Our staff will guide you on what's suitable for your group at check-in.",
  },
  {
    q: "Can you host school or corporate groups?",
    keywords: ["school", "corporate", "group", "team", "event", "office"],
    a: "Absolutely — we regularly host school trips and corporate team events with custom group packages. Reach out and we'll put a plan together.",
  },
  {
    q: "What's your cancellation policy?",
    keywords: ["cancel", "refund", "reschedule", "postpone"],
    a: "Cancellations or rescheduling made at least 48 hours before your slot are generally accommodated. Deposit refundability depends on the package — see our full Terms for details.",
    link: { to: "/terms", label: "Read full terms" },
  },
  {
    q: "I'm interested in a franchise",
    keywords: ["franchise", "invest", "partner", "business", "own a branch"],
    a: "We'd love to hear from you — our franchise team can walk you through investment details and next steps.",
    link: { to: "/franchise", label: "Franchise info" },
  },
];

const FALLBACK_ANSWER =
  "I don't have a ready answer for that one yet — but you can reach our team directly below.";

export default function ChatWidget() {
  const [number, setNumber] = useState("917710661100");
  const [entranceVisible, setEntranceVisible] = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { from: "bot" | "user", text, link? }
  const [inputValue, setInputValue] = useState("");
  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchContactInfo()
      .then((d) => {
        if (d?.whatsapp_number) setNumber(d.whatsapp_number);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEntranceVisible(true), 800);
    const g = setTimeout(() => setGreetingVisible(true), 2200);
    return () => {
      clearTimeout(t);
      clearTimeout(g);
    };
  }, []);

  const displayNumber = `+91 ${number.slice(-10, -5)} ${number.slice(-5)}`;

  useEffect(() => {
    if (open) {
      setGreetingVisible(false);
      if (messages.length === 0) {
        setMessages([
          {
            from: "bot",
            text: `Hey! 👋 I'm the Game On Assistant. Tap a question below, type your own, or call us directly on ${displayNumber}.`,
          },
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const onClick = (e) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, open]);

  const askedQuestions = new Set(
    messages.filter((m) => m.from === "user").map((m) => m.text),
  );
  const remainingFaqs = FAQS.filter((f) => !askedQuestions.has(f.q));

  const askQuestion = (faq) => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: faq.q },
      { from: "bot", text: faq.a, link: faq.link },
    ]);
  };

  const matchFreeText = (text) => {
    const lower = text.toLowerCase();
    return FAQS.find((f) => f.keywords.some((k) => lower.includes(k)));
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const match = matchFreeText(trimmed);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      match
        ? { from: "bot", text: match.a, link: match.link }
        : { from: "bot", text: FALLBACK_ANSWER, contactFallback: true },
    ]);
    setInputValue("");
  };

  const resetChat = () => {
    setMessages([
      {
        from: "bot",
        text: `Hey! 👋 I'm the Game On Assistant. Tap a question below, type your own, or call us directly on ${displayNumber}.`,
      },
    ]);
  };

  const buildWaLink = (customText) => {
    const base = customText
      ? `I have a question: "${customText}"`
      : "Hi Game On India! 👋 I'd love to know more about pricing, party packages, and available slots.";
    return `https://wa.me/${number}?text=${encodeURIComponent(base)}`;
  };

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      data-testid="chat-widget-root"
    >
      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="w-[92vw] max-w-sm goi-glass rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 flex flex-col animate-[fadeUp_0.25s_ease]"
          style={{ maxHeight: "min(75dvh, 600px)" }}
          data-testid="chat-widget-panel"
        >
          {/* Header */}
          <div className="relative flex items-center gap-3 px-5 py-4 bg-brand-ink border-b border-white/10 shrink-0">
            <div className="absolute inset-0 goi-grid-bg opacity-20" />
            <div className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={LOGO_URL}
                alt="Game On India"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="relative flex-1 min-w-0">
              <div className="font-display font-bold text-sm text-white">
                Game On Assistant
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                <span className="text-[11px] text-brand-lime font-medium">
                  Usually replies instantly
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              data-testid="chat-widget-close-btn"
              className="relative w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages — scrollable, takes remaining space */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-brand-magenta text-white rounded-br-sm"
                      : "bg-white/5 border border-white/10 text-white/80 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                  {m.link && (
                    <Link
                      to={m.link.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-1 mt-2 text-brand-cyan hover:text-white text-xs font-bold tracking-wide"
                    >
                      {m.link.label} <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  )}
                  {m.contactFallback && (
                    <div className="flex flex-col gap-1.5 mt-2">
                      <a
                        href={`tel:${number}`}
                        className="flex items-center gap-1 text-brand-cyan hover:text-white text-xs font-bold tracking-wide"
                      >
                        <Phone className="w-3 h-3" /> Call {displayNumber}
                      </a>
                      <a
                        href={buildWaLink(messages[i - 1]?.text)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#25D366] hover:text-white text-xs font-bold tracking-wide"
                      >
                        <ArrowUpRight className="w-3 h-3" /> Ask on WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-reply chips */}
          <div className="px-4 pt-1 shrink-0 max-h-24 overflow-y-auto">
            {remainingFaqs.length > 0 ? (
              <div className="flex flex-wrap gap-2 pb-2">
                {remainingFaqs.map((f) => (
                  <button
                    key={f.q}
                    onClick={() => askQuestion(f)}
                    data-testid={`chat-faq-${f.q
                      .slice(0, 12)
                      .toLowerCase()
                      .replace(/[^a-z]+/g, "-")}`}
                    className="text-xs px-3 py-2 rounded-full border border-white/15 text-white/70 hover:border-brand-cyan hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all whitespace-nowrap"
                  >
                    {f.q}
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={resetChat}
                data-testid="chat-widget-reset-btn"
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white pb-2 transition"
              >
                <RotateCcw className="w-3 h-3" /> Start over
              </button>
            )}
          </div>

          {/* Text input */}
          <div className="px-4 pb-3 pt-1 shrink-0 border-t border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your question..."
                data-testid="chat-widget-text-input"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-brand-cyan focus:outline-none"
              />
              <button
                onClick={handleSend}
                data-testid="chat-widget-send-btn"
                disabled={!inputValue.trim()}
                className="w-10 h-10 shrink-0 rounded-full bg-brand-magenta flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Call + WhatsApp — always visible, side by side */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${number}`}
                data-testid="chat-widget-call-handoff"
                className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 text-white text-xs sm:text-sm font-bold py-2.5 hover:border-brand-cyan hover:text-brand-cyan transition"
              >
                <Phone className="w-3.5 h-3.5" /> Call Us
              </a>
              <a
                href={buildWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="chat-widget-whatsapp-handoff"
                className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-bold py-2.5 hover:brightness-110 transition"
              >
                <Send className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Auto-popup greeting bubble */}
      {!open && greetingVisible && (
        <div
          className="goi-glass rounded-2xl px-4 py-3 max-w-[220px] shadow-xl shadow-black/50 border border-white/10 relative animate-[fadeUp_0.3s_ease]"
          data-testid="chat-widget-greeting-bubble"
        >
          <button
            onClick={() => setGreetingVisible(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-ink border border-white/20 flex items-center justify-center text-white/60 hover:text-white"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-xs text-white/80 leading-relaxed">
            👋 <span className="font-semibold text-white">Need help?</span> Ask
            me about timings, pricing, or booking a party!
          </p>
        </div>
      )}

      {/* Floating action button — clean glowing pill, matching reference */}
      <button
        onClick={() => setOpen((v) => !v)}
        data-testid="chat-widget-toggle-btn"
        className={`group relative flex items-center justify-center transition-all duration-500 ease-out ${
          entranceVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-75"
        }`}
        aria-label={open ? "Close chat" : "Get help"}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-brand-magenta animate-ping opacity-40 [animation-duration:2.2s]" />
        )}

        {open ? (
          <span className="relative w-14 h-14 rounded-full bg-brand-cyan flex items-center justify-center shadow-[0_0_30px_-4px_rgba(0,240,255,0.7)] group-hover:scale-110 group-active:scale-95 transition-all duration-300">
            <X className="w-6 h-6 text-white" />
          </span>
        ) : (
          // Clean glowing pill — icon + label, always visible (not hover-only)
          <span className="relative flex items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-brand-magenta shadow-[0_0_35px_-2px_rgba(255,0,85,0.85)] group-hover:shadow-[0_0_45px_0px_rgba(255,0,85,1)] group-hover:scale-105 group-active:scale-95 transition-all duration-300">
            <MessageCircleQuestion className="w-5 h-5 text-white" />
            <span className="font-display font-black text-sm uppercase tracking-wider text-white">
              Help
            </span>
          </span>
        )}
      </button>
    </div>
  );
}
