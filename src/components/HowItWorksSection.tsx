"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExploreStepsIcon,
  ActivateQRIcon,
  RedeemScanIcon,
  ShareStarsIcon,
} from "./icons";
import { useTranslation } from "@/i18n/useTranslation";
import { filterExplorarVenues, type ExplorarActiveFilter } from "@/lib/explorar-demo";

/* ── Step data ─────────────────────────────────────────────────────── */
type StepId = "explorar" | "activar" | "canjear" | "compartir";

const STEP_IDS: StepId[] = ["explorar", "activar", "canjear", "compartir"];
const STEP_LABELS: Record<StepId, string> = {
  explorar: "Explorar",
  activar: "Activar",
  canjear: "Canjear",
  compartir: "Compartir",
};

/* ── Right-side illustration panels ───────────────────────────────── */

function ExplorarPanel() {
  const { dict } = useTranslation();
  const p = dict.howItWorks.panels.explorar;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPromoIndex, setSelectedPromoIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<ExplorarActiveFilter>({ type: "all" });

  const filteredVenues = useMemo(
    () => filterExplorarVenues(p.venues, activeFilter),
    [p.venues, activeFilter]
  );

  const selected = p.venues.find((v) => v.id === selectedId) ?? null;
  const selectedPromo =
    selected && selectedPromoIndex !== null
      ? (selected.discounts[selectedPromoIndex] ?? null)
      : null;

  const chipBase =
    "text-xs font-medium px-3 py-1 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7161ef]/35";
  const chipInactive = "border-[#7161ef]/30 text-[#7161ef] bg-[#7161ef]/5 hover:bg-[#7161ef]/10";
  const chipActive = "border-[#7161ef] bg-[#7161ef] text-white shadow-sm";

  return (
    <div
      className="min-h-[70vh] lg:min-h-screen flex items-center justify-center rounded-3xl overflow-hidden my-8"
      style={{
        background:
          "radial-gradient(900px 520px at 22% 18%, rgba(113,97,239,0.16) 0%, rgba(113,97,239,0.00) 58%), radial-gradient(740px 460px at 86% 78%, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.00) 55%), linear-gradient(135deg, rgba(113,97,239,0.10) 0%, rgba(255,255,255,0.00) 52%, rgba(113,97,239,0.05) 100%)",
      }}
    >
      <div
        className="rounded-2xl p-px mx-4 w-full max-w-sm shadow-[0_18px_55px_rgba(17,24,39,0.10)]"
        style={{
          background:
            "radial-gradient(140px 120px at 18% 10%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.00) 65%), linear-gradient(135deg, rgba(113,97,239,0.22) 0%, rgba(167,139,250,0.14) 32%, rgba(255,255,255,0.00) 78%)",
        }}
      >
        <div className="bg-white/92 backdrop-blur rounded-2xl p-5">
          {selected && selectedPromo ? (
            <div className="animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setSelectedPromoIndex(null)}
                className="flex items-center gap-1 text-[12px] font-semibold text-[#7161ef] hover:text-[#5d4edf] mb-3 -ml-1 px-1 py-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7161ef]/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden />
                {p.backToPromotions}
              </button>
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-[15px] font-semibold text-[#1a1a1a] leading-snug">{selectedPromo.title}</h3>
                <span className="text-[11px] font-bold text-white bg-[#7161ef] rounded-full px-2.5 py-0.5 shrink-0">
                  {selectedPromo.badge}
                </span>
              </div>
              <div className="flex flex-col gap-4" role="region" aria-label={selectedPromo.title}>
                <div>
                  <p className="text-[10px] font-semibold tracking-wide uppercase text-[#6b7280] mb-1.5">
                    {p.promoConditionsHeading}
                  </p>
                  <p className="text-[12px] text-[#374151] leading-relaxed">{selectedPromo.conditions}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-wide uppercase text-[#6b7280] mb-1.5">
                    {p.promoValidityHeading}
                  </p>
                  <p className="text-[12px] text-[#374151] leading-relaxed">{selectedPromo.validity}</p>
                </div>
              </div>
            </div>
          ) : selected ? (
            <div className="animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => {
                  setSelectedId(null);
                  setSelectedPromoIndex(null);
                }}
                className="flex items-center gap-1 text-[12px] font-semibold text-[#7161ef] hover:text-[#5d4edf] mb-3 -ml-1 px-1 py-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7161ef]/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden />
                {p.backToList}
              </button>
              <p className="text-[11px] font-semibold tracking-wide uppercase text-[#6b7280] mb-1">
                {p.discountsTitle}
              </p>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f3f4f6]">
                <div
                  className="w-9 h-9 rounded-lg bg-[#f3f4f6] shrink-0 flex items-center justify-center text-lg leading-none"
                  aria-hidden
                >
                  {selected.emoji}
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-[#1a1a1a] leading-tight">{selected.name}</p>
                  <p className="text-[11px] text-[#9ca3af]">{selected.categoryLine}</p>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0" aria-live="polite">
                {selected.discounts.map((d, i) => (
                  <li key={`${selected.id}-promo-${i}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedPromoIndex(i)}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-xl border text-left w-full transition-colors",
                        "border-[#f3f4f6] bg-[#fafafa]/80 hover:border-[#7161ef]/35 hover:bg-[#7161ef]/[0.04]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7161ef]/35"
                      )}
                      aria-label={`${p.choosePromoAria} ${d.title}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-[#1a1a1a] leading-snug">{d.title}</p>
                        <p className="text-[11px] text-[#6b7280] mt-0.5 line-clamp-2">{d.conditions}</p>
                      </div>
                      <span className="text-[11px] font-bold text-white bg-[#7161ef] rounded-full px-2 py-0.5 shrink-0 self-center">
                        {d.badge}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="animate-in fade-in duration-200">
              <div className="flex flex-wrap gap-2 mb-4" role="toolbar" aria-label={p.filterToolbarAria}>
                <button
                  type="button"
                  onClick={() => setActiveFilter({ type: "all" })}
                  className={cn(chipBase, activeFilter.type === "all" ? chipActive : chipInactive)}
                  aria-pressed={activeFilter.type === "all"}
                >
                  {p.filterAllLabel}
                </button>
                {p.filterCategories.map((c) => {
                  const pressed =
                    activeFilter.type === "category" && activeFilter.key === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setActiveFilter({ type: "category", key: c.key })}
                      className={cn(chipBase, pressed ? chipActive : chipInactive)}
                      aria-pressed={pressed}
                    >
                      {c.label}
                    </button>
                  );
                })}
                {p.filterLocations.map((loc) => {
                  const pressed =
                    activeFilter.type === "location" && activeFilter.key === loc.key;
                  const ariaLabel = `${loc.label}, ${p.filterWithinKmAria.replace("{n}", String(loc.maxKm))}`;
                  return (
                    <button
                      key={loc.key}
                      type="button"
                      onClick={() =>
                        setActiveFilter({ type: "location", key: loc.key, maxKm: loc.maxKm })
                      }
                      className={cn(chipBase, pressed ? chipActive : chipInactive)}
                      aria-pressed={pressed}
                      aria-label={ariaLabel}
                    >
                      {loc.label}
                    </button>
                  );
                })}
              </div>
              {filteredVenues.length === 0 ? (
                <p className="text-[13px] text-[#6b7280] text-center py-8 px-2 leading-relaxed" role="status">
                  {p.noResults}
                </p>
              ) : (
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {filteredVenues.map((v) => (
                    <li key={v.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(v.id);
                          setSelectedPromoIndex(null);
                        }}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border text-left w-full transition-colors",
                          "border-[#f3f4f6] hover:border-[#7161ef]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7161ef]/35",
                          "hover:bg-[#7161ef]/3"
                        )}
                        aria-label={`${p.chooseVenueAria} ${v.name}`}
                      >
                        <div
                          className="w-10 h-10 rounded-lg bg-[#f3f4f6] shrink-0 flex items-center justify-center text-xl leading-none"
                          aria-hidden
                        >
                          {v.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[#1a1a1a] leading-snug">{v.name}</p>
                          <p className="text-[11px] text-[#9ca3af]">{v.categoryLine}</p>
                          <div className="flex mt-0.5">
                            {Array.from({ length: v.stars }).map((_, i) => (
                              <span key={i} className="text-[10px] text-yellow-400">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-white bg-[#7161ef] rounded-full px-2 py-0.5 shrink-0">
                          {v.listBadge}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActivarPanel() {
  const { dict } = useTranslation();
  const p = dict.howItWorks.panels.activar;
  return (
    <div
      className="min-h-[70vh] lg:min-h-screen flex items-center justify-center rounded-3xl overflow-hidden my-8"
      style={{
        background:
          "radial-gradient(880px 540px at 70% 20%, rgba(113,97,239,0.20) 0%, rgba(113,97,239,0.00) 62%), radial-gradient(520px 420px at 18% 86%, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.00) 58%), linear-gradient(160deg, rgba(90,75,220,0.12) 0%, rgba(255,255,255,0.00) 55%, rgba(113,97,239,0.06) 100%)",
      }}
    >
      <div
        className="rounded-2xl p-px mx-4 w-full max-w-xs shadow-[0_18px_55px_rgba(17,24,39,0.10)]"
        style={{
          background:
            "radial-gradient(180px 140px at 70% 0%, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.00) 62%), linear-gradient(140deg, rgba(113,97,239,0.26) 0%, rgba(90,75,220,0.16) 35%, rgba(255,255,255,0.00) 78%)",
        }}
      >
        <div className="bg-white/92 backdrop-blur rounded-2xl p-8 flex flex-col items-center gap-5">
          <p className="text-[13px] text-[#6b7280] text-center">{p.qrPersonal}</p>
          <p className="text-[15px] font-semibold text-[#1a1a1a] text-center">The Daily Grind — 30% OFF</p>
          {/* Simulated QR */}
          <div className="w-36 h-36 rounded-2xl border-2 border-[#7161ef]/30 bg-[#f8f7ff] grid grid-cols-7 grid-rows-7 gap-0.5 p-2">
            {Array.from({ length: 49 }).map((_, i) => {
              const on = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48,10,16,17,18,19,23,24,30,36,37,38,25,26,32,33].includes(i);
              return (
                <div
                  key={i}
                  className={cn("rounded-[1px]", on ? "bg-[#7161ef]" : "bg-transparent")}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#7161ef]">
            <div className="w-2 h-2 rounded-full bg-[#7161ef] animate-pulse" />
            {p.validTime}
          </div>
        </div>
      </div>
    </div>
  );
}

function CanjearPanel() {
  const { dict } = useTranslation();
  const p = dict.howItWorks.panels.canjear;
  return (
    <div
      className="min-h-[70vh] lg:min-h-screen flex items-center justify-center rounded-3xl overflow-hidden my-8"
      style={{
        background:
          "radial-gradient(860px 520px at 18% 22%, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.00) 62%), radial-gradient(640px 460px at 84% 82%, rgba(113,97,239,0.14) 0%, rgba(113,97,239,0.00) 60%), linear-gradient(140deg, rgba(34,197,94,0.10) 0%, rgba(255,255,255,0.00) 52%, rgba(113,97,239,0.08) 100%)",
      }}
    >
      <div
        className="rounded-2xl p-px mx-4 w-full max-w-xs shadow-[0_18px_55px_rgba(17,24,39,0.10)]"
        style={{
          background:
            "radial-gradient(180px 140px at 22% 0%, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.00) 60%), linear-gradient(140deg, rgba(34,197,94,0.22) 0%, rgba(113,97,239,0.14) 42%, rgba(255,255,255,0.00) 80%)",
        }}
      >
        <div className="bg-white/92 backdrop-blur rounded-2xl p-6 flex flex-col items-center gap-4">
          {/* Scanner frame */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#7161ef] rounded-tl" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#7161ef] rounded-tr" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#7161ef] rounded-bl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#7161ef] rounded-br" />
            {/* Scan line */}
            <div className="absolute left-3 right-3 h-0.5 bg-[#7161ef]/60 top-1/3" />
            {/* Check icon */}
            <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#22c55e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>
          <p className="text-[15px] font-semibold text-[#1a1a1a]">{p.success}</p>
          <p className="text-[13px] text-[#6b7280] text-center">{p.validated}</p>
          <div className="flex items-center gap-2 bg-[#f0fdf4] text-[#16a34a] text-[12px] font-medium px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            {p.redeemed}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompartirPanel() {
  const { dict } = useTranslation();
  const p = dict.howItWorks.panels.compartir;
  return (
    <div
      className="min-h-[70vh] lg:min-h-screen flex items-center justify-center rounded-3xl overflow-hidden my-8"
      style={{
        background:
          "radial-gradient(920px 560px at 78% 18%, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0.00) 62%), radial-gradient(680px 500px at 18% 86%, rgba(113,97,239,0.12) 0%, rgba(113,97,239,0.00) 60%), linear-gradient(135deg, rgba(251,191,36,0.10) 0%, rgba(255,255,255,0.00) 52%, rgba(113,97,239,0.07) 100%)",
      }}
    >
      <div
        className="rounded-2xl p-px mx-4 w-full max-w-sm shadow-[0_18px_55px_rgba(17,24,39,0.10)]"
        style={{
          background:
            "radial-gradient(180px 140px at 78% 0%, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.00) 62%), linear-gradient(135deg, rgba(251,191,36,0.24) 0%, rgba(113,97,239,0.12) 40%, rgba(255,255,255,0.00) 80%)",
        }}
      >
        <div className="bg-white/92 backdrop-blur rounded-2xl p-6 flex flex-col gap-4">
          <p className="text-[14px] font-medium text-[#1a1a1a]">{p.question}</p>
          {/* Star rating */}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className={cn("w-7 h-7", s <= 5 ? "text-yellow-400" : "text-[#e5e7eb]")} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          {/* Comment box */}
          <div className="border border-[#e5e7eb] rounded-xl p-3">
            <p className="text-[13px] text-[#1a1a1a] leading-relaxed">
              {p.review}
            </p>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-[#f3f4f6] text-[#6b7280]">{t}</span>
            ))}
          </div>
          {/* Submit */}
          <div className="flex items-center gap-3 pt-1">
            <button type="button" className="flex-1 text-[13px] font-semibold text-white bg-[#7161ef] rounded-full py-2 hover:bg-[#5d4edf] transition-colors">
              {p.submit}
            </button>
            <div className="text-[12px] text-[#9ca3af] flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-[#7161ef]" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.75a.75.75 0 00-1.5 0v3.5a.75.75 0 00.22.53l2 2a.75.75 0 001.06-1.06L8.75 8.19V4.75z"/></svg>
              +12 pts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PANEL_MAP: Record<StepId, React.ComponentType> = {
  explorar:  ExplorarPanel,
  activar:   ActivarPanel,
  canjear:   CanjearPanel,
  compartir: CompartirPanel,
};

const STEP_ICONS: Record<StepId, React.ComponentType<{ className?: string }>> = {
  explorar:  ExploreStepsIcon,
  activar:   ActivateQRIcon,
  canjear:   RedeemScanIcon,
  compartir: ShareStarsIcon,
};

/* ── Main component ────────────────────────────────────────────────── */
export function HowItWorksSection() {
  const { dict } = useTranslation();
  const [activeSection, setActiveSection] = useState<StepId>("explorar");
  const panelRefs = useRef<Record<StepId, HTMLDivElement | null>>({
    explorar:  null,
    activar:   null,
    canjear:   null,
    compartir: null,
  });

  useEffect(() => {
    // Use scroll + getBoundingClientRect instead of IntersectionObserver.
    // This is reliable with Lenis smooth scroll (which manages its own RAF loop
    // and can interfere with IntersectionObserver's rootMargin detection).
    const handleScroll = () => {
      const midY = window.innerHeight * 0.5;
      let bestId: StepId = "explorar";
      let bestDist = Infinity;

      for (const s of STEP_IDS) {
        const el = panelRefs.current[s];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Distance from panel center to viewport midpoint
        const panelMid = rect.top + rect.height / 2;
        const dist = Math.abs(panelMid - midY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = s;
        }
      }

      setActiveSection(bestId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount so initial tab is correct
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="como-funciona" className="w-full bg-white">

      {/* Headline */}
      <div className="text-center py-20 px-6">
        <h2 className="font-heading text-[clamp(36px,5vw,56px)] font-bold text-[#1a1a1a] leading-[1.15]">
          {dict.howItWorks.heading}
        </h2>
      </div>

      {/* 2-column scroll layout */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row lg:items-start">

        {/* LEFT — sticky sidebar */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-20 py-10 flex flex-col">
          {STEP_IDS.map((id, i) => {
            const s = { id, ...dict.howItWorks.steps[i] };
            const active = activeSection === id;
            const Icon = STEP_ICONS[id];
            const stepLabel = s.label?.trim() || STEP_LABELS[id];
            return (
              <div
                key={s.id}
                className={cn(
                  "py-4 border-t border-[#f3f4f6] transition-opacity duration-300",
                  active ? "opacity-100" : "opacity-70"
                )}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-sm transition-colors duration-300",
                      active ? "bg-[#7161ef]" : "bg-[#c4c8d0]"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[12px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300",
                      active ? "text-[#7161ef]" : "text-[#6b7280]"
                    )}
                  >
                    {stepLabel}
                  </span>
                </div>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 mt-3 max-h-[600px] opacity-100",
                    active
                      ? "lg:max-h-[400px] lg:opacity-100 lg:mt-3"
                      : "lg:max-h-0 lg:opacity-0 lg:mt-0"
                  )}
                >
                  {/* Icon */}
                  <Icon className="w-10 h-10 text-[#7161ef] mb-3" />

                  <h3
                    className="font-heading text-[clamp(28px,3.5vw,40px)] font-bold text-[#1a1a1a] leading-[1.2]"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {s.heading}
                  </h3>
                  <p className="text-[15px] text-[#6b7280] leading-relaxed mt-2 max-w-[340px]">
                    {s.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — scrolling panels */}
        <div className="w-full lg:w-[65%] lg:pl-16">
          {STEP_IDS.map((id) => {
            const Panel = PANEL_MAP[id];
            return (
              <div
                key={id}
                ref={(el) => { panelRefs.current[id] = el; }}
              >
                <Panel />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
