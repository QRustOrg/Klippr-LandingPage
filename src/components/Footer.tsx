"use client";

import  Link from "next/link";
import { motion } from "framer-motion";
import { LinkedInIcon, KlipprScissorsIcon, GithubIcon } from "./icons";
import { useTranslation } from "@/i18n/useTranslation";

const SlimeMascot = () => {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "50px" }}
            className="absolute bottom-0 right-4 md:right-8 z-10 pointer-events-none"
        >
            <svg
                className="w-16 h-16 md:w-24 md:h-24 drop-shadow-2xl"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Waving Arm (behind body) */}
                <motion.path
                    d="M75 65 Q 95 45 90 25"
                    stroke="#957fef"
                    strokeWidth="14"
                    strokeLinecap="round"
                    style={{ transformOrigin: "75px 65px" }}
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Slime Body */}
                <path
                    d="M20 75C20 45 40 35 50 35C60 35 80 45 80 75C80 90 70 95 50 95C30 95 20 90 20 75Z"
                    fill="#7161ef"
                />
                {/* Eyes */}
                <circle cx="40" cy="60" r="4.5" fill="white" />
                <circle cx="60" cy="60" r="4.5" fill="white" />
                <circle cx="39" cy="59" r="2" fill="#0F0F1A" />
                <circle cx="59" cy="59" r="2" fill="#0F0F1A" />
                {/* Smile */}
                <path
                    d="M45 70Q50 76 55 70"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
        </motion.div>
    );
};

export function Footer() {
    const { dict } = useTranslation();
    return (
        <footer className="relative bg-gradient-to-b from-[#423796] to-[#0F0F1A] pt-24 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-20">
                <h2 className="text-center font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mt-16 mb-18">
                    {dict.footer.cta}
                </h2>

                <div className="flex justify-center mb-24">
                    <Link
                        href="https://github.com/QRustOrg/Klippr-LandingPage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white text-black rounded-full px-6 py-3 font-semibold text-sm hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl"
                    >
                        <GithubIcon className="w-6 h-6" />
                        <span>{dict.footer.githubButton}</span>
                    </Link>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-white/10 mb-16" />

                {/* Real Footer (3 columns) */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                    {/* Logo */}
                    <div className="flex-1 flex justify-center md:justify-start">
                        <Link href="/public" className="flex items-center gap-2">
                            <KlipprScissorsIcon className="w-8 h-8 text-white" />
                            <span className="text-white text-xl font-bold font-heading tracking-tight">Klippr</span>
                        </Link>
                    </div>

                    {/* Legal Links */}
                    <div className="flex-1 flex justify-center md:justify-end gap-6">
                        <Link
                            href="/terms"
                            className="text-white/60 text-xs hover:text-white transition-colors"
                        >
                            {dict.footer.terms}
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-white/60 text-xs hover:text-white transition-colors"
                        >
                            {dict.footer.privacy}
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-white/60 text-xs pb-10">
                    {dict.footer.copyright}
                </div>
            </div>

            <SlimeMascot />
        </footer>
    );
}
