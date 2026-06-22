"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Gift,
  Grid3X3,
  Home,
  List,
  Menu,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/useTranslation";
import type { Locale } from "@/i18n/dictionaries";

const DEMO_BUSINESS_ID = "f0cbee6f-ec2c-41b1-8340-7e5c1b1d003d";
const BUSINESS_PROMOTIONS_ENDPOINT = `/api/klippr/promotions/businesses/${DEMO_BUSINESS_ID}`;
const BUSINESS_REDEMPTIONS_ENDPOINT = `/api/klippr/redemptions/businesses/${DEMO_BUSINESS_ID}`;
const BUSINESS_DASHBOARD_ENDPOINT = `/api/klippr/analytics/dashboard/${DEMO_BUSINESS_ID}`;

type BusinessTab = "qr" | "home" | "list";
type DataState = "loading" | "live" | "fallback";

interface BusinessPromotionResource {
  id: string;
  businessId?: string;
  businessName?: string | null;
  title?: string | null;
  description?: string | null;
  discountAmount?: number | null;
  discountType?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  redemptionCap?: number | null;
  imageKey?: string | null;
  status?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  isActive?: boolean;
}

interface BusinessRedemptionResource {
  id: number;
  consumerId?: string;
  businessId?: string;
  promotionId?: string | null;
  code?: string | null;
  uniqueToken?: string | null;
  status?: string | null;
  validationMethod?: string | null;
  discountAppliedAmount?: number | null;
  generatedAt?: string | null;
  expiresAt?: string | null;
  redeemedAt?: string | null;
  blockedAt?: string | null;
}

interface BusinessDashboardResource {
  businessId?: string;
  totalViews?: number;
  totalRedemptions?: number;
  averageRating?: number;
  conversionRate?: number;
  totalCampaigns?: number;
}

interface BusinessPromotion {
  id: string;
  businessId: string;
  businessName: string;
  title: string;
  description: string;
  discountAmount: number;
  discountType: string;
  discountLabel: string;
  startDate: string | null;
  endDate: string | null;
  redemptionCap: number;
  imageKey: string;
  status: string;
  createdAt: string | null;
  isActive: boolean;
}

interface BusinessRedemption {
  id: number;
  promotionId: string;
  code: string;
  status: string;
  validationMethod: string;
  discountAppliedAmount: number;
  generatedAt: string | null;
  expiresAt: string | null;
  redeemedAt: string | null;
}

interface DraftPromotion {
  title: string;
  description: string;
  discountAmount: string;
  category: string;
  endDate: string;
  condition: string;
  imageKey: string;
}

const FALLBACK_BUSINESS_PROMOTIONS: BusinessPromotionResource[] = [
  {
    id: "699ea17b-29ec-4751-9685-78c93f34ee51",
    businessId: DEMO_BUSINESS_ID,
    businessName: "pizza hot",
    title: "PIZZAS GRATIS ...",
    description: "pizzas gratis para todos",
    discountAmount: 100,
    discountType: "Percentage",
    startDate: "2026-06-15T00:00:00",
    endDate: "2026-06-30T00:00:00",
    redemptionCap: 100,
    imageKey: "comida_pizza",
    status: "Published",
    createdAt: "2026-06-16T19:07:03.81",
    isActive: true,
  },
  {
    id: "a7b175dc-d10f-470e-bfbd-3c514dcda0bb",
    businessId: DEMO_BUSINESS_ID,
    businessName: "pizza hot",
    title: "CEVICHITO SIN AJI",
    description: "CEVICHE SIN AJI PARA LA GENTITA",
    discountAmount: 70,
    discountType: "Percentage",
    startDate: "2026-06-19T23:23:50.096412",
    endDate: "2026-06-30T00:00:00",
    redemptionCap: 100,
    imageKey: "comida_ceviche",
    status: "Published",
    createdAt: "2026-06-19T23:23:55.230849",
    isActive: true,
  },
  {
    id: "c55890b2-9af9-4110-82ac-2b41561b7f89",
    businessId: DEMO_BUSINESS_ID,
    businessName: "pizza hot",
    title: "HAMBURGESAS PROMO 2X1",
    description: "LLEVATE DOS HAMBURGUESAS AL PRECIO DE 1",
    discountAmount: 50,
    discountType: "Percentage",
    startDate: "2026-06-19T23:17:18.062243",
    endDate: "2026-06-30T00:00:00",
    redemptionCap: 100,
    imageKey: "comida_hamburguesas",
    status: "Published",
    createdAt: "2026-06-19T23:17:22.735534",
    isActive: true,
  },
];

const FALLBACK_BUSINESS_REDEMPTIONS: BusinessRedemptionResource[] = [
  {
    id: 18,
    businessId: DEMO_BUSINESS_ID,
    promotionId: "699ea17b-29ec-4751-9685-78c93f34ee51",
    code: "D519D19243B44F0F8387D2A9AD8BB647",
    status: "Redeemed",
    validationMethod: "ManualCode",
    discountAppliedAmount: 100,
    generatedAt: "2026-06-20T03:25:24.119+00:00",
    expiresAt: "2026-06-30T00:00:00+00:00",
    redeemedAt: "2026-06-20T03:26:15.142+00:00",
  },
  {
    id: 14,
    businessId: DEMO_BUSINESS_ID,
    promotionId: "699ea17b-29ec-4751-9685-78c93f34ee51",
    code: "A9CCCCB0591A4F00877CED90E2117896",
    status: "Generated",
    validationMethod: "QrScan",
    discountAppliedAmount: 100,
    generatedAt: "2026-06-19T20:50:16.675+00:00",
    expiresAt: "2026-06-30T00:00:00+00:00",
  },
  {
    id: 15,
    businessId: DEMO_BUSINESS_ID,
    promotionId: "c55890b2-9af9-4110-82ac-2b41561b7f89",
    code: "C19AE74D45A44F2CBA496FA3F4FF33B9",
    status: "Redeemed",
    validationMethod: "ManualCode",
    discountAppliedAmount: 50,
    generatedAt: "2026-06-19T23:40:21.607+00:00",
    expiresAt: "2026-06-30T00:00:00+00:00",
    redeemedAt: "2026-06-19T23:41:06.586+00:00",
  },
];

const FALLBACK_DASHBOARD: BusinessDashboardResource = {
  businessId: DEMO_BUSINESS_ID,
  totalViews: 284,
  totalRedemptions: 11,
  averageRating: 4.8,
  conversionRate: 18,
  totalCampaigns: 3,
};

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

const PROMO_GRADIENT_BY_KEY: Record<string, string> = {
  comida_pollo_frito: "linear-gradient(135deg, #3f1d0b 0%, #b45309 52%, #fb923c 100%)",
  entretenimiento_cine: "linear-gradient(135deg, #312e81 0%, #7c3aed 48%, #f97316 100%)",
  entretenimiento_bolos: "linear-gradient(135deg, #0f172a 0%, #2563eb 48%, #facc15 100%)",
  entretenimiento_bares: "linear-gradient(135deg, #3b0764 0%, #a855f7 48%, #fb7185 100%)",
  deportes_futbol: "linear-gradient(135deg, #064e3b 0%, #22c55e 52%, #f8fafc 100%)",
  deportes_volley: "linear-gradient(135deg, #075985 0%, #38bdf8 50%, #fef3c7 100%)",
  deportes_basket: "linear-gradient(135deg, #431407 0%, #f97316 48%, #facc15 100%)",
  salud_pastillas: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 48%, #f87171 100%)",
  salud_medicamentos: "linear-gradient(135deg, #ecfeff 0%, #06b6d4 48%, #4ade80 100%)",
};

const BUSINESS_COPY = {
  es: {
    total: "Total",
    activity: "Actividad",
    activated: "Activados",
    expired: "Expiradas",
    createdPromos: "Promociones Creadas",
    activePromos: "Promociones Activas",
    active: "Activa",
    expiredStatus: "Expirada",
    units: "{count} unid.",
    dateRange: "{start} al {end}",
    deleteLabel: "Eliminar",
    cancelLabel: "Cancelar",
    createLabel: "Crear",
    addLabel: "Agregar",
    conditionsTitle: "Condiciones de Uso",
    qrTitle: "Codigo QR",
    qrTab: "+ QR",
    homeTab: "Inicio",
    listTab: "Mi Lista",
    description: "Descripcion *",
    discount: "Descuento *",
    category: "Categoria *",
    expiration: "Fecha de Expiracion *",
    image: "Imagen promocional *",
    conditionKind: "Dias de la semana validos",
    sourceLive: "Datos en vivo",
    sourceFallback: "Demo local",
  },
  en: {
    total: "Total",
    activity: "Activity",
    activated: "Activated",
    expired: "Expired",
    createdPromos: "Created Promotions",
    activePromos: "Active Promotions",
    active: "Active",
    expiredStatus: "Expired",
    units: "{count} units",
    dateRange: "{start} to {end}",
    deleteLabel: "Delete",
    cancelLabel: "Cancel",
    createLabel: "Create",
    addLabel: "Add",
    conditionsTitle: "Use Conditions",
    qrTitle: "QR Code",
    qrTab: "+ QR",
    homeTab: "Home",
    listTab: "My List",
    description: "Description *",
    discount: "Discount *",
    category: "Category *",
    expiration: "Expiration Date *",
    image: "Promotional image *",
    conditionKind: "Valid weekdays",
    sourceLive: "Live data",
    sourceFallback: "Local demo",
  },
} as const;

const DEFAULT_DRAFT: DraftPromotion = {
  title: "50% EN CIBERS",
  description: "50% EN CIBERS, DESCUENTO UNICO",
  discountAmount: "50",
  category: "Entretenimiento",
  endDate: "2026-06-30",
  condition: "SOLO SABADOS",
  imageKey: "entretenimiento_cibercafe",
};

function buildDiscountLabel(amount: number, type: string) {
  if (/percent/i.test(type)) return `${Math.round(amount)}% OFF`;
  return `${Math.round(amount)} OFF`;
}

function normalizeBusinessPromotions(rawPromotions: BusinessPromotionResource[]): BusinessPromotion[] {
  return rawPromotions
    .filter((promotion) => Boolean(promotion.id))
    .map((promotion) => {
      const discountAmount = Number(promotion.discountAmount ?? 0);
      const discountType = promotion.discountType ?? "Percentage";

      return {
        id: promotion.id,
        businessId: promotion.businessId ?? DEMO_BUSINESS_ID,
        businessName: promotion.businessName?.trim() || "pizza hot",
        title: promotion.title?.trim() || "Promocion disponible",
        description: promotion.description?.trim() || "Promocion activa por tiempo limitado.",
        discountAmount,
        discountType,
        discountLabel: buildDiscountLabel(discountAmount, discountType),
        startDate: promotion.startDate ?? null,
        endDate: promotion.endDate ?? null,
        redemptionCap: promotion.redemptionCap ?? 100,
        imageKey: promotion.imageKey ?? "comida_pizza",
        status: promotion.status ?? "Published",
        createdAt: promotion.createdAt ?? null,
        isActive: promotion.isActive ?? /^published$/i.test(promotion.status ?? ""),
      };
    });
}

function normalizeBusinessRedemptions(rawRedemptions: BusinessRedemptionResource[]): BusinessRedemption[] {
  return rawRedemptions
    .filter((redemption) => typeof redemption.id === "number")
    .map((redemption) => ({
      id: redemption.id,
      promotionId: redemption.promotionId ?? "",
      code: redemption.code ?? "PROMBfFAfCad30D4",
      status: redemption.status ?? "Generated",
      validationMethod: redemption.validationMethod ?? "QrScan",
      discountAppliedAmount: Number(redemption.discountAppliedAmount ?? 0),
      generatedAt: redemption.generatedAt ?? null,
      expiresAt: redemption.expiresAt ?? null,
      redeemedAt: redemption.redeemedAt ?? null,
    }));
}

function formatShortDate(value: string | null, locale: Locale) {
  if (!value) return "N/D";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/D";

  return new Intl.DateTimeFormat(locale === "es" ? "es-PE" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
}

function truncateId(value: string) {
  return value.length > 27 ? `${value.slice(0, 27)}...` : value;
}

function getPromotionCounts(redemptions: BusinessRedemption[]) {
  return redemptions.reduce<Record<string, { generated: number; redeemed: number }>>((acc, redemption) => {
    if (!redemption.promotionId) return acc;
    const current = acc[redemption.promotionId] ?? { generated: 0, redeemed: 0 };
    current.generated += 1;
    if (/redeemed/i.test(redemption.status)) current.redeemed += 1;
    acc[redemption.promotionId] = current;
    return acc;
  }, {});
}

function createLocalPromotion(draft: DraftPromotion): BusinessPromotion {
  const amount = Number(draft.discountAmount) || 50;
  const now = new Date();

  return {
    id: `local-${now.getTime()}`,
    businessId: DEMO_BUSINESS_ID,
    businessName: "pizza hot",
    title: draft.title.trim() || DEFAULT_DRAFT.title,
    description: draft.description.trim() || DEFAULT_DRAFT.description,
    discountAmount: amount,
    discountType: "Percentage",
    discountLabel: buildDiscountLabel(amount, "Percentage"),
    startDate: now.toISOString(),
    endDate: `${draft.endDate}T00:00:00`,
    redemptionCap: 100,
    imageKey: draft.imageKey,
    status: "Published",
    createdAt: now.toISOString(),
    isActive: true,
  };
}

export function BusinessSimulator() {
  const { locale } = useTranslation();
  const copy = BUSINESS_COPY[locale];
  const fallbackPromotions = useMemo(() => normalizeBusinessPromotions(FALLBACK_BUSINESS_PROMOTIONS), []);
  const fallbackRedemptions = useMemo(() => normalizeBusinessRedemptions(FALLBACK_BUSINESS_REDEMPTIONS), []);
  const [activeTab, setActiveTab] = useState<BusinessTab>("home");
  const [draft, setDraft] = useState<DraftPromotion>(DEFAULT_DRAFT);
  const [creationStep, setCreationStep] = useState<"form" | "qr">("form");
  const [dataState, setDataState] = useState<DataState>("loading");
  const [remotePromotions, setRemotePromotions] = useState<BusinessPromotion[]>(fallbackPromotions);
  const [remoteRedemptions, setRemoteRedemptions] = useState<BusinessRedemption[]>(fallbackRedemptions);
  const [dashboard, setDashboard] = useState<BusinessDashboardResource>(FALLBACK_DASHBOARD);
  const [localPromotions, setLocalPromotions] = useState<BusinessPromotion[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJson<T>(url: string): Promise<T> {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Business simulator request failed: ${response.status}`);
      return response.json() as Promise<T>;
    }

    async function loadBusinessData() {
      try {
        const [promotionsResult, redemptionsResult, dashboardResult] = await Promise.allSettled([
          fetchJson<BusinessPromotionResource[]>(BUSINESS_PROMOTIONS_ENDPOINT),
          fetchJson<BusinessRedemptionResource[]>(BUSINESS_REDEMPTIONS_ENDPOINT),
          fetchJson<BusinessDashboardResource>(BUSINESS_DASHBOARD_ENDPOINT),
        ]);

        const normalizedPromotions =
          promotionsResult.status === "fulfilled" && Array.isArray(promotionsResult.value)
            ? normalizeBusinessPromotions(promotionsResult.value)
            : [];

        const normalizedRedemptions =
          redemptionsResult.status === "fulfilled" && Array.isArray(redemptionsResult.value)
            ? normalizeBusinessRedemptions(redemptionsResult.value)
            : [];

        if (normalizedPromotions.length === 0) {
          setRemotePromotions(fallbackPromotions);
          setRemoteRedemptions(normalizedRedemptions.length > 0 ? normalizedRedemptions : fallbackRedemptions);
          setDashboard(dashboardResult.status === "fulfilled" ? dashboardResult.value : FALLBACK_DASHBOARD);
          setDataState("fallback");
          return;
        }

        setRemotePromotions(normalizedPromotions);
        setRemoteRedemptions(normalizedRedemptions.length > 0 ? normalizedRedemptions : fallbackRedemptions);
        setDashboard(dashboardResult.status === "fulfilled" ? dashboardResult.value : FALLBACK_DASHBOARD);
        setDataState("live");
      } catch {
        if (controller.signal.aborted) return;
        setRemotePromotions(fallbackPromotions);
        setRemoteRedemptions(fallbackRedemptions);
        setDashboard(FALLBACK_DASHBOARD);
        setDataState("fallback");
      }
    }

    loadBusinessData();
    return () => controller.abort();
  }, [fallbackPromotions, fallbackRedemptions]);

  const promotions = useMemo(() => [...localPromotions, ...remotePromotions], [localPromotions, remotePromotions]);
  const promotionCounts = useMemo(() => getPromotionCounts(remoteRedemptions), [remoteRedemptions]);
  const activePromotions = useMemo(() => promotions.filter((promotion) => promotion.isActive), [promotions]);
  const expiredPromotions = useMemo(() => promotions.filter((promotion) => !promotion.isActive), [promotions]);
  const generatedCount = remoteRedemptions.length;
  const redeemedCount = remoteRedemptions.filter((redemption) => /redeemed/i.test(redemption.status)).length;
  const analyticsActivity = Math.max(dashboard.totalRedemptions ?? 0, generatedCount);

  const stats = [
    { label: copy.total, value: promotions.length, tone: "purple" as const },
    { label: copy.activity, value: analyticsActivity, tone: "green" as const },
    { label: copy.activated, value: redeemedCount, tone: "blue" as const },
    { label: copy.expired, value: expiredPromotions.length, tone: "amber" as const },
  ];

  const handleCreate = () => {
    const promotion = createLocalPromotion(draft);
    setLocalPromotions((current) => [promotion, ...current]);
    setCreationStep("qr");
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white text-[#17171c]">
      <BusinessTopBar activeTab={activeTab} onBack={() => setActiveTab("home")} />

      {activeTab === "home" ? (
        <BusinessHomeScreen
          copy={copy}
          locale={locale}
          stats={stats}
          promotions={promotions}
          dataState={dataState}
          promotionCounts={promotionCounts}
        />
      ) : activeTab === "qr" ? (
        <BusinessQrScreen
          copy={copy}
          draft={draft}
          locale={locale}
          creationStep={creationStep}
          onDraftChange={setDraft}
          onCreate={handleCreate}
          onCancel={() => setCreationStep("form")}
        />
      ) : (
        <BusinessListScreen
          copy={copy}
          locale={locale}
          promotions={activePromotions.length > 0 ? activePromotions : promotions}
          promotionCounts={promotionCounts}
        />
      )}

      <BusinessBottomNav activeTab={activeTab} copy={copy} onTabChange={setActiveTab} />
    </div>
  );
}

function BusinessStatusBar() {
  return (
    <div className="relative flex h-[25px] items-center justify-between px-[13px] pt-[5px] text-[8px] font-semibold text-white">
      <span>12:34</span>
      <span className="flex items-center gap-[4px]" aria-hidden="true">
        <span className="flex items-end gap-[1px]">
          {[4, 6, 8, 10].map((height) => (
            <span key={height} className="block w-[2px] rounded-full bg-white" style={{ height }} />
          ))}
        </span>
        <span className="h-[7px] w-[15px] rounded-[3px] bg-white" />
      </span>
    </div>
  );
}

function BusinessTopBar({ activeTab, onBack }: { activeTab: BusinessTab; onBack: () => void }) {
  const isHome = activeTab === "home";
  const title = activeTab === "qr" ? "+ QR" : activeTab === "list" ? "Mi Lista" : "Klippr";

  return (
    <header className="shrink-0 bg-[#8572ee] text-white">
      <BusinessStatusBar />
      <div className={cn("grid h-[52px] items-center px-[13px] pb-[9px]", isHome ? "grid-cols-[36px_1fr_54px]" : "grid-cols-[28px_1fr_28px]")}>
        {isHome ? (
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white">
            <Image src="/klippr/klippr.png" alt="Klippr" width={22} height={22} className="rounded-full" sizes="22px" />
          </span>
        ) : (
          <button type="button" onClick={onBack} aria-label="Volver al inicio" className="flex h-[24px] w-[24px] items-center justify-center">
            <ArrowLeft className="h-[15px] w-[15px]" />
          </button>
        )}
        <h3 className="truncate text-center text-[17px] font-bold leading-none">{title}</h3>
        {isHome ? (
          <div className="flex justify-end gap-[10px]">
            <Grid3X3 className="h-[13px] w-[13px]" />
            <Gift className="h-[14px] w-[14px]" />
          </div>
        ) : (
          <span />
        )}
      </div>
    </header>
  );
}

function BusinessHomeScreen({
  copy,
  locale,
  stats,
  promotions,
  dataState,
  promotionCounts,
}: {
  copy: (typeof BUSINESS_COPY)[Locale];
  locale: Locale;
  stats: Array<{ label: string; value: number; tone: "purple" | "green" | "blue" | "amber" }>;
  promotions: BusinessPromotion[];
  dataState: DataState;
  promotionCounts: Record<string, { generated: number; redeemed: number }>;
}) {
  return (
    <main className="iphone-scroll min-h-0 flex-1 overflow-y-auto px-[15px] pb-[12px] pt-[13px]">
      <div className="grid grid-cols-2 gap-[11px]">
        {stats.map((stat, index) => (
          <BusinessStatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      <div className="mt-[18px] flex items-center justify-center gap-[7px]">
        <h4 className="text-[15px] font-bold text-[#8572ee]">{copy.createdPromos}</h4>
        <span className="rounded-full bg-[#efe7ff] px-[6px] py-[2px] text-[6px] font-bold text-[#8572ee]">
          {dataState === "live" ? copy.sourceLive : copy.sourceFallback}
        </span>
      </div>

      <div className="mt-[13px] space-y-[11px]">
        {promotions.slice(0, 3).map((promotion) => (
          <BusinessPromotionCard
            key={promotion.id}
            copy={copy}
            locale={locale}
            promotion={promotion}
            counts={promotionCounts[promotion.id]}
          />
        ))}
      </div>
    </main>
  );
}

function BusinessStatCard({
  stat,
  index,
}: {
  stat: { label: string; value: number; tone: "purple" | "green" | "blue" | "amber" };
  index: number;
}) {
  const iconStyles = {
    purple: "bg-[#e8cdf9] text-[#9b60ef]",
    green: "bg-[#bbefcf] text-[#33a463]",
    blue: "bg-[#cdeeff] text-[#278fc6]",
    amber: "bg-[#ffe0a7] text-[#d68b21]",
  };
  const icons = [Gift, ArrowUpRight, Check, CalendarDays];
  const Icon = icons[index] ?? Gift;

  return (
    <div className="min-h-[64px] rounded-[12px] bg-white px-[12px] py-[12px] shadow-[0_8px_18px_rgba(25,25,30,0.08)]">
      <div className="flex items-center justify-between gap-[8px]">
        <div>
          <p className="text-[9px] font-medium text-[#8572ee]">{stat.label}</p>
          <p className="mt-[7px] text-[21px] font-semibold leading-none text-[#15151a]">{stat.value}</p>
        </div>
        <span className={cn("flex h-[28px] w-[28px] items-center justify-center rounded-[8px]", iconStyles[stat.tone])}>
          <Icon className="h-[14px] w-[14px]" />
        </span>
      </div>
    </div>
  );
}

function BusinessListScreen({
  copy,
  locale,
  promotions,
  promotionCounts,
}: {
  copy: (typeof BUSINESS_COPY)[Locale];
  locale: Locale;
  promotions: BusinessPromotion[];
  promotionCounts: Record<string, { generated: number; redeemed: number }>;
}) {
  return (
    <main className="iphone-scroll min-h-0 flex-1 overflow-y-auto px-[13px] pb-[12px] pt-[17px]">
      <h4 className="text-center text-[16px] font-bold text-[#8572ee]">{copy.activePromos}</h4>
      <div className="mt-[15px] space-y-[12px]">
        {promotions.slice(0, 4).map((promotion) => (
          <BusinessPromotionCard
            key={promotion.id}
            copy={copy}
            locale={locale}
            promotion={promotion}
            counts={promotionCounts[promotion.id]}
          />
        ))}
      </div>
    </main>
  );
}

function BusinessQrScreen({
  copy,
  draft,
  locale,
  creationStep,
  onDraftChange,
  onCreate,
  onCancel,
}: {
  copy: (typeof BUSINESS_COPY)[Locale];
  draft: DraftPromotion;
  locale: Locale;
  creationStep: "form" | "qr";
  onDraftChange: (draft: DraftPromotion) => void;
  onCreate: () => void;
  onCancel: () => void;
}) {
  if (creationStep === "qr") {
    return (
      <main className="iphone-scroll min-h-0 flex-1 overflow-y-auto px-[13px] pb-[12px] pt-[10px]">
        <section>
          <div className="mb-[10px] flex items-center justify-between">
            <h4 className="flex items-center gap-[6px] text-[12px] font-bold text-[#8572ee]">
              <span className="h-[18px] w-[2px] rounded-full bg-[#8572ee]" />
              {copy.conditionsTitle}
            </h4>
            <button type="button" className="flex h-[25px] items-center gap-[5px] rounded-full bg-[#8572ee] px-[11px] text-[8px] font-bold text-white">
              <Plus className="h-[10px] w-[10px]" />
              {copy.addLabel}
            </button>
          </div>

          <div className="rounded-[7px] border border-dashed border-[#c99fff] p-[8px]">
            <div className="flex items-center gap-[7px]">
              <div className="flex min-h-[33px] flex-1 items-center justify-between rounded-[5px] border border-[#e6e1ef] px-[9px] text-[7px] text-[#17171c]">
                {copy.conditionKind}
                <Menu className="h-[10px] w-[10px] text-[#77717f]" />
              </div>
              <Trash2 className="h-[12px] w-[12px] text-[#ef4444]" />
            </div>
            <input
              value={draft.condition}
              onChange={(event) => onDraftChange({ ...draft, condition: event.target.value.toUpperCase() })}
              className="mt-[8px] h-[34px] w-full rounded-[6px] border border-[#8572ee] px-[9px] text-[8px] font-medium uppercase outline-none"
            />
          </div>
        </section>

        <section className="mt-[16px]">
          <h4 className="flex items-center gap-[6px] text-[12px] font-bold text-[#8572ee]">
            <span className="h-[18px] w-[2px] rounded-full bg-[#8572ee]" />
            {copy.qrTitle}
          </h4>
          <div className="mt-[9px] rounded-[10px] bg-[#e8c8fb] px-[16px] py-[14px]">
            <div className="flex items-start justify-between">
              <div>
                <div className="rounded-[10px] bg-white p-[15px] shadow-[0_6px_14px_rgba(75,41,98,0.16)]">
                  <BusinessQrMark />
                </div>
                <p className="mt-[8px] text-center text-[8px] font-extrabold text-black">PROMBfFAfCad30D4</p>
              </div>
              <button
                type="button"
                aria-label="Regenerar codigo QR"
                className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white text-[#8572ee]"
              >
                <RefreshCw className="h-[12px] w-[12px]" />
              </button>
            </div>
          </div>
        </section>

        <div className="mt-[20px] grid grid-cols-2 gap-[10px]">
          <button
            type="button"
            onClick={onCancel}
            className="h-[44px] rounded-full border border-[#8572ee] text-[10px] font-bold text-[#c99fe2]"
          >
            {copy.cancelLabel}
          </button>
          <button
            type="button"
            onClick={onCreate}
            className="h-[44px] rounded-full bg-[#8572ee] text-[10px] font-bold text-white shadow-[0_5px_12px_rgba(113,97,239,0.3)]"
          >
            {copy.createLabel}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="iphone-scroll min-h-0 flex-1 overflow-y-auto px-[13px] pb-[12px] pt-[10px]">
      <input
        value={draft.title}
        onChange={(event) => onDraftChange({ ...draft, title: event.target.value.toUpperCase() })}
        className="h-[45px] w-full rounded-[7px] bg-[#f1ecf8] px-[12px] text-[8px] uppercase outline-none"
      />

      <label className="mt-[12px] block text-[8px] font-medium text-[#8572ee]">
        {copy.description}
        <textarea
          value={draft.description}
          onChange={(event) => onDraftChange({ ...draft, description: event.target.value.toUpperCase() })}
          className="mt-[7px] h-[78px] w-full resize-none rounded-[8px] bg-[#f1ecf8] px-[12px] py-[10px] text-[8px] uppercase text-[#17171c] outline-none"
        />
      </label>

      <div className="mt-[12px] grid grid-cols-2 gap-[9px]">
        <label className="block text-[8px] font-medium text-[#8572ee]">
          {copy.discount}
          <input
            value={draft.discountAmount}
            onChange={(event) => onDraftChange({ ...draft, discountAmount: event.target.value.replace(/\D/g, "").slice(0, 3) })}
            className="mt-[7px] h-[46px] w-full rounded-[8px] bg-[#f1ecf8] px-[12px] text-[9px] text-[#17171c] outline-none"
          />
        </label>
        <label className="block text-[8px] font-medium text-[#8572ee]">
          {copy.category}
          <div className="mt-[7px] flex h-[46px] items-center justify-between rounded-[8px] bg-[#f1ecf8] px-[12px] text-[8px] text-[#17171c]">
            {draft.category}
            <Menu className="h-[11px] w-[11px] text-[#77717f]" />
          </div>
        </label>
      </div>

      <label className="mt-[12px] block text-[8px] font-medium text-[#8572ee]">
        {copy.expiration}
        <div className="mt-[7px] flex h-[46px] items-center justify-between rounded-[8px] bg-[#f1ecf8] px-[12px] text-[9px] text-[#17171c]">
          {formatShortDate(`${draft.endDate}T00:00:00`, locale)}
          <CalendarDays className="h-[13px] w-[13px] text-[#77717f]" />
        </div>
      </label>

      <label className="mt-[12px] block text-[8px] font-medium text-[#8572ee]">
        {copy.image}
        <div className="mt-[7px] overflow-hidden rounded-[8px] bg-[#f1ecf8]">
          <BusinessPromoImage imageKey={draft.imageKey} className="h-[122px]" priority />
          <div className="flex h-[35px] items-center justify-between px-[12px] text-[8px] font-bold text-[#17171c]">
            Cibercafe
            <Grid3X3 className="h-[13px] w-[13px] text-[#8572ee]" />
          </div>
        </div>
      </label>

      <div className="mt-[13px] grid grid-cols-2 gap-[10px]">
        <button type="button" className="h-[40px] rounded-full border border-[#8572ee] text-[10px] font-bold text-[#c99fe2]">
          {copy.cancelLabel}
        </button>
        <button type="button" onClick={onCreate} className="h-[40px] rounded-full bg-[#8572ee] text-[10px] font-bold text-white shadow-[0_5px_12px_rgba(113,97,239,0.3)]">
          {copy.createLabel}
        </button>
      </div>
    </main>
  );
}

function BusinessPromotionCard({
  copy,
  locale,
  promotion,
  counts,
}: {
  copy: (typeof BUSINESS_COPY)[Locale];
  locale: Locale;
  promotion: BusinessPromotion;
  counts?: { generated: number; redeemed: number };
}) {
  const startDate = formatShortDate(promotion.startDate, locale);
  const endDate = formatShortDate(promotion.endDate, locale);
  const generated = counts?.generated ?? 0;

  return (
    <article className="overflow-hidden rounded-[13px] bg-white px-[11px] pb-[10px] pt-[12px] shadow-[0_8px_19px_rgba(25,25,30,0.13)]">
      <div className="mb-[9px] flex items-start justify-between gap-[8px]">
        <h5 className="min-w-0 flex-1 truncate text-[18px] font-extrabold uppercase leading-none text-[#8572ee]">
          {promotion.title}
        </h5>
        <span className={cn("shrink-0 rounded-full px-[10px] py-[6px] text-[9px] font-bold", promotion.isActive ? "bg-[#c8f0d7] text-[#0d9a4a]" : "bg-[#ffe0a7] text-[#af6b16]")}>
          {promotion.isActive ? copy.active : copy.expiredStatus}
        </span>
      </div>

      <BusinessPromoImage imageKey={promotion.imageKey} className="h-[129px] rounded-[9px]" />

      <p className="mt-[10px] truncate text-[10px] text-[#17171c]">{promotion.description}</p>
      <div className="mt-[10px] flex flex-wrap gap-[7px]">
        <span className="rounded-full bg-[#efa7e8] px-[9px] py-[4px] text-[8px] font-semibold text-[#a456ad]">
          {copy.units.replace("{count}", String(promotion.redemptionCap))}
        </span>
        <span className="rounded-full bg-[#b9dcf8] px-[9px] py-[4px] text-[8px] font-semibold text-[#39709f]">
          {copy.dateRange.replace("{start}", startDate).replace("{end}", endDate)}
        </span>
        <span className="rounded-full bg-[#f2e9a7] px-[9px] py-[4px] text-[8px] font-semibold text-[#9f912f]">
          {promotion.discountLabel}
        </span>
      </div>

      <div className="mt-[10px] border-t border-[#eadff8] pt-[9px]">
        <div className="flex items-center justify-between gap-[8px]">
          <div className="min-w-0">
            <p className="truncate text-[8px] font-bold text-black">{truncateId(promotion.id)}</p>
            {generated > 0 && <p className="mt-[4px] text-[8px] text-[#17171c]">Canjes: {generated}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-[11px]">
            <X className="h-[15px] w-[15px] rounded-full border border-[#f59e0b] p-[2px] text-[#f59e0b]" />
            <Trash2 className="h-[15px] w-[15px] text-[#ef4444]" />
          </div>
        </div>
      </div>
    </article>
  );
}

function BusinessPromoImage({ imageKey, className, priority = false }: { imageKey: string; className?: string; priority?: boolean }) {
  const src = PROMO_IMAGE_BY_KEY[imageKey];

  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-[#f1ecf8]", className)}>
        <Image src={src} alt="" fill className="object-cover" sizes="230px" priority={priority} />
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden bg-[#1f1f24]", className)}
      style={{ background: PROMO_GRADIENT_BY_KEY[imageKey] ?? "linear-gradient(135deg, #312e81 0%, #7161ef 48%, #c4b5fd 100%)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_28%),linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.28))]" />
    </div>
  );
}

function BusinessQrMark() {
  const cells = new Set([
    0, 1, 2, 4, 6, 8, 10, 12, 13, 14, 16, 18, 20, 21, 23, 24, 25, 28, 30, 31,
    34, 36, 38, 39, 40, 42, 44, 45, 48,
  ]);

  return (
    <div className="grid h-[104px] w-[104px] grid-cols-7 gap-[5px] bg-white p-[16px]">
      {Array.from({ length: 49 }).map((_, index) => (
        <span key={index} className={cn("block", cells.has(index) ? "bg-black" : "bg-transparent")} />
      ))}
    </div>
  );
}

function BusinessBottomNav({
  activeTab,
  copy,
  onTabChange,
}: {
  activeTab: BusinessTab;
  copy: (typeof BUSINESS_COPY)[Locale];
  onTabChange: (tab: BusinessTab) => void;
}) {
  const items = [
    { key: "qr" as const, label: copy.qrTab, icon: Grid3X3 },
    { key: "home" as const, label: copy.homeTab, icon: Home },
    { key: "list" as const, label: copy.listTab, icon: List },
  ];

  return (
    <nav className="shrink-0 border-t border-[#f0e8f8] bg-white px-[20px] pb-[8px] pt-[6px]">
      <div className="grid grid-cols-3 items-center gap-[10px]">
        {items.map((item) => {
          const Icon = item.icon;
          const selected = item.key === activeTab;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onTabChange(item.key)}
              className={cn("flex min-w-0 flex-col items-center gap-[3px] text-[7px] transition-colors", selected ? "text-[#8572ee]" : "text-[#6f6f75]")}
              aria-current={selected ? "page" : undefined}
            >
              <span className={cn("flex h-[22px] w-[40px] items-center justify-center rounded-full", selected && "bg-[#e7c4ff]")}>
                <Icon className="h-[13px] w-[13px]" fill={selected && item.key === "home" ? "currentColor" : "none"} />
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mx-auto mt-[7px] h-[2px] w-[58px] rounded-full bg-[#17171c]/70" />
    </nav>
  );
}
