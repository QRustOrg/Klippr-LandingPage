"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { KlipprScissorsIcon } from "@/components/icons";
import { useTranslation } from "@/i18n/useTranslation";

type StatusType = "check" | "cross" | "partial" | "none";

interface RowStatus {
    tradicional: StatusType;
    superapp: StatusType;
    klippr: StatusType;
}

const ROW_STATUSES: RowStatus[] = [
    { tradicional: "cross",   superapp: "cross",   klippr: "check" },
    { tradicional: "cross",   superapp: "partial", klippr: "check" },
    { tradicional: "cross",   superapp: "cross",   klippr: "check" },
    { tradicional: "none",    superapp: "none",    klippr: "check" },
    { tradicional: "cross",   superapp: "cross",   klippr: "check" },
    { tradicional: "check",   superapp: "cross",   klippr: "check" },
];

const AnimatedCheck = () => (
    <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/20 text-green-500"
    >
        <Check className="w-4 h-4" strokeWidth={3} />
    </motion.div>
);

const StaticCross = () => (
    <div className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-500/20 text-red-500">
        <X className="w-4 h-4" strokeWidth={3} />
    </div>
);

function PartialStatus() {
    const { dict } = useTranslation();
    return (
        <div className="relative group flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-500 cursor-help">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 text-xs text-white bg-slate-900 rounded-lg shadow-lg z-10 text-center">
                {dict.comparison.tooltipPartial}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
            </div>
        </div>
    );
}

const StatusIcon = ({ status }: { status: StatusType }) => {
    switch (status) {
        case "check":
            return <AnimatedCheck />;
        case "cross":
            return <StaticCross />;
        case "partial":
            return <PartialStatus />;
        default:
            return <div className="w-6 h-6 shrink-0" />;
    }
};

const CellContent = ({ status, text, align = "center", isHighlight = false }: { status: StatusType; text: string; align?: "left" | "center"; isHighlight?: boolean }) => (
    <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : "justify-start"}`}>
        {status !== "none" && <StatusIcon status={status} />}
        <span className={`text-sm ${isHighlight ? "font-medium text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
      {text}
    </span>
    </div>
);

export function ComparisonSection() {
    const { dict } = useTranslation();
    const rows = dict.comparison.rows;
    return (
        <section id="comparacion" className="py-24 bg-white dark:bg-background">
            <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-900 dark:text-white mb-4">
                        {dict.comparison.heading}
                    </h2>
                    <p className="text-lg text-[#6B6B80]">{dict.comparison.subheading}</p>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="text-left p-5 w-[28%] font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">
                                {dict.comparison.colFeature}
                            </th>
                            <th className="text-center p-5 w-[24%] font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                {dict.comparison.colTraditional}
                            </th>
                            <th className="text-center p-5 w-[24%] font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 border-r border-slate-100 dark:border-slate-800">
                                {dict.comparison.colSuperapp}
                            </th>
                            <th className="text-center p-5 w-[24%] font-bold text-klippr-violet border-t-[3px] border-t-klippr-violet bg-[#7161ef]/[0.08] border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-center gap-2">
                                    <KlipprScissorsIcon className="w-5 h-5 text-klippr-violet" />
                                    {dict.comparison.colKlippr}
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
                            >
                                <td className="p-5 font-medium text-slate-900 dark:text-white">
                                    {row.feature}
                                </td>
                                <td className="p-5 text-center">
                                    <CellContent status={ROW_STATUSES[i].tradicional} text={row.tradicional} />
                                </td>
                                <td className="p-5 text-center border-r border-slate-100 dark:border-slate-800">
                                    <CellContent status={ROW_STATUSES[i].superapp} text={row.superapp} />
                                </td>
                                <td className="p-5 text-center bg-[#7161ef]/[0.08]">
                                    <CellContent status={ROW_STATUSES[i].klippr} text={row.klippr} isHighlight />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Stack Cards */}
                <div className="lg:hidden space-y-6">
                    {rows.map((row, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
                        >
                            <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-3 border-b border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">
                                {row.feature}
                            </div>
                            <div className="p-4 space-y-5">
                                <div className="flex items-start gap-3">
                                    <StatusIcon status={ROW_STATUSES[idx].tradicional} />
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">
                                            {dict.comparison.colTraditional}
                                        </div>
                                        <div className="text-sm text-slate-700 dark:text-slate-300">
                                            {row.tradicional}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <StatusIcon status={ROW_STATUSES[idx].superapp} />
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-0.5">
                                            {dict.comparison.colSuperapp}
                                        </div>
                                        <div className="text-sm text-slate-700 dark:text-slate-300">
                                            {row.superapp}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 bg-[#7161ef]/[0.08] p-3 rounded-lg border border-klippr-violet/20">
                                    <StatusIcon status={ROW_STATUSES[idx].klippr} />
                                    <div>
                                        <div className="text-[10px] text-klippr-violet uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1">
                                            <KlipprScissorsIcon className="w-3 h-3" />
                                            {dict.comparison.colKlippr}
                                        </div>
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                                            {row.klippr}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
