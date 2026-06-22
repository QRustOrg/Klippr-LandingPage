"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";
import {
  ExploreStepsIcon,
  ActivateQRIcon,
  RedeemScanIcon,
  ShareStarsIcon,
} from "./icons";
import { useTranslation } from "@/i18n/useTranslation";

/* â”€â”€ Step data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
type StepId = "explorar" | "activar" | "canjear" | "compartir";

const STEP_IDS: StepId[] = ["explorar", "activar", "canjear", "compartir"];
const STEP_LABELS: Record<StepId, string> = {
  explorar: "Explorar",
  activar: "Activar",
  canjear: "Canjear",
  compartir: "Compartir",
};

const ACTIVE_PROMOTIONS_ENDPOINT = "/api/promotions/active";

type PromoCategory = "food" | "sports" | "health" | "entertainment";

interface ActivePromotionResource {
  id: string;
  businessName?: string | null;
  title?: string | null;
  description?: string | null;
  discountAmount?: number | null;
  discountType?: string | null;
  endDate?: string | null;
  redemptionCap?: number | null;
  imageKey?: string | null;
}

interface ActiveHowPromotion {
  id: string;
  businessName: string;
  title: string;
  description: string;
  discountLabel: string;
  endDate: string | null;
  redemptionCap: number;
  imageKey: string;
  imageSrc: string;
  categoryKey: PromoCategory;
}

type HowActiveFilter =
  | { type: "all" }
  | { type: "category"; key: PromoCategory }
  | { type: "location"; key: "nearby"; maxKm: number };

interface PanelProps {
  promotions: ActiveHowPromotion[];
  featuredPromotion: ActiveHowPromotion;
  dataState: "loading" | "live" | "fallback";
}

const FALLBACK_ACTIVE_PROMOTIONS: ActivePromotionResource[] = [
  {
    id: "fallback-cinema",
    businessName: "Hamburgueseria Pepe",
    title: "ENTRADAS 2X1 MARTES",
    description: "SOLO LOS MARTES DE 18:00 A 23:00",
    discountAmount: 50,
    discountType: "Percentage",
    endDate: "2026-06-29T00:00:00",
    imageKey: "entretenimiento_cine",
  },
  {
    id: "fallback-chicken",
    businessName: "Hamburgueseria Pepe",
    title: "Pollo Frito + Papas",
    description: "OFERTA EXCLUSIVA ONLINE",
    discountAmount: 60,
    discountType: "Percentage",
    endDate: "2026-06-26T00:00:00",
    imageKey: "comida_pollo_frito",
  },
  {
    id: "fallback-health",
    businessName: "Hamburgueseria Pepe",
    title: "25% OFF en pastillas para alergias",
    description: "Aplica para levocetirizina y fexofenadina",
    discountAmount: 25,
    discountType: "Percentage",
    endDate: "2026-06-25T00:00:00",
    imageKey: "salud_pastillas",
  },
];

const PROMO_IMAGE_BY_KEY: Record<string, string> = {
  comida_ceviche: "/images/promotions/comida_ceviche.png",
  comida_hamburguesas: "/images/promotions/comida_hamburguesas.png",
  comida_pizza: "/images/promotions/comida_pizza.png",
  comida_pollo_frito: "/images/promotions/comida_pollo_frito.png",
  deportes_basket: "/images/promotions/deportes_basket.png",
  deportes_futbol: "/images/promotions/deportes_futbol.png",
  deportes_volley: "/images/promotions/deportes_volley.png",
  entretenimiento_bares: "/images/promotions/entretenimiento_bares.png",
  entretenimiento_bolos: "/images/promotions/entretenimiento_bolos.png",
  entretenimiento_cibercafe: "/images/promotions/entretenimiento_cibercafe.png",
  entretenimiento_cine: "/images/promotions/entretenimiento_cine.png",
  salud_medicamentos: "/images/promotions/salud_medicamentos.png",
  salud_pastillas: "/images/promotions/salud_pastillas.png",
};

function categoryFromImageKey(imageKey: string): PromoCategory {
  if (imageKey.startsWith("salud_")) return "health";
  if (imageKey.startsWith("entretenimiento_")) return "entertainment";
  if (imageKey.startsWith("deportes_")) return "sports";
  return "food";
}

function buildDiscountLabel(amount: number, type: string) {
  if (/percent/i.test(type)) return `${Math.round(amount)}% OFF`;
  return `${Math.round(amount)} OFF`;
}

function normalizeActivePromotions(rawPromotions: ActivePromotionResource[]): ActiveHowPromotion[] {
  return rawPromotions
    .filter((promo) => promo.id)
    .map((promo) => {
      const imageKey = promo.imageKey ?? "comida_hamburguesas";
      const discountAmount = Number(promo.discountAmount ?? 0);
      const discountType = promo.discountType ?? "Percentage";

      return {
        id: promo.id,
        businessName: promo.businessName?.trim() || "Klippr Business",
        title: promo.title?.trim() || "Active promotion",
        description: promo.description?.trim() || "Limited-time active promotion.",
        discountLabel: buildDiscountLabel(discountAmount, discountType),
        endDate: promo.endDate ?? null,
        redemptionCap: promo.redemptionCap ?? 100,
        imageKey,
        imageSrc: PROMO_IMAGE_BY_KEY[imageKey] ?? "/images/promotions/comida_hamburguesas.png",
        categoryKey: categoryFromImageKey(imageKey),
      };
    });
}

function categoryLabel(category: PromoCategory) {
  switch (category) {
    case "entertainment":
      return "Entertainment";
    case "health":
      return "Health";
    case "sports":
      return "Sports";
    default:
      return "Food";
  }
}

function formatPromoDate(value: string | null) {
  if (!value) return "N/D";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/D";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" }).format(date);
}

function parsePromotionResponse(data: unknown): ActivePromotionResource[] {
  if (Array.isArray(data)) return data as ActivePromotionResource[];
  if (data && typeof data === "object" && Array.isArray((data as { value?: unknown }).value)) {
    return (data as { value: ActivePromotionResource[] }).value;
  }
  return [];
}

function getQrPayload(promotion: ActiveHowPromotion) {
  return JSON.stringify({
    promotionId: promotion.id,
    businessName: promotion.businessName,
    title: promotion.title,
    discount: promotion.discountLabel,
  });
}

/* â”€â”€ Right-side illustration panels â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function ExplorarPanel({ promotions, dataState }: PanelProps) {
  const { dict } = useTranslation();
  const p = dict.howItWorks.panels.explorar;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<HowActiveFilter>({ type: "all" });

  const availableCategories = useMemo(
    () => Array.from(new Set(promotions.map((promotion) => promotion.categoryKey))),
    [promotions]
  );

  const filteredPromotions = useMemo(() => {
    if (activeFilter.type === "category") {
      return promotions.filter((promotion) => promotion.categoryKey === activeFilter.key);
    }
    return promotions;
  }, [activeFilter, promotions]);

  const selectedPromotion = promotions.find((promotion) => promotion.id === selectedId) ?? null;

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
          {selectedPromotion ? (
            <div className="animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-1 text-[12px] font-semibold text-[#7161ef] hover:text-[#5d4edf] mb-3 -ml-1 px-1 py-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7161ef]/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden />
                {p.backToList}
              </button>
              <div className="relative mb-4 h-[128px] overflow-hidden rounded-xl bg-[#f3f4f6]">
                <Image src={selectedPromotion.imageSrc} alt={selectedPromotion.title} fill className="object-cover" sizes="320px" />
                <span className="absolute right-3 top-3 rounded-full bg-[#7161ef] px-2.5 py-1 text-[11px] font-bold text-white">
                  {selectedPromotion.discountLabel}
                </span>
              </div>
              <div className="mb-4 min-w-0">
                <h3 className="text-[15px] font-semibold text-[#1a1a1a] leading-snug">{selectedPromotion.title}</h3>
                <p className="mt-1 text-[12px] text-[#6b7280]">
                  {selectedPromotion.businessName} · {categoryLabel(selectedPromotion.categoryKey)}
                </p>
              </div>
              <div className="flex flex-col gap-4" role="region" aria-label={selectedPromotion.title}>
                <div>
                  <p className="text-[10px] font-semibold tracking-wide uppercase text-[#6b7280] mb-1.5">
                    {p.promoConditionsHeading}
                  </p>
                  <p className="text-[12px] text-[#374151] leading-relaxed">{selectedPromotion.description}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-wide uppercase text-[#6b7280] mb-1.5">
                    {p.promoValidityHeading}
                  </p>
                  <p className="text-[12px] text-[#374151] leading-relaxed">
                    {formatPromoDate(selectedPromotion.endDate)} · {selectedPromotion.redemptionCap} redemptions
                  </p>
                </div>
              </div>
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
                {availableCategories.map((category) => {
                  const pressed = activeFilter.type === "category" && activeFilter.key === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveFilter({ type: "category", key: category })}
                      className={cn(chipBase, pressed ? chipActive : chipInactive)}
                      aria-pressed={pressed}
                    >
                      {categoryLabel(category)}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setActiveFilter({ type: "location", key: "nearby", maxKm: 1 })}
                  className={cn(chipBase, activeFilter.type === "location" ? chipActive : chipInactive)}
                  aria-pressed={activeFilter.type === "location"}
                  aria-label={p.filterWithinKmAria.replace("{n}", "1")}
                >
                  {p.filterLocations[0]?.label ?? "Nearby"}
                </button>
              </div>
              {dataState === "loading" ? (
                <p className="text-[13px] text-[#6b7280] text-center py-8 px-2 leading-relaxed" role="status">
                  Loading active promotions...
                </p>
              ) : filteredPromotions.length === 0 ? (
                <p className="text-[13px] text-[#6b7280] text-center py-8 px-2 leading-relaxed" role="status">
                  {p.noResults}
                </p>
              ) : (
                <ul className="flex flex-col gap-3 list-none p-0 m-0">
                  {filteredPromotions.slice(0, 5).map((promotion) => (
                    <li key={promotion.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(promotion.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border text-left w-full transition-colors",
                          "border-[#f3f4f6] hover:border-[#7161ef]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7161ef]/35",
                          "hover:bg-[#7161ef]/3"
                        )}
                        aria-label={`${p.choosePromoAria} ${promotion.title}`}
                      >
                        <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-[#f3f4f6] shrink-0" aria-hidden>
                          <Image src={promotion.imageSrc} alt="" fill className="object-cover" sizes="40px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[#1a1a1a] leading-snug">{promotion.businessName}</p>
                          <p className="text-[11px] text-[#9ca3af] truncate">
                            {categoryLabel(promotion.categoryKey)} · {promotion.title}
                          </p>
                          <div className="flex mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className="text-[10px] text-yellow-400">?</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-white bg-[#7161ef] rounded-full px-2 py-0.5 shrink-0">
                          {promotion.discountLabel}
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
function ActivarPanel({ featuredPromotion }: PanelProps) {
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
          <p className="text-[15px] font-semibold text-[#1a1a1a] text-center">
            {featuredPromotion.businessName} — {featuredPromotion.discountLabel}
          </p>
          <div className="rounded-2xl border-2 border-[#7161ef]/30 bg-white p-3 shadow-sm">
            <QRCodeSVG
              value={getQrPayload(featuredPromotion)}
              size={144}
              level="M"
              marginSize={1}
              fgColor="#7161ef"
              bgColor="#ffffff"
              title={`QR for ${featuredPromotion.title}`}
            />
          </div>
          <p className="max-w-[210px] text-center text-[12px] font-medium leading-relaxed text-[#1a1a1a]">
            {featuredPromotion.title}
          </p>
          <div className="flex items-center gap-2 text-[12px] text-[#7161ef]">
            <div className="w-2 h-2 rounded-full bg-[#7161ef] animate-pulse" />
            {p.validTime}
          </div>
        </div>
      </div>
    </div>
  );
}
function CanjearPanel({ featuredPromotion }: PanelProps) {
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
          <div className="relative h-[132px] w-full overflow-hidden rounded-xl bg-[#f3f4f6]">
            <Image src={featuredPromotion.imageSrc} alt={featuredPromotion.title} fill className="object-cover" sizes="260px" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />
            <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#7161ef]">
              {featuredPromotion.discountLabel}
            </span>
          </div>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#7161ef] rounded-tl" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#7161ef] rounded-tr" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#7161ef] rounded-bl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#7161ef] rounded-br" />
            <div className="absolute left-3 right-3 h-0.5 bg-[#7161ef]/60 top-1/3" />
            <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#22c55e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>
          <p className="text-[15px] font-semibold text-[#1a1a1a]">{p.success}</p>
          <p className="text-[13px] text-[#6b7280] text-center">
            {featuredPromotion.businessName} validated {featuredPromotion.title}
          </p>
          <div className="flex items-center gap-2 bg-[#f0fdf4] text-[#16a34a] text-[12px] font-medium px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            {p.redeemed.replace("The Daily Grind", featuredPromotion.businessName)}
          </div>
        </div>
      </div>
    </div>
  );
}
function CompartirPanel({ featuredPromotion }: PanelProps) {
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
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#f3f4f6]">
              <Image src={featuredPromotion.imageSrc} alt="" fill className="object-cover" sizes="48px" />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-[#1a1a1a]">
                How was your experience with {featuredPromotion.businessName}?
              </p>
              <p className="mt-1 truncate text-[11px] text-[#6b7280]">{featuredPromotion.title}</p>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className="w-7 h-7 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <div className="border border-[#e5e7eb] rounded-xl p-3">
            <p className="text-[13px] text-[#1a1a1a] leading-relaxed">
              I used {featuredPromotion.discountLabel} on {featuredPromotion.title}. {featuredPromotion.description} Everything matched the promotion and the QR worked without hassle.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[featuredPromotion.discountLabel, categoryLabel(featuredPromotion.categoryKey), "QR worked"].map((t) => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-[#f3f4f6] text-[#6b7280]">{t}</span>
            ))}
          </div>
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
const PANEL_MAP: Record<StepId, React.ComponentType<PanelProps>> = {
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

/* â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export function HowItWorksSection() {
  const { dict } = useTranslation();
  const [activeSection, setActiveSection] = useState<StepId>("explorar");
  const fallbackPromotions = useMemo(() => normalizeActivePromotions(FALLBACK_ACTIVE_PROMOTIONS), []);
  const [promotions, setPromotions] = useState<ActiveHowPromotion[]>(fallbackPromotions);
  const [dataState, setDataState] = useState<"loading" | "live" | "fallback">("loading");
  const panelRefs = useRef<Record<StepId, HTMLDivElement | null>>({
    explorar:  null,
    activar:   null,
    canjear:   null,
    compartir: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivePromotions() {
      try {
        const response = await fetch(ACTIVE_PROMOTIONS_ENDPOINT, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Active promotions request failed: ${response.status}`);

        const data = await response.json();
        const normalized = normalizeActivePromotions(parsePromotionResponse(data));

        if (normalized.length > 0) {
          setPromotions(normalized);
          setDataState("live");
        } else {
          setPromotions(fallbackPromotions);
          setDataState("fallback");
        }
      } catch {
        if (controller.signal.aborted) return;
        setPromotions(fallbackPromotions);
        setDataState("fallback");
      }
    }

    loadActivePromotions();

    return () => controller.abort();
  }, [fallbackPromotions]);

  const featuredPromotion = promotions[0] ?? fallbackPromotions[0];

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

        {/* LEFT â€” sticky sidebar */}
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

        {/* RIGHT â€” scrolling panels */}
        <div className="w-full lg:w-[65%] lg:pl-16">
          {STEP_IDS.map((id) => {
            const Panel = PANEL_MAP[id];
            return (
              <div
                key={id}
                ref={(el) => { panelRefs.current[id] = el; }}
              >
                <Panel promotions={promotions} featuredPromotion={featuredPromotion} dataState={dataState} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
