"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { TrendingUpIcon, ClockIcon, CheckCircleIcon } from "@/components/icons";
import { useTranslation } from "@/i18n/useTranslation";

function CountUp({
                     to,
                     duration = 1.5,
                     prefix = "",
                     suffix = "",
                 }: {
    to: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // ease-out quint
            const easeOut = 1 - Math.pow(1 - progress, 5);

            setCount(Math.floor(easeOut * to));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(step);
            } else {
                setCount(to);
            }
        };

        animationFrame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrame);
    }, [to, duration, isInView]);

    return (
        <span ref={ref}>
      {prefix && <span className="text-klippr-violet">{prefix}</span>}
            {count}
            {suffix && <span className="text-klippr-violet">{suffix}</span>}
    </span>
    );
}

const TESTIMONIAL_AVATARS = [
    "/klippr/Lizbeth.png",
    "/klippr/Alexander.png",
    "/klippr/Punto-venta.png",
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export function SocialProofSection() {
    const { dict } = useTranslation();
    const testimonials = dict.socialProof.testimonials;
    const [[page, direction], setPage] = useState([0, 0]);
    const [isPaused, setIsPaused] = useState(false);

    const activeIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;

    const paginate = useCallback((newDirection: number) => {
        setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused, paginate]);

    return (
        <section id="testimonios" className="py-24 bg-white dark:bg-[#0F0F1A] overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
                <h2 className="text-center font-heading font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mb-16">
                    {dict.socialProof.heading}
                </h2>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-klippr-violet mb-4">
                            <TrendingUpIcon className="w-6 h-6" />
                        </div>
                        <div className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-2">
                            <CountUp to={3} suffix="×" />
                        </div>
                        <p className="text-slate-600 dark:text-white/70 max-w-[200px] mx-auto">
                            {dict.socialProof.stat1}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-klippr-violet mb-4">
                            <ClockIcon className="w-6 h-6" />
                        </div>
                        <div className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-2">
                            <CountUp to={3} prefix="<" suffix="s" />
                        </div>
                        <p className="text-slate-600 dark:text-white/70 max-w-[200px] mx-auto">
                            {dict.socialProof.stat2}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-klippr-violet mb-4">
                            <CheckCircleIcon className="w-6 h-6" />
                        </div>
                        <div className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-2">
                            <CountUp to={95} suffix="%+" />
                        </div>
                        <p className="text-slate-600 dark:text-white/70 max-w-[200px] mx-auto">
                            {dict.socialProof.stat3}
                        </p>
                    </motion.div>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-slate-200 dark:bg-white/10 mb-16" />

                {/* Testimonials Carousel */}
                <div
                    className="relative max-w-3xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <div className="relative h-[420px] sm:h-[350px] md:h-[280px]">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={page}
                                custom={direction}
                                initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: direction < 0 ? 100 : -100, scale: 0.95 }}
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                    scale: { duration: 0.3 },
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="absolute inset-0 z-10 w-full flex flex-col items-center text-center px-4 pt-2"
                            >
                                <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-white mb-8 italic">
                                    &ldquo;{testimonials[activeIndex].quote}&rdquo;
                                </p>

                                <div className="flex flex-col items-center">
                                    <Image
                                        src={TESTIMONIAL_AVATARS[activeIndex]}
                                        alt={`Avatar de ${testimonials[activeIndex].name}`}
                                        className="w-14 h-14 rounded-full object-cover mb-4"
                                        width={56}
                                        height={56}
                                        loading="lazy"
                                    />
                                    <div className="font-semibold text-slate-900 dark:text-white">
                                        {testimonials[activeIndex].name}
                                    </div>
                                    <div className="text-slate-500 dark:text-white/60 text-sm mb-2">
                                        {testimonials[activeIndex].role}
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-klippr-violet/10 text-klippr-violet dark:text-klippr-violet">
                    {testimonials[activeIndex].badge}
                  </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots Navigation */}
                    <div className="mt-6 flex justify-center">
                        <div className="flex items-center gap-2 rounded-full bg-white/70 dark:bg-black/20 backdrop-blur px-3 py-2 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setPage([i, i > activeIndex ? 1 : -1]);
                                    }}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors ring-1 ring-black/10 dark:ring-white/10 ${
                                        i === activeIndex
                                            ? "bg-klippr-violet shadow-[0_0_0_3px_rgba(113,97,239,0.22)] ring-klippr-violet/20"
                                            : "bg-slate-400/70 dark:bg-white/25 hover:bg-slate-500/70 dark:hover:bg-white/40"
                                    }`}
                                    aria-label={`${dict.socialProof.dotAriaLabel} ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
