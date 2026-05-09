"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleProvider";

export function LanguageToggle() {
    const { locale, setLocale } = useLocale();

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50"
        >
            <div
                className="flex items-center gap-0.5 rounded-full p-1 shadow-lg"
                style={{
                    background: "rgba(255,255,255,0.92)",
                    border: "1px solid rgba(113,97,239,0.2)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(113,97,239,0.08)",
                }}
                role="group"
                aria-label="Language selector"
            >
                {(["es", "en"] as const).map((lang) => {
                    const active = locale === lang;
                    return (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => setLocale(lang)}
                            aria-pressed={active}
                            className="relative rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7161ef]"
                            style={{
                                color: active ? "white" : "#9ca3af",
                                background: "transparent",
                            }}
                        >
                            {active && (
                                <motion.span
                                    layoutId="lang-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{ background: "#7161ef" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{lang.toUpperCase()}</span>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}
