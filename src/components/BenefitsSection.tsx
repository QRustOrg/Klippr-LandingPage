"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MapPinsIcon,
  QRLockIcon,
  StarBubblesIcon,
  ListChecksIcon,
  BarChartNumbersIcon,
  ShieldCheckmarkIcon,
  TogglePanelIcon,
  StarReplyIcon,
} from "./icons";
import { useTranslation } from "@/i18n/useTranslation";
import { filterExplorarVenues, type ExplorarActiveFilter } from "@/lib/explorar-demo";

/* ── Types ────────────────────────────────────────────────────────── */
type Tab = "b2c" | "b2b";

type IconComponent = React.ComponentType<{ className?: string }>;

const B2C_ICONS: IconComponent[] = [MapPinsIcon, QRLockIcon, StarBubblesIcon, ListChecksIcon];
const B2B_ICONS: IconComponent[] = [BarChartNumbersIcon, ShieldCheckmarkIcon, TogglePanelIcon, StarReplyIcon];

/* ── Phone mockup screens ──────────────────────────────────────────── */
function B2CScreen() {
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

  const venueAccent = (venueId: string) => {
    const ix = p.venues.findIndex((v) => v.id === venueId);
    return (ix >= 0 && ix % 2 === 1 ? "#a78bfa" : "#7161ef") as string;
  };

  const chipBase =
    "text-[9px] font-medium px-2 py-0.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7161ef]/50";
  const chipInactive = "border-[rgba(113,97,239,0.35)] text-[#7161ef] bg-[rgba(113,97,239,0.06)]";
  const chipActive = "border-[#7161ef] bg-[#7161ef] text-white";

  const scrollWrap = { maxHeight: 318, overflowY: "auto" as const, overflowX: "hidden" as const };

  return (
    <div style={scrollWrap} className="px-0.5">
      {selected && selectedPromo ? (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setSelectedPromoIndex(null)}
            className="flex items-center gap-0.5 text-[9px] font-semibold text-[#7161ef] -ml-0.5 py-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7161ef]/40"
          >
            <ChevronLeft className="w-3 h-3 shrink-0" aria-hidden />
            {p.backToPromotions}
          </button>
          <div className="flex items-start justify-between gap-2">
            <p className="text-[10px] font-semibold text-[#1a1a1a] leading-tight flex-1 min-w-0">{selectedPromo.title}</p>
            <span
              className="text-[8px] font-bold text-white rounded-full px-1.5 py-0.5 shrink-0"
              style={{ background: venueAccent(selected.id) }}
            >
              {selectedPromo.badge}
            </span>
          </div>
          <div>
            <p className="text-[7px] font-bold uppercase tracking-wide text-[#6b7280] mb-0.5">{p.promoConditionsHeading}</p>
            <p className="text-[8px] text-[#374151] leading-snug">{selectedPromo.conditions}</p>
          </div>
          <div>
            <p className="text-[7px] font-bold uppercase tracking-wide text-[#6b7280] mb-0.5">{p.promoValidityHeading}</p>
            <p className="text-[8px] text-[#374151] leading-snug">{selectedPromo.validity}</p>
          </div>
        </div>
      ) : selected ? (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedId(null);
              setSelectedPromoIndex(null);
            }}
            className="flex items-center gap-0.5 text-[9px] font-semibold text-[#7161ef] -ml-0.5 py-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7161ef]/40"
          >
            <ChevronLeft className="w-3 h-3 shrink-0" aria-hidden />
            {p.backToList}
          </button>
          <p className="text-[7px] font-bold uppercase tracking-wide text-[#6b7280]">{p.discountsTitle}</p>
          <div className="flex items-center gap-2 pb-2 border-b border-[#f3f4f6]">
            <div
              className="w-7 h-7 rounded-md shrink-0 flex items-center justify-center text-sm leading-none bg-[#f3f4f6]"
              aria-hidden
            >
              {selected.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-[#1a1a1a] leading-tight truncate">{selected.name}</p>
              <p className="text-[8px] text-[#9ca3af]">{selected.categoryLine}</p>
            </div>
          </div>
          <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
            {selected.discounts.map((d, i) => (
              <li key={`${selected.id}-p-${i}`}>
                <button
                  type="button"
                  onClick={() => setSelectedPromoIndex(i)}
                  className={cn(
                    "w-full flex items-start gap-2 p-2 rounded-lg border text-left transition-colors",
                    "border-[#f0eeff] bg-[#faf9ff] hover:border-[#7161ef]/35",
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7161ef]/40"
                  )}
                  aria-label={`${p.choosePromoAria} ${d.title}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-[#1a1a1a] leading-tight">{d.title}</p>
                    <p className="text-[8px] text-[#6b7280] mt-0.5 line-clamp-2">{d.conditions}</p>
                  </div>
                  <span
                    className="text-[8px] font-bold text-white rounded-full px-1.5 py-0.5 shrink-0 self-center"
                    style={{ background: venueAccent(selected.id) }}
                  >
                    {d.badge}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5 flex-wrap mb-0.5" role="toolbar" aria-label={p.filterToolbarAria}>
            <button
              type="button"
              onClick={() => setActiveFilter({ type: "all" })}
              className={cn(chipBase, activeFilter.type === "all" ? chipActive : chipInactive)}
              aria-pressed={activeFilter.type === "all"}
            >
              {p.filterAllLabel}
            </button>
            {p.filterCategories.map((c) => {
              const pressed = activeFilter.type === "category" && activeFilter.key === c.key;
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
              const pressed = activeFilter.type === "location" && activeFilter.key === loc.key;
              const ariaLabel = `${loc.label}, ${p.filterWithinKmAria.replace("{n}", String(loc.maxKm))}`;
              return (
                <button
                  key={loc.key}
                  type="button"
                  onClick={() => setActiveFilter({ type: "location", key: loc.key, maxKm: loc.maxKm })}
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
            <p className="text-[8px] text-[#6b7280] text-center py-4 px-1 leading-relaxed" role="status">
              {p.noResults}
            </p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {filteredVenues.map((v) => {
                const color = venueAccent(v.id);
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(v.id);
                      setSelectedPromoIndex(null);
                    }}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg border text-left w-full transition-colors",
                      "border-[#f0eeff] bg-[#faf9ff] hover:border-[#7161ef]/30",
                      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7161ef]/40"
                    )}
                    aria-label={`${p.chooseVenueAria} ${v.name}`}
                  >
                    <div
                      className="w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center text-sm leading-none"
                      style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}
                      aria-hidden
                    >
                      {v.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold text-[#1a1a1a] leading-tight truncate">{v.name}</p>
                      <p className="text-[8px] text-[#9ca3af]">{v.categoryLine}</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: v.stars }).map((_, i) => (
                          <span key={i} className="text-[7px] text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span
                      className="text-[8px] font-bold text-white rounded-full px-1.5 py-0.5 flex-shrink-0"
                      style={{ background: color }}
                    >
                      {v.listBadge}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function B2BScreen() {
  const { dict } = useTranslation();
  const d = dict.benefits.dashboard;
  const stats = [
    { label: d.views, value: "1,284", delta: "+12%" },
    { label: d.redemptions, value: "347", delta: "+8%" },
    { label: "Rating", value: "4.8★", delta: "+0.2" },
  ];
  return (
    <div className="flex flex-col gap-2 px-1">
      {/* Stat row */}
      <div className="grid grid-cols-3 gap-1.5 mb-1">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg p-1.5 text-center"
            style={{ background: "rgba(113,97,239,0.07)" }}
          >
            <p className="text-[11px] font-bold text-[#7161ef]">{s.value}</p>
            <p className="text-[7px] text-[#9ca3af] mt-0.5">{s.label}</p>
            <p className="text-[7px] text-emerald-500">{s.delta}</p>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div className="rounded-lg p-2" style={{ background: "rgba(113,97,239,0.04)", border: "1px solid rgba(113,97,239,0.12)" }}>
        <p className="text-[8px] text-[#6b7280] mb-1.5">{d.redemptionsPerDay}</p>
        <div className="flex items-end gap-1 h-10">
          {[3, 5, 4, 7, 6, 9, 8].map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{
                height: `${(v / 9) * 100}%`,
                background: i === 5 ? "#7161ef" : "rgba(113,97,239,0.3)",
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
            <span key={d} className="text-[6px] text-[#d1d5db] flex-1 text-center">{d}</span>
          ))}
        </div>
      </div>
      {/* Campaign toggle */}
      <div
        className="flex items-center justify-between rounded-lg p-2"
        style={{ border: "1px solid rgba(113,97,239,0.15)", background: "#faf9ff" }}
      >
        <div>
          <p className="text-[9px] font-semibold text-[#1a1a1a]">{d.promoLabel}</p>
          <p className="text-[7px] text-[#9ca3af]">{d.promoStatus}</p>
        </div>
        <div className="w-8 h-4 rounded-full flex items-center px-0.5" style={{ background: "#7161ef" }}>
          <div className="w-3 h-3 rounded-full bg-white ml-auto" />
        </div>
      </div>
    </div>
  );
}

/* ── Phone mockup shell ───────────────────────────────────────────── */
function PhoneMockup({ activeTab }: { activeTab: Tab }) {
  const { dict } = useTranslation();
  const [visibleTab, setVisibleTab] = useState<Tab>(activeTab);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (activeTab === visibleTab) return;
    setOpacity(0);
    const t = setTimeout(() => {
      setVisibleTab(activeTab);
      setOpacity(1);
    }, 150);
    return () => clearTimeout(t);
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  /* iPhone 15 Pro proportions: 220×476 rendered */
  const W = 220;
  const H = 476;
  const FRAME = 8;           // sleeker frame thickness
  const R = 42;              // outer corner radius
  const INNER_R = R - FRAME; // inner screen radius

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: W, height: H }}
    >
      {/* ── Left side buttons (volume + silent switch) ── */}
      {/* Silent / Action button */}
      <div
        className="absolute"
        style={{
          left: -3,
          top: 90,
          width: 3,
          height: 26,
          borderRadius: "3px 0 0 3px",
          background: "linear-gradient(180deg, #71717a 0%, #3f3f46 100%)",
          boxShadow: "inset 1px 0 1px rgba(255,255,255,0.2)",
        }}
      />
      {/* Volume up */}
      <div
        className="absolute"
        style={{
          left: -3,
          top: 134,
          width: 3,
          height: 46,
          borderRadius: "3px 0 0 3px",
          background: "linear-gradient(180deg, #71717a 0%, #3f3f46 100%)",
          boxShadow: "inset 1px 0 1px rgba(255,255,255,0.2)",
        }}
      />
      {/* Volume down */}
      <div
        className="absolute"
        style={{
          left: -3,
          top: 190,
          width: 3,
          height: 46,
          borderRadius: "3px 0 0 3px",
          background: "linear-gradient(180deg, #71717a 0%, #3f3f46 100%)",
          boxShadow: "inset 1px 0 1px rgba(255,255,255,0.2)",
        }}
      />
      {/* ── Right side power button ── */}
      <div
        className="absolute"
        style={{
          right: -3,
          top: 148,
          width: 3,
          height: 62,
          borderRadius: "0 3px 3px 0",
          background: "linear-gradient(180deg, #71717a 0%, #3f3f46 100%)",
          boxShadow: "inset -1px 0 1px rgba(255,255,255,0.2)",
        }}
      />

      {/* ── Outer frame (titanium aesthetic) ── */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: R,
          background: "linear-gradient(160deg, #71717a 0%, #3f3f46 30%, #27272a 70%, #18181b 100%)",
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.2), " +
            "inset 0 2px 4px rgba(255,255,255,0.3), " +
            "0 30px 60px -10px rgba(0,0,0,0.4), " +
            "0 10px 20px -5px rgba(113,97,239,0.15)",
        }}
      />

      {/* ── Screen bezel inset ── */}
      <div
        className="absolute"
        style={{
          top: FRAME,
          left: FRAME,
          right: FRAME,
          bottom: FRAME,
          borderRadius: INNER_R,
          background: "#000",
          overflow: "clip",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.8)",
        }}
      >
        {/* ── Screen background ── */}
        <div
          style={{
            position: "absolute",
            inset: 1, // Subtle black border around the screen inside the frame
            background: "#ffffff",
            borderRadius: INNER_R - 1,
            overflow: "clip",
          }}
        >
          {/* ── Status bar ── */}
          <div
            style={{
              height: 44,
              paddingTop: 16,
              paddingLeft: 20,
              paddingRight: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "linear-gradient(135deg, #7161ef 0%, #9b8ff7 100%)",
            }}
          >
            {/* Time */}
            <span style={{ fontSize: 9.5, fontWeight: 600, color: "white", letterSpacing: 0.2 }}>
              9:41
            </span>
            {/* Status icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              {/* Signal bars */}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <rect x="0" y="6" width="2.5" height="4" rx="1" fill="white" />
                <rect x="3.8" y="4.5" width="2.5" height="5.5" rx="1" fill="white" />
                <rect x="7.6" y="2.5" width="2.5" height="7.5" rx="1" fill="white" />
                <rect x="11.4" y="0" width="2.5" height="10" rx="1" fill="white" />
              </svg>
              {/* WiFi */}
              <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
                <path d="M6.5 8a1 1 0 100-2 1 1 0 000 2z" fill="white" />
                <path d="M3 5.5C4.5 4.3 5.5 4 6.5 4S8.5 4.3 10 5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <path d="M0.5 3C2.5 1.2 4.5 0.5 6.5 0.5S10.5 1.2 12.5 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" strokeOpacity="0.7" />
              </svg>
              {/* Battery */}
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <rect x="0.5" y="0.5" width="16" height="9" rx="2.5" stroke="white" strokeOpacity="0.5" />
                <rect x="2" y="2" width="11" height="6" rx="1.5" fill="white" />
                <path d="M17.5 3.5v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
              </svg>
            </div>
          </div>

          {/* ── App header bar ── */}
          <div
            style={{
              padding: "8px 16px 8px",
              background: "linear-gradient(135deg, #7161ef 0%, #9b8ff7 100%)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Image
              src="/klippr/klippr.png"
              alt="Klippr"
              width={24}
              height={24}
              className="rounded-md object-cover shrink-0"
              sizes="24px"
            />
            <span style={{ fontSize: 11, fontWeight: 700, color: "white", letterSpacing: 0.5 }}>KLIPPR</span>
            <div style={{ marginLeft: "auto", width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />
            </div>
          </div>

          {/* ── Section label ── */}
          <div style={{ padding: "10px 14px 4px" }}>
            <span
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: "#7161ef",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                opacity: 0.9,
              }}
            >
              {visibleTab === "b2c" ? dict.benefits.screenLabelConsumer : dict.benefits.screenLabelBusiness}
            </span>
          </div>

          {/* ── Cross-dissolve screen content ── */}
          <div
            style={{
              padding: "0 12px 12px",
              opacity,
              transition: "opacity 150ms ease",
            }}
          >
            {visibleTab === "b2c" ? <B2CScreen /> : <B2BScreen />}
          </div>
        </div>

        {/* ── Dynamic Island ── */}
        <div
          style={{
            position: "absolute",
            top: 11,
            left: "50%",
            transform: "translateX(-50%)",
            width: 72,
            height: 22,
            borderRadius: 20,
            background: "#000",
            zIndex: 10,
            boxShadow: "inset 0 0 1px 1px rgba(255,255,255,0.05)",
          }}
        >
          {/* Camera lens reflection */}
          <div style={{ position: "absolute", right: 6, top: 4, width: 14, height: 14, borderRadius: "50%", background: "#111", boxShadow: "inset -1px -1px 2px rgba(255,255,255,0.1)" }} />
        </div>

        {/* ── Screen glare overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: INNER_R - 1,
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 40%, transparent 45%)",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
      </div>

      {/* ── Ambient glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -15,
          left: "50%",
          transform: "translateX(-50%)",
          width: 180,
          height: 30,
          borderRadius: "50%",
          background: "rgba(113,97,239,0.3)",
          filter: "blur(20px)",
          zIndex: -1,
        }}
      />
    </div>
  );
}


/* ── Benefit card ──────────────────────────────────────────────────── */
function BenefitCard({ icon: Icon, title, body }: { icon: IconComponent; title: string; body: string }) {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl p-6 border border-[#ede9fe]/60",
        "transition-all duration-200 overflow-hidden",
        "hover:shadow-[0_4px_24px_rgba(113,97,239,0.12)]",
      )}
    >
      {/* Sliding left border accent */}
      <span
        className={cn(
          "absolute left-0 top-0 w-[3px] rounded-r-sm",
          "bg-[#7161ef]",
          "translate-y-full group-hover:translate-y-0",
          "transition-transform duration-200 ease-out",
        )}
        style={{ height: "100%" }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: "rgba(113,97,239,0.08)" }}
      >
        <Icon className="w-6 h-6 text-[#7161ef]" />
      </div>

      <h3 className="font-heading text-[15px] font-bold text-[#1a1a1a] leading-snug mb-2">
        {title}
      </h3>
      <p className="text-[13px] text-[#6b7280] leading-relaxed">
        {body}
      </p>
    </div>
  );
}

/* ── Tab pill ──────────────────────────────────────────────────────── */
function TabPills({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  const { dict } = useTranslation();
  const tabsRef = useRef<HTMLDivElement>(null);
  const b2cRef = useRef<HTMLButtonElement>(null);
  const b2bRef = useRef<HTMLButtonElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const updateIndicator = (tab: Tab) => {
    const container = tabsRef.current;
    const el = tab === "b2c" ? b2cRef.current : b2bRef.current;
    if (!container || !el) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicatorStyle({
      left: elRect.left - containerRect.left,
      width: elRect.width,
    });
  };

  useEffect(() => {
    updateIndicator(activeTab);
  }, [activeTab]);

  // Also measure on mount
  useEffect(() => {
    updateIndicator("b2c");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex justify-center">
      <div
        ref={tabsRef}
        className="relative flex gap-1 p-1 rounded-full"
        style={{
          background: "rgba(113,97,239,0.06)",
          border: "1px solid rgba(113,97,239,0.12)",
        }}
      >
        {/* Sliding indicator bar */}
        <span
          className="absolute bottom-1 rounded-full pointer-events-none"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            height: "3px",
            background: "#7161ef",
            bottom: "4px",
            transition: "left 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          aria-hidden="true"
        />

        <button
          ref={b2cRef}
          type="button"
          id="tab-b2c"
          role="tab"
          aria-selected={activeTab === "b2c"}
          onClick={() => onTabChange("b2c")}
          className={cn(
            "relative z-10 px-5 py-2 rounded-full text-[14px] font-semibold transition-colors duration-300",
            activeTab === "b2c"
              ? "text-[#7161ef]"
              : "text-[#9ca3af] hover:text-[#6b7280]",
          )}
        >
          {dict.benefits.tabConsumer}
        </button>
        <button
          ref={b2bRef}
          type="button"
          id="tab-b2b"
          role="tab"
          aria-selected={activeTab === "b2b"}
          onClick={() => onTabChange("b2b")}
          className={cn(
            "relative z-10 px-5 py-2 rounded-full text-[14px] font-semibold transition-colors duration-300",
            activeTab === "b2b"
              ? "text-[#7161ef]"
              : "text-[#9ca3af] hover:text-[#6b7280]",
          )}
        >
          {dict.benefits.tabBusiness}
        </button>
      </div>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────────────────── */
export function BenefitsSection() {
  const { dict } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>("b2c");
  const icons = activeTab === "b2c" ? B2C_ICONS : B2B_ICONS;
  const cardTexts = activeTab === "b2c" ? dict.benefits.b2c : dict.benefits.b2b;

  return (
    <section
      id="beneficios"
      className="w-full relative"
      style={{
        background:
          "linear-gradient(160deg, #faf9ff 0%, #f5f3ff 40%, #faf9ff 100%)",
        overflow: "clip",
      }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(113,97,239,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 py-24 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-[clamp(32px,4.5vw,52px)] font-bold text-[#1a1a1a] leading-[1.15]">
            {dict.benefits.heading}{" "}
            <span style={{ color: "#7161ef" }}>{dict.benefits.headingAccent}</span>
          </h2>
          <p className="mt-3 text-[16px] text-[#6b7280] max-w-xl mx-auto leading-relaxed">
            {dict.benefits.subheading}
          </p>
        </div>

        {/* Tab pills */}
        <div className="mb-12">
          <TabPills activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Desktop: split layout | Mobile: stacked */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          {/* LEFT — 2×2 grid of cards (cross-dissolve on tab change) */}
          <div className="flex-1">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              style={{
                opacity: 1,
                transition: "opacity 300ms ease",
              }}
            >
              {cardTexts.map((card, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  className="animate-benefits-card-in"
                >
                  <BenefitCard icon={icons[i]} title={card.title} body={card.body} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — static phone mockup, only inner screen changes */}
          <div className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 pl-6">
            <PhoneMockup activeTab={activeTab} />
          </div>
        </div>
      </div>

      {/* Section divider fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(250,249,255,0.8))",
        }}
      />
    </section>
  );
}
