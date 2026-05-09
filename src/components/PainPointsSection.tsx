"use client";

import { motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrokenQRIcon, QuestionBubbleIcon, BlindChartIcon } from "./icons";
import { useTranslation } from "@/i18n/useTranslation";

/* ── Animation constants ─────────────────────────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-80px" } as const;

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const fadeScale = {
    hidden: { opacity: 0, scale: 0.88, y: 16 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

const numeralFromLeft = {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const numeralFromRight = {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const bridgeReveal = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

/* ── Data ──────────────────────────────────────────────────────────── */

const PAIN_POINTS_META = [
    { id: "reutilizado",     numeral: "01", Icon: BrokenQRIcon,     reversed: false },
    { id: "sin-respaldo",   numeral: "02", Icon: QuestionBubbleIcon, reversed: true  },
    { id: "campanas-ciegas", numeral: "03", Icon: BlindChartIcon,    reversed: false },
];

/* ── Component ─────────────────────────────────────────────────────── */

export function PainPointsSection() {
    const { dict } = useTranslation();
    return (
        <MotionConfig reducedMotion="user">
            <section
                id="pain-points"
                className="relative w-full py-24 md:py-36 px-6 md:px-10 bg-[#F8F8FB] dark:bg-[#0A0A14]"
            >
                {/* Dark-mode gradient overlay */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden dark:block"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 50% at 50% 100%, #7161ef15 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-10 max-w-[1200px] mx-auto">

                    {/* ── Header ── */}
                    <motion.div
                        className="mb-20 md:mb-28"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                    >
                        <motion.p
                            variants={fadeUp}
                            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-white/35 mb-5"
                        >
                            {dict.painPoints.label}
                        </motion.p>
                        <motion.h2
                            variants={fadeUp}
                            className="font-heading font-bold text-[#1a1a1a] dark:text-white leading-[1.05] tracking-tight text-[clamp(36px,5vw,56px)]"
                        >
                            {dict.painPoints.heading}
                        </motion.h2>
                    </motion.div>

                    {/* ── Pain rows ── */}
                    <div className="flex flex-col divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                        {PAIN_POINTS_META.map(({ id, numeral, Icon, reversed }, i) => {
                            const { label, headline, copy } = dict.painPoints.items[i];
                            return (
                                <motion.div
                                    key={id}
                                    variants={staggerContainer}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={VIEWPORT}
                                    className={cn(
                                        "grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center",
                                        "py-16 md:py-24",
                                    )}
                                >
                                    {/* Col A — Icon + ghost numeral */}
                                    <div
                                        className={cn(
                                            "relative flex items-center justify-center min-h-[280px] md:min-h-[380px]",
                                            reversed && "md:order-2",
                                        )}
                                    >
                                        {/* Ghost numeral */}
                                        <motion.span
                                            aria-hidden="true"
                                            variants={reversed ? numeralFromRight : numeralFromLeft}
                                            className={cn(
                                                "absolute font-heading font-black leading-none select-none pointer-events-none",
                                                "text-black/[0.055] dark:text-white/[0.055]",
                                                reversed ? "bottom-0 right-0" : "bottom-0 left-0",
                                            )}
                                            style={{ fontSize: "clamp(96px,14vw,172px)", lineHeight: 1 }}
                                        >
                                            {numeral}
                                        </motion.span>

                                        {/* Icon container — no border, hover lifts */}
                                        <motion.div
                                            variants={fadeScale}
                                            whileHover={{ scale: 1.05, y: -6 }}
                                            transition={{ type: "spring", stiffness: 340, damping: 22 }}
                                            className="relative z-10 w-full max-w-[280px] md:max-w-[320px] aspect-square
                               rounded-3xl flex items-center justify-center cursor-default
                               bg-gradient-to-br from-[#7161ef]/10 to-[#7161ef]/4
                               dark:from-[#7161ef]/15 dark:to-transparent"
                                        >
                                            {/* Hover glow bloom */}
                                            <motion.div
                                                aria-hidden="true"
                                                className="absolute inset-0 rounded-3xl pointer-events-none"
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                                transition={{ duration: 0.25 }}
                                                style={{
                                                    background:
                                                        "radial-gradient(circle at 50% 50%, #7161ef25 0%, transparent 70%)",
                                                }}
                                            />
                                            <Icon className="relative z-10 w-32 h-32 md:w-40 md:h-40" />
                                        </motion.div>
                                    </div>

                                    {/* Col B — Text content */}
                                    <div className={cn("flex flex-col gap-5", reversed && "md:order-1")}>
                                        <motion.p
                                            variants={fadeUp}
                                            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-white/35"
                                        >
                                            {label}
                                        </motion.p>
                                        <motion.h3
                                            variants={fadeUp}
                                            className="font-heading font-bold text-[#1a1a1a] dark:text-white leading-[1.1] text-[clamp(32px,4.5vw,52px)]"
                                        >
                                            {headline}
                                        </motion.h3>
                                        <motion.p
                                            variants={fadeUp}
                                            className="text-[16px] md:text-[17px] text-[#6b7280] dark:text-white/60 leading-relaxed max-w-[36ch]"
                                        >
                                            {copy}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ── Bridge — first & only violet moment ── */}
                    <motion.div
                        variants={bridgeReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                        className="mt-24 md:mt-32"
                    >
                        <div className="w-12 h-px bg-gray-900/10 dark:bg-white/10 mb-12" />
                        <p className="font-heading font-bold text-[#7161ef] leading-[1.05] text-[clamp(28px,5vw,56px)]">
                            {dict.painPoints.bridge.split("\n").map((line, i) => (
                                <span key={i}>{line}{i === 0 && <br />}</span>
                            ))}
                        </p>
                    </motion.div>

                </div>
            </section>
        </MotionConfig>
    );
}
