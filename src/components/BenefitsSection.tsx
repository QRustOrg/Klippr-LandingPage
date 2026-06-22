"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  Heart,
  Home as HomeIcon,
  Info,
  Search,
  Settings,
  Share2,
  SlidersHorizontal,
  Store,
  Users,
} from "lucide-react";
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
import { BusinessSimulator } from "./BusinessSimulator";
import { useTranslation } from "@/i18n/useTranslation";

/* â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
type Tab = "b2c" | "b2b";

type IconComponent = React.ComponentType<{ className?: string }>;

const B2C_ICONS: IconComponent[] = [MapPinsIcon, QRLockIcon, StarBubblesIcon, ListChecksIcon];
const B2B_ICONS: IconComponent[] = [BarChartNumbersIcon, ShieldCheckmarkIcon, TogglePanelIcon, StarReplyIcon];

type ConsumerSimulatorScreen = "home" | "promos" | "detail";

interface PromotionResource {
  id: string;
  businessId?: string;
  businessName?: string | null;
  title?: string | null;
  description?: string | null;
  discountAmount?: number | null;
  discountType?: string | null;
  endDate?: string | null;
  redemptionCap?: number | null;
  imageKey?: string | null;
}

interface ConsumerPromotion {
  id: string;
  businessName: string;
  title: string;
  description: string;
  discountAmount: number;
  discountType: string;
  discountLabel: string;
  endDate: string | null;
  redemptionCap: number;
  imageKey: string;
  categoryKey: "food" | "sports" | "health" | "entertainment";
}

const ACTIVE_PROMOTIONS_ENDPOINT =
  "/api/klippr/promotions/active";

const FALLBACK_PROMOTIONS: PromotionResource[] = [
  {
    id: "fallback-burger",
    businessName: "pizza hot",
    title: "HAMBURGUESAS PROMO 2X1",
    description: "LLEVATE DOS HAMBURGUESAS AL PRECIO DE 1",
    discountAmount: 50,
    discountType: "Percentage",
    endDate: "2026-06-30T00:00:00",
    redemptionCap: 100,
    imageKey: "comida_hamburguesas",
  },
  {
    id: "fallback-chicken",
    businessName: "Hamburgueseria Pepe",
    title: "Pollo Frito + Papas",
    description: "OFERTA EXCLUSIVA ONLINE",
    discountAmount: 60,
    discountType: "Percentage",
    endDate: "2026-06-26T00:00:00",
    redemptionCap: 100,
    imageKey: "comida_pollo_frito",
  },
  {
    id: "fallback-football",
    businessName: "Hamburgueseria Pepe",
    title: "Pass Futbol Semanal",
    description: "Acceso a varios partidos con descuento.",
    discountAmount: 50,
    discountType: "Percentage",
    endDate: "2026-06-30T00:00:00",
    redemptionCap: 100,
    imageKey: "deportes_futbol",
  },
  {
    id: "fallback-health",
    businessName: "Hamburgueseria Pepe",
    title: "25% OFF en pastillas para alergias",
    description: "Descuento especial en productos seleccionados.",
    discountAmount: 25,
    discountType: "Percentage",
    endDate: "2026-06-25T00:00:00",
    redemptionCap: 100,
    imageKey: "salud_pastillas",
  },
  {
    id: "fallback-cinema",
    businessName: "Hamburgueseria Pepe",
    title: "ENTRADAS 2X1 MARTES",
    description: "SOLO LOS MARTES DE 18:00 A 23:00",
    discountAmount: 50,
    discountType: "Percentage",
    endDate: "2026-06-29T00:00:00",
    redemptionCap: 100,
    imageKey: "entretenimiento_cine",
  },
];

const PROMO_VISUALS = {
  comida_hamburguesas: {
    categoryKey: "food",
    emoji: "ðŸ”",
    background:
      "radial-gradient(circle at 24% 42%, rgba(255,184,77,0.96) 0 10%, transparent 22%), radial-gradient(circle at 68% 36%, rgba(255,231,173,0.8) 0 7%, transparent 20%), linear-gradient(135deg, #211714 0%, #6f3716 42%, #f59e0b 100%)",
    accent: "#f59e0b",
  },
  comida_pollo_frito: {
    categoryKey: "food",
    emoji: "ðŸ—",
    background:
      "radial-gradient(circle at 68% 26%, rgba(255,237,213,0.82) 0 8%, transparent 20%), linear-gradient(135deg, #3f1d0b 0%, #b45309 52%, #fb923c 100%)",
    accent: "#ea580c",
  },
  comida_ceviche: {
    categoryKey: "food",
    emoji: "ðŸŸ",
    background:
      "radial-gradient(circle at 72% 34%, rgba(255,255,255,0.9) 0 8%, transparent 20%), linear-gradient(135deg, #e0f2fe 0%, #38bdf8 45%, #0f766e 100%)",
    accent: "#0ea5e9",
  },
  deportes_futbol: {
    categoryKey: "sports",
    emoji: "âš½",
    background:
      "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.86) 0 8%, transparent 19%), linear-gradient(135deg, #020617 0%, #1d4ed8 48%, #22c55e 100%)",
    accent: "#2563eb",
  },
  salud_pastillas: {
    categoryKey: "health",
    emoji: "ðŸ’Š",
    background:
      "radial-gradient(circle at 64% 36%, rgba(255,255,255,0.92) 0 7%, transparent 19%), linear-gradient(135deg, #dbeafe 0%, #93c5fd 46%, #f87171 100%)",
    accent: "#60a5fa",
  },
  entretenimiento_cine: {
    categoryKey: "entertainment",
    emoji: "ðŸŽ¬",
    background:
      "radial-gradient(circle at 72% 22%, rgba(255,255,255,0.78) 0 6%, transparent 18%), linear-gradient(135deg, #292524 0%, #7c2d12 44%, #a78bfa 100%)",
    accent: "#a78bfa",
  },
} as const;

const DEFAULT_PROMO_VISUAL = {
  categoryKey: "food",
  emoji: "ðŸ·ï¸",
  background: "linear-gradient(135deg, #312e81 0%, #7161ef 48%, #c4b5fd 100%)",
  accent: "#7161ef",
} as const;

function getPromoVisual(imageKey: string | null | undefined) {
  return imageKey && imageKey in PROMO_VISUALS
    ? PROMO_VISUALS[imageKey as keyof typeof PROMO_VISUALS]
    : DEFAULT_PROMO_VISUAL;
}

function buildDiscountLabel(amount: number, type: string) {
  if (/percent/i.test(type)) return `${Math.round(amount)}% OFF`;
  return `${Math.round(amount)} OFF`;
}

function normalizePromotions(rawPromotions: PromotionResource[]): ConsumerPromotion[] {
  return rawPromotions
    .filter((promo) => promo.id)
    .map((promo) => {
      const imageKey = promo.imageKey ?? "comida_hamburguesas";
      const visual = getPromoVisual(imageKey);
      const discountAmount = Number(promo.discountAmount ?? 0);
      const discountType = promo.discountType ?? "Percentage";

      return {
        id: promo.id,
        businessName: promo.businessName?.trim() || "Negocio no disponible",
        title: promo.title?.trim() || "Promocion disponible",
        description: promo.description?.trim() || "Promocion activa por tiempo limitado.",
        discountAmount,
        discountType,
        discountLabel: buildDiscountLabel(discountAmount, discountType),
        endDate: promo.endDate ?? null,
        redemptionCap: promo.redemptionCap ?? 100,
        imageKey,
        categoryKey: visual.categoryKey,
      };
    });
}

function formatPromoDate(value: string | null, locale: string) {
  if (!value) return "N/D";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/D";

  return new Intl.DateTimeFormat(locale === "es" ? "es-PE" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getCategoryLabel(
  categoryKey: ConsumerPromotion["categoryKey"],
  labels: ReturnType<typeof useTranslation>["dict"]["benefits"]["consumerSimulator"]
) {
  switch (categoryKey) {
    case "sports":
      return labels.sports;
    case "health":
      return labels.health;
    case "entertainment":
      return labels.entertainment;
    default:
      return labels.food;
  }
}

/* â”€â”€ Phone mockup screens â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function B2CScreen() {
  const { dict, locale } = useTranslation();
  const labels = dict.benefits.consumerSimulator;
  const fallbackPromotions = useMemo(() => normalizePromotions(FALLBACK_PROMOTIONS), []);
  const [promotions, setPromotions] = useState<ConsumerPromotion[]>(fallbackPromotions);
  const [screen, setScreen] = useState<ConsumerSimulatorScreen>("home");
  const [selectedPromotionId, setSelectedPromotionId] = useState<string | null>(null);
  const [dataState, setDataState] = useState<"loading" | "live" | "fallback">("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPromotions() {
      try {
        const response = await fetch(ACTIVE_PROMOTIONS_ENDPOINT, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Promotion request failed: ${response.status}`);

        const data = (await response.json()) as PromotionResource[];
        const normalized = normalizePromotions(Array.isArray(data) ? data : []);

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

    loadPromotions();

    return () => controller.abort();
  }, [fallbackPromotions]);

  const groupedPromotions = useMemo(() => {
    return promotions.reduce<Record<ConsumerPromotion["categoryKey"], ConsumerPromotion[]>>(
      (acc, promo) => {
        acc[promo.categoryKey].push(promo);
        return acc;
      },
      { food: [], sports: [], health: [], entertainment: [] }
    );
  }, [promotions]);

  const selectedPromotion =
    promotions.find((promo) => promo.id === selectedPromotionId) ?? promotions[0] ?? fallbackPromotions[0];
  const heroPromotion = groupedPromotions.food[0] ?? selectedPromotion;
  const sourceLabel = dataState === "live" ? labels.sourceLive : labels.sourceFallback;

  const openDetail = (promo: ConsumerPromotion) => {
    setSelectedPromotionId(promo.id);
    setScreen("detail");
  };

  const categoryButtons = [
    { key: "food" as const, label: labels.food, promo: groupedPromotions.food[0] ?? promotions[0] },
    { key: "entertainment" as const, label: labels.entertainment, promo: groupedPromotions.entertainment[0] ?? promotions[0] },
    { key: "health" as const, label: labels.health, promo: groupedPromotions.health[0] ?? promotions[0] },
  ];

  return (
    <div className="h-full bg-white text-[#1f1f24]">
      {screen === "detail" ? (
        <ConsumerDetailScreen
          labels={labels}
          locale={locale}
          promotion={selectedPromotion}
          onBack={() => setScreen("promos")}
        />
      ) : screen === "promos" ? (
        <ConsumerPromosScreen
          labels={labels}
          groupedPromotions={groupedPromotions}
          isLoading={dataState === "loading"}
          onBack={() => setScreen("home")}
          onOpenDetail={openDetail}
          onNavigate={setScreen}
        />
      ) : (
        <ConsumerHomeScreen
          labels={labels}
          heroPromotion={heroPromotion}
          categoryButtons={categoryButtons}
          activeCount={promotions.length}
          sourceLabel={sourceLabel}
          isLoading={dataState === "loading"}
          onOpenDetail={openDetail}
          onNavigate={setScreen}
        />
      )}
    </div>
  );
}

function ConsumerStatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? "#111827" : "#ffffff";

  return (
    <div className="flex h-[23px] items-center justify-between px-[12px] pt-[4px] text-[7px] font-semibold" style={{ color }}>
      <span>4:37</span>
      <div className="flex items-center gap-[3px]" aria-hidden="true">
        <div className="flex items-end gap-[1px]">
          {[4, 6, 8, 10].map((height) => (
            <span key={height} className="block w-[2px] rounded-full" style={{ height, background: color }} />
          ))}
        </div>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 2.6C2.5 1.5 4.2 1 6 1s3.5.5 5 1.6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3.2 5C4 4.4 4.9 4.1 6 4.1S8 4.4 8.8 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="h-[7px] w-[15px] rounded-[3px]" style={{ background: color }} />
      </div>
    </div>
  );
}

function ConsumerBottomNav({
  active,
  labels,
  onNavigate,
}: {
  active: "home" | "promos";
  labels: ReturnType<typeof useTranslation>["dict"]["benefits"]["consumerSimulator"];
  onNavigate: (screen: ConsumerSimulatorScreen) => void;
}) {
  const items = [
    { key: "home" as const, label: labels.navHome, icon: HomeIcon, onClick: () => onNavigate("home") },
    { key: "favorites" as const, label: labels.navFavorites, icon: Heart, onClick: () => onNavigate("home") },
    { key: "promos" as const, label: labels.navPromos, icon: Grid3X3, onClick: () => onNavigate("promos") },
    { key: "community" as const, label: labels.navCommunity, icon: Users, onClick: () => onNavigate("home") },
  ];

  return (
    <div className="border-t border-[#eeeafb] bg-[#f4f1ff] px-[10px] pb-[8px] pt-[6px]">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const selected = item.key === active;

          return (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              className={cn(
                "flex min-w-0 flex-col items-center gap-[3px] rounded-xl py-[3px] text-[7px] transition-colors",
                selected ? "text-[#8271ef]" : "text-[#7d7d82]"
              )}
              aria-current={selected ? "page" : undefined}
            >
              <span className={cn("flex h-[19px] w-[33px] items-center justify-center rounded-full", selected && "bg-[#e6c9ff]")}>
                <Icon className="h-[12px] w-[12px]" fill={selected && item.key !== "promos" ? "currentColor" : "none"} strokeWidth={2.4} />
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mx-auto mt-[5px] h-[2px] w-[56px] rounded-full bg-[#1f1f24]/70" />
    </div>
  );
}

function PromoArtwork({
  promo,
  className,
  compact = false,
}: {
  promo: ConsumerPromotion;
  className?: string;
  compact?: boolean;
}) {
  const visual = getPromoVisual(promo.imageKey);

  return (
    <div
      className={cn("relative overflow-hidden bg-[#1f1f24]", className)}
      style={{ background: visual.background }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_28%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.28))]" />
      <span
        className={cn(
          "absolute select-none drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]",
          compact ? "bottom-2 right-2 text-[30px]" : "bottom-4 right-5 text-[62px]"
        )}
        aria-hidden="true"
      >
        {visual.emoji}
      </span>
      <div className={cn("absolute rounded-full bg-white/12 blur-md", compact ? "left-5 top-4 h-8 w-16" : "left-8 top-8 h-14 w-32")} />
    </div>
  );
}

function CouponQrMark() {
  const cells = [
    0, 1, 2, 4, 6, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 26, 29, 31, 32, 35,
  ];

  return (
    <div className="grid h-[54px] w-[54px] grid-cols-6 gap-[3px] rounded-md bg-white p-[7px]">
      {Array.from({ length: 36 }).map((_, index) => (
        <span
          key={index}
          className={cn("rounded-[1px]", cells.includes(index) ? "bg-[#cfcfd2]" : "bg-transparent")}
        />
      ))}
    </div>
  );
}

function ConsumerHomeScreen({
  labels,
  heroPromotion,
  categoryButtons,
  activeCount,
  sourceLabel,
  isLoading,
  onOpenDetail,
  onNavigate,
}: {
  labels: ReturnType<typeof useTranslation>["dict"]["benefits"]["consumerSimulator"];
  heroPromotion: ConsumerPromotion;
  categoryButtons: Array<{ key: ConsumerPromotion["categoryKey"]; label: string; promo: ConsumerPromotion }>;
  activeCount: number;
  sourceLabel: string;
  isLoading: boolean;
  onOpenDetail: (promo: ConsumerPromotion) => void;
  onNavigate: (screen: ConsumerSimulatorScreen) => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      <div className="bg-[#8271ef] text-white">
        <ConsumerStatusBar />
        <div className="flex h-[48px] items-center gap-[8px] px-[13px] pb-[8px]">
          <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-white">
            <Image src="/klippr/klippr.png" alt="Klippr" width={22} height={22} className="rounded-full" sizes="22px" />
          </div>
          <p className="min-w-0 flex-1 truncate text-[17px] font-bold leading-none">{labels.greeting}</p>
          <Bell className="h-[14px] w-[14px]" fill="currentColor" />
          <Settings className="h-[16px] w-[16px]" fill="currentColor" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-[14px] pb-[12px] pt-[10px]">
        <div className="rounded-[18px] bg-[#f8eef9] px-[14px] py-[15px] text-center">
          <p className="text-[14px] font-bold text-[#8271ef]">{labels.couponsTitle}</p>
          <div className="mt-[9px] flex items-center justify-center gap-[13px] text-[#c9bae8]">
            <ChevronLeft className="h-[17px] w-[17px]" />
            <div className="rounded-[12px] bg-white p-[12px]">
              <CouponQrMark />
            </div>
            <ChevronRight className="h-[17px] w-[17px]" />
          </div>
          <p className="mt-[9px] text-[15px] font-bold text-[#8271ef]">{labels.couponsCount}</p>
          <p className="mt-[2px] text-[9px] font-semibold text-[#8271ef]">{labels.favoritesHint}</p>
        </div>

        <div className="mt-[15px] grid grid-cols-[1fr_auto_1fr] items-center gap-[10px] px-[10px]">
          <div>
            <p className="text-[9px] font-bold leading-tight text-[#8271ef]">{labels.activePromotions}</p>
            <p className="mt-[4px] text-[20px] font-semibold leading-none text-[#202024]">{activeCount}</p>
          </div>
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[#bdf0cd] text-[#338b57]">
            <Store className="h-[15px] w-[15px]" />
          </span>
          <div>
            <p className="text-[9px] font-bold leading-tight text-[#8271ef]">{labels.usedCoupons}</p>
            <p className="mt-[4px] text-[20px] font-semibold leading-none text-[#202024]">0</p>
          </div>
        </div>

        <p className="mt-[18px] text-[15px] font-bold leading-tight text-[#8271ef]">{labels.popularStores}</p>
        <div className="mt-[13px] grid grid-cols-3 gap-[8px]">
          {categoryButtons.map((category) => {
            const visual = getPromoVisual(category.promo.imageKey);

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => {
                  onNavigate("promos");
                }}
                className="min-w-0 text-center"
              >
                <span className="mx-auto flex h-[36px] w-[36px] items-center justify-center rounded-full text-[18px]" style={{ background: `${visual.accent}33` }}>
                  {visual.emoji}
                </span>
                <span className="mt-[7px] block truncate text-[9px] font-bold text-[#8271ef]">{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-[18px] flex items-center justify-between">
          <p className="text-[15px] font-bold text-[#202024]">{labels.food}</p>
          <button type="button" onClick={() => onNavigate("promos")} className="text-[#202024]">
            <ChevronRight className="h-[16px] w-[16px]" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => onOpenDetail(heroPromotion)}
          className="relative mt-[9px] block w-full overflow-hidden rounded-[10px] text-left shadow-[0_8px_18px_rgba(0,0,0,0.14)]"
        >
          <PromoArtwork promo={heroPromotion} className="h-[86px]" compact />
          <div className="absolute left-[8px] top-[9px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black/35 text-white">
            <Share2 className="h-[11px] w-[11px]" />
          </div>
          <div className="absolute right-[8px] top-[9px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black/35 text-white">
            <Heart className="h-[11px] w-[11px]" />
          </div>
        </button>
        <p className="mt-[7px] text-center text-[7px] font-semibold text-[#8271ef]">
          {isLoading ? labels.loading : sourceLabel}
        </p>
      </div>

      <ConsumerBottomNav active="home" labels={labels} onNavigate={onNavigate} />
    </div>
  );
}

function ConsumerPromosScreen({
  labels,
  groupedPromotions,
  isLoading,
  onBack,
  onOpenDetail,
  onNavigate,
}: {
  labels: ReturnType<typeof useTranslation>["dict"]["benefits"]["consumerSimulator"];
  groupedPromotions: Record<ConsumerPromotion["categoryKey"], ConsumerPromotion[]>;
  isLoading: boolean;
  onBack: () => void;
  onOpenDetail: (promo: ConsumerPromotion) => void;
  onNavigate: (screen: ConsumerSimulatorScreen) => void;
}) {
  const groups = (["food", "sports", "health", "entertainment"] as const)
    .map((categoryKey) => ({ categoryKey, promos: groupedPromotions[categoryKey] }))
    .filter((group) => group.promos.length > 0);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      <div className="bg-[#8271ef] text-white">
        <ConsumerStatusBar />
        <div className="grid h-[45px] grid-cols-[28px_1fr_28px] items-center px-[10px] pb-[8px]">
          <button type="button" onClick={onBack} className="flex h-[24px] w-[24px] items-center justify-center">
            <ChevronLeft className="h-[15px] w-[15px]" />
          </button>
          <p className="text-center text-[13px] font-bold">{labels.promosTitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-[6px] px-[9px] py-[8px]">
        <div className="flex h-[30px] min-w-0 flex-1 overflow-hidden rounded-[7px] border border-[#ead8ff]">
          <span className="flex flex-1 items-center px-[8px] text-[8px] text-[#a7a1ad]">{labels.searchPlaceholder}</span>
          <span className="flex w-[31px] items-center justify-center bg-[#8271ef] text-white">
            <Search className="h-[12px] w-[12px]" />
          </span>
        </div>
        <button type="button" className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] border border-[#ead8ff] text-[#7d7388]">
          <SlidersHorizontal className="h-[13px] w-[13px]" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-[9px] pb-[8px]">
        {isLoading ? (
          <p className="py-8 text-center text-[9px] font-semibold text-[#8271ef]">{labels.loading}</p>
        ) : groups.length === 0 ? (
          <p className="py-8 text-center text-[9px] font-semibold text-[#8271ef]">{labels.empty}</p>
        ) : (
          <div className="space-y-[12px]">
            {groups.map(({ categoryKey, promos }) => (
              <section key={categoryKey}>
                <div className="mb-[6px] flex items-center justify-between">
                  <div className="flex min-w-0 items-center gap-[5px]">
                    <span className="h-[14px] w-[2px] rounded-full bg-[#8271ef]" />
                    <h3 className="truncate text-[11px] font-bold text-[#202024]">{getCategoryLabel(categoryKey, labels)}</h3>
                  </div>
                  <button type="button" className="text-[8px] font-medium text-[#8271ef]">{labels.more}</button>
                </div>
                <div className="-mx-[1px] flex gap-[7px] overflow-x-auto px-[1px] pb-[3px]">
                  {promos.map((promo) => (
                    <PromoCard key={promo.id} promo={promo} labels={labels} onOpenDetail={onOpenDetail} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <ConsumerBottomNav active="promos" labels={labels} onNavigate={onNavigate} />
    </div>
  );
}

function PromoCard({
  promo,
  labels,
  onOpenDetail,
}: {
  promo: ConsumerPromotion;
  labels: ReturnType<typeof useTranslation>["dict"]["benefits"]["consumerSimulator"];
  onOpenDetail: (promo: ConsumerPromotion) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpenDetail(promo)}
      className="w-[76px] shrink-0 overflow-hidden rounded-[8px] bg-white text-left shadow-[0_4px_10px_rgba(20,20,28,0.16)] ring-1 ring-black/5"
    >
      <PromoArtwork promo={promo} className="h-[58px]" compact />
      <div className="p-[5px]">
        <p className="truncate text-[6px] font-medium text-[#8271ef]">{promo.businessName}</p>
        <p className="mt-[3px] line-clamp-2 min-h-[22px] text-[8px] font-bold leading-[1.35] text-[#202024]">{promo.title}</p>
        <p className="mt-[3px] line-clamp-2 min-h-[18px] text-[6px] leading-[1.35] text-[#8b8b91]">{promo.description}</p>
        <p className="mt-[5px] flex items-center gap-[2px] text-[6px] text-[#8b8b91]">
          <Info className="h-[6px] w-[6px]" />
          {labels.details}
        </p>
      </div>
    </button>
  );
}

function ConsumerDetailScreen({
  labels,
  locale,
  promotion,
  onBack,
}: {
  labels: ReturnType<typeof useTranslation>["dict"]["benefits"]["consumerSimulator"];
  locale: string;
  promotion: ConsumerPromotion;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      <div className="relative h-[216px] shrink-0 overflow-hidden">
        <PromoArtwork promo={promotion} className="h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/10" />
        <div className="absolute left-0 right-0 top-0">
          <ConsumerStatusBar dark />
        </div>
        <div className="absolute left-[10px] right-[10px] top-[28px] flex items-center justify-between">
          <button type="button" onClick={onBack} className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[#202024] shadow-sm">
            <ChevronLeft className="h-[16px] w-[16px]" />
          </button>
          <div className="flex gap-[8px]">
            <button type="button" className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[#202024] shadow-sm">
              <Share2 className="h-[14px] w-[14px]" />
            </button>
            <button type="button" className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[#8271ef] shadow-sm">
              <Heart className="h-[14px] w-[14px]" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-[14px] py-[15px] text-center">
        <p className="text-[15px] font-bold leading-tight text-[#8271ef]">{promotion.businessName || labels.businessUnavailable}</p>
        <h3 className="mx-auto mt-[6px] max-w-[190px] text-[15px] font-extrabold leading-[1.18] text-[#202024]">{promotion.title}</h3>
        <p className="mx-auto mt-[10px] max-w-[214px] text-[8px] leading-[1.5] text-[#8b8b91]">
          {getCategoryLabel(promotion.categoryKey, labels)} Â· {promotion.description}
        </p>

        <div className="my-[12px] h-px bg-[#e5defc]" />

        <div className="flex gap-[8px] text-left">
          <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#8271ef] text-[12px] font-bold text-white">N</span>
          <div className="min-w-0">
            <p className="truncate text-[9px] font-bold text-[#202024]">
              Promocion de {promotion.businessName || labels.businessUnavailable}
            </p>
            <p className="mt-[2px] text-[8px] text-[#8b8b91]">{getCategoryLabel(promotion.categoryKey, labels)}</p>
          </div>
        </div>

        <dl className="mt-[12px] space-y-[8px] text-left text-[8px] leading-none text-[#202024]">
          <div className="flex gap-[4px]">
            <dt className="font-bold">{labels.businessLabel}:</dt>
            <dd className="min-w-0 flex-1 truncate">{promotion.businessName}</dd>
          </div>
          <div className="flex gap-[4px]">
            <dt className="font-bold">{labels.quantityLabel}:</dt>
            <dd>{labels.availableCount.replace("{count}", String(promotion.redemptionCap))}</dd>
          </div>
          <div className="flex gap-[4px]">
            <dt className="font-bold">{labels.expirationLabel}:</dt>
            <dd className="min-w-0 flex-1 truncate">{formatPromoDate(promotion.endDate, locale)}</dd>
          </div>
        </dl>
      </div>

      <div className="border-t border-[#eeeafb] bg-[#f4f1ff] px-[12px] pb-[11px] pt-[9px]">
        <div className="flex items-center gap-[10px]">
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-extrabold leading-none text-[#202024]">{promotion.discountLabel}</p>
            <p className="mt-[3px] text-[7px] text-[#8b8b91]">{labels.discountLabel}</p>
          </div>
          <button
            type="button"
            disabled
            className="h-[32px] w-[120px] rounded-full bg-[#c8bce8] text-[9px] font-bold text-white"
          >
            {labels.generateQr}
          </button>
        </div>
        <div className="mx-auto mt-[9px] h-[2px] w-[56px] rounded-full bg-[#1f1f24]/70" />
      </div>
    </div>
  );
}

/* â”€â”€ Phone mockup shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PhoneMockup({ activeTab }: { activeTab: Tab }) {
  const [visibleTab, setVisibleTab] = useState<Tab>(activeTab);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (activeTab === visibleTab) return;

    const fadeTimer = window.setTimeout(() => setOpacity(0), 0);
    const swapTimer = window.setTimeout(() => {
      setVisibleTab(activeTab);
      setOpacity(1);
    }, 150);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(swapTimer);
    };
  }, [activeTab, visibleTab]);

  /* Tall phone proportions close to the app captures */
  const W = 260;
  const H = 562;
  const FRAME = 6;           // sleeker frame thickness
  const R = 34;              // outer corner radius
  const INNER_R = R - FRAME; // inner screen radius

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: W, height: H }}
    >
      {/* â”€â”€ Left side buttons (volume + silent switch) â”€â”€ */}
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
      {/* â”€â”€ Right side power button â”€â”€ */}
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

      {/* â”€â”€ Outer frame (titanium aesthetic) â”€â”€ */}
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

      {/* â”€â”€ Screen bezel inset â”€â”€ */}
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
        {/* â”€â”€ Screen background â”€â”€ */}
        <div
          style={{
            position: "absolute",
            inset: 1, // Subtle black border around the screen inside the frame
            background: "#ffffff",
            borderRadius: INNER_R - 1,
            overflow: "clip",
          }}
        >
          {visibleTab === "b2c" ? (
            <div
              className="h-full"
              style={{
                opacity,
                transition: "opacity 150ms ease",
              }}
            >
              <B2CScreen />
            </div>
          ) : (
            <div
              className="h-full"
              style={{
                opacity,
                transition: "opacity 150ms ease",
              }}
            >
              <BusinessSimulator />
            </div>
          )}
        </div>
      </div>

      {/* â”€â”€ Ambient glow â”€â”€ */}
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


/* â”€â”€ Benefit card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€ Tab pill â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
  }, []);

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

/* â”€â”€ Main section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
          {/* LEFT â€” 2Ã—2 grid of cards (cross-dissolve on tab change) */}
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

          {/* RIGHT â€” static phone mockup, only inner screen changes */}
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
