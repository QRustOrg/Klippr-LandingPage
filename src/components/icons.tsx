import { SVGProps, ReactElement } from "react";

type SVGComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;

export const InstructLogoIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="32" height="32" rx="6" fill="#1a1a1a" />
        <path d="M12 10L22 16L12 22V10Z" fill="white" />
    </svg>
);

export const KlipprScissorsIcon: SVGComponent = (props) => (
    <img src="/klippr/klippr.png" alt="Klippr Icon" style={{ borderRadius: "50%" }} {...(props as any)} />
);

export const AppStoreIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.22 1.3-2.2 3.88.03 3.06 2.68 4.08 2.71 4.09l-.06.15Zm-6.54-17.4c.63-.76 1.73-1.36 2.66-1.42.13 1.07-.3 2.16-.9 2.94-.6.77-1.63 1.37-2.66 1.28-.15-1.04.32-2.11.9-2.8Z" />
    </svg>
);

export const PlayStoreIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M3.18 23.76A1.94 1.94 0 0 1 2 22V2A1.94 1.94 0 0 1 3.18.24L13.9 12 3.18 23.76Zm11.3-10.63 2.4-2.4-9.4-5.42 6.99 7.82ZM19.4 13.7 16.72 12l2.68-1.7 1.66.96a1.14 1.14 0 0 1 0 1.97l-1.66.47Zm-9.68 5.88 9.4-5.42-2.4-2.4-7 7.82Z" />
    </svg>
);

export const QRCodeIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none" />
        <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none" />
        <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none" />
        <path d="M14 14h3v3M17 14h3M14 17v3h3M20 17v3M20 14v.01" />
    </svg>
);

export const XIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const LinkedInIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

export const GridIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="9" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="9" width="6" height="6" rx="1" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
);

export const TrendingUpIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <polyline points="1,11 5,7 8,9 14,3" />
        <polyline points="10,3 14,3 14,7" />
    </svg>
);

export const ImageIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="1" y="2" width="14" height="12" rx="1.5" />
        <circle cx="5.5" cy="6" r="1" />
        <polyline points="1,11 5,7 8,10 11,7 15,11" />
    </svg>
);

export const HeartIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.567 3.067 2 5 2C6.1 2 7.083 2.55 7.75 3.4L8 3.75L8.25 3.4C8.917 2.55 9.9 2 11 2C12.933 2 14.5 3.567 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z" />
    </svg>
);

export const MicIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10a7 7 0 0014 0" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="9" y1="22" x2="15" y2="22" />
    </svg>
);

export const SendIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9 18l6-6-6-6" />
    </svg>
);

export const ChevronRightIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6 4l4 4-4 4" />
    </svg>
);

export const ClockIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
    </svg>
);

/* ── Pain Points section icons ── */

/** QR code split/broken in half — symbolises a reused/expired coupon */
export const BrokenQRIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Top-left QR module */}
        <rect x="6" y="6" width="20" height="20" rx="2" stroke="#7161ef" strokeWidth="2.5" />
        <rect x="11" y="11" width="10" height="10" rx="1" fill="#7161ef" opacity="0.25" />
        {/* Top-right QR module */}
        <rect x="38" y="6" width="20" height="20" rx="2" stroke="#7161ef" strokeWidth="2.5" />
        <rect x="43" y="11" width="10" height="10" rx="1" fill="#7161ef" opacity="0.25" />
        {/* Bottom-left QR module */}
        <rect x="6" y="38" width="20" height="20" rx="2" stroke="#7161ef" strokeWidth="2.5" />
        <rect x="11" y="43" width="10" height="10" rx="1" fill="#7161ef" opacity="0.25" />
        {/* Data dots — top half */}
        <rect x="38" y="38" width="4" height="4" rx="0.5" fill="#7161ef" opacity="0.5" />
        <rect x="46" y="38" width="4" height="4" rx="0.5" fill="#7161ef" opacity="0.5" />
        <rect x="54" y="38" width="4" height="4" rx="0.5" fill="#7161ef" opacity="0.5" />
        <rect x="38" y="46" width="4" height="4" rx="0.5" fill="#7161ef" opacity="0.5" />
        {/* Crack / break line */}
        <path d="M29 28 L35 20 L38 26 L44 18" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="32" y1="0" x2="32" y2="64" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.35" />
    </svg>
);

/** Speech bubble with question mark — unverified promos */
export const QuestionBubbleIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M8 10C8 7.79 9.79 6 12 6h40c2.21 0 4 1.79 4 4v28c0 2.21-1.79 4-4 4H36l-8 10-8-10H12c-2.21 0-4-1.79-4-4V10Z"
            stroke="#7161ef" strokeWidth="2.5" strokeLinejoin="round"
        />
        {/* Question mark */}
        <path
            d="M28 34v-1.5c0-2 1.5-3.5 3.5-4.5S35 25.5 35 23.5C35 20.5 33 18 29.5 18S24 20.5 24 23"
            stroke="#7161ef" strokeWidth="2.5" strokeLinecap="round"
        />
        <circle cx="28" cy="37.5" r="1.5" fill="#7161ef" />
    </svg>
);

/** Line chart with dashed segments — incomplete/blind campaign data */
export const BlindChartIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Axes */}
        <line x1="10" y1="54" x2="58" y2="54" stroke="#7161ef" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="10" x2="10" y2="54" stroke="#7161ef" strokeWidth="2" strokeLinecap="round" />
        {/* Solid segment */}
        <polyline points="10,44 22,32 32,36" stroke="#7161ef" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dashed segment — data missing */}
        <polyline points="32,36 42,24 54,18" stroke="#7161ef" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4" />
        {/* Data dots */}
        <circle cx="10"  cy="44" r="3" fill="#7161ef" />
        <circle cx="22"  cy="32" r="3" fill="#7161ef" />
        <circle cx="32"  cy="36" r="3" fill="#7161ef" />
        {/* Ghost dots for missing data */}
        <circle cx="42"  cy="24" r="3" stroke="#7161ef" strokeWidth="2" fill="white" strokeDasharray="2 2" />
        <circle cx="54"  cy="18" r="3" stroke="#7161ef" strokeWidth="2" fill="white" strokeDasharray="2 2" />
        {/* Question marks near ghost dots */}
        <text x="45" y="22" fontSize="8" fill="#7161ef" opacity="0.6" fontFamily="sans-serif">?</text>
    </svg>
);

/* ── How It Works step icons ── */

/** Step 01 — Explorar: magnifier over stacked cards */
export const ExploreStepsIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="14" width="28" height="6" rx="2" />
        <rect x="4" y="24" width="22" height="6" rx="2" />
        <rect x="4" y="34" width="18" height="6" rx="2" />
        <circle cx="37" cy="13" r="7" />
        <line x1="42" y1="18" x2="46" y2="22" strokeWidth="2.5" />
    </svg>
);

/** Step 02 — Activar: QR with particle dots forming around it */
export const ActivateQRIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="12" y="12" width="10" height="10" rx="1.5" />
        <rect x="26" y="12" width="10" height="10" rx="1.5" />
        <rect x="12" y="26" width="10" height="10" rx="1.5" />
        <rect x="14" y="14" width="6" height="6" rx="0.5" fill="currentColor" stroke="none" />
        <rect x="28" y="14" width="6" height="6" rx="0.5" fill="currentColor" stroke="none" />
        <rect x="14" y="28" width="6" height="6" rx="0.5" fill="currentColor" stroke="none" />
        <rect x="27" y="27" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
        <rect x="33" y="27" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
        <rect x="27" y="33" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
        <rect x="33" y="33" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
        <circle cx="6"  cy="6"  r="1.5" fill="currentColor" stroke="none" opacity="0.4" />
        <circle cx="42" cy="6"  r="1.5" fill="currentColor" stroke="none" opacity="0.4" />
        <circle cx="6"  cy="42" r="1.5" fill="currentColor" stroke="none" opacity="0.4" />
        <circle cx="42" cy="42" r="1.5" fill="currentColor" stroke="none" opacity="0.4" />
        <circle cx="6"  cy="24" r="1"   fill="currentColor" stroke="none" opacity="0.3" />
        <circle cx="42" cy="24" r="1"   fill="currentColor" stroke="none" opacity="0.3" />
    </svg>
);

/** Step 03 — Canjear: phone QR facing scanner with checkmark */
export const RedeemScanIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="8" width="18" height="30" rx="3" />
        <rect x="8" y="13" width="10" height="10" rx="1" />
        <rect x="9.5" y="14.5" width="7" height="7" rx="0.5" fill="currentColor" stroke="none" opacity="0.5" />
        <line x1="7"  y1="28" x2="11" y2="28" />
        <line x1="7"  y1="31" x2="15" y2="31" />
        <line x1="26" y1="10" x2="26" y2="14" />
        <line x1="22" y1="10" x2="26" y2="10" />
        <line x1="26" y1="38" x2="26" y2="34" />
        <line x1="22" y1="38" x2="26" y2="38" />
        <line x1="44" y1="10" x2="44" y2="14" />
        <line x1="44" y1="10" x2="40" y2="10" />
        <line x1="44" y1="38" x2="44" y2="34" />
        <line x1="44" y1="38" x2="40" y2="38" />
        <path d="M31 24l3.5 3.5L40 21" strokeWidth="2.5" />
    </svg>
);

/** Step 04 — Compartir: stars + speech bubble with heart */
export const ShareStarsIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6 36C4.9 36 4 35.1 4 34V16c0-1.1.9-2 2-2h22c1.1 0 2 .9 2 4v14c0 1.1-.9 2-2 2H16l-4 6-4-6H6Z" />
        <path d="M15 27c0 0-3-2-3-4.5A3 3 0 0 1 18 22a3 3 0 0 1 6 .5C24 25 21 27 21 27s-1.5 1-3 1-3-1-3-1Z" fill="currentColor" stroke="none" opacity="0.3" />
        <path d="M15 27c0 0-3-2-3-4.5A3 3 0 0 1 18 22a3 3 0 0 1 6 .5C24 25 21 27 21 27" />
        <polygon points="34,6 36,12 42,12 37,15.5 39,22 34,18 29,22 31,15.5 26,12 32,12" fill="currentColor" stroke="none" opacity="0.25" />
        <polygon points="34,6 36,12 42,12 37,15.5 39,22 34,18 29,22 31,15.5 26,12 32,12" />
        <line x1="26" y1="30" x2="42" y2="30" opacity="0.4" />
        <line x1="26" y1="34" x2="38" y2="34" opacity="0.4" />
    </svg>
);

/* ── Benefits section icons ── */

/** B2C Card 1 — map with violet location pins */
export const MapPinsIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="32" width="40" height="12" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
        <path d="M24 6C18.48 6 14 10.48 14 16c0 7.5 10 20 10 20s10-12.5 10-20c0-5.52-4.48-10-10-10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="24" cy="16" r="3.5" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="30" r="2.5" fill="currentColor" opacity="0.3" />
        <circle cx="38" cy="28" r="2.5" fill="currentColor" opacity="0.3" />
    </svg>
);

/** B2C Card 2 — QR code with padlock overlay */
export const QRLockIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="7" y="7" width="10" height="10" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="4" y="26" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="7" y="29" width="10" height="10" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="26" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="29" y="7" width="10" height="10" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="27" y="31" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="2" />
        <path d="M30 31v-3a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="35" cy="37" r="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="35" y1="39" x2="35" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

/** B2C Card 3 — chat bubbles with stars */
export const StarBubblesIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 10C4 7.79 5.79 6 8 6h22c2.21 0 4 1.79 4 4v13c0 2.21-1.79 4-4 4H18l-6 6v-6H8c-2.21 0-4-1.79-4-4V10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <line x1="10" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="10" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M28 30h12c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2H28c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M30 42l-4 4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="30" y="36" fontSize="8" fill="currentColor" fontFamily="sans-serif" opacity="0.7">★★</text>
    </svg>
);

/** B2C Card 4 — list with checkmarks and timeline indicator */
export const ListChecksIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="6" y="4" width="36" height="40" rx="3" stroke="currentColor" strokeWidth="2" />
        <line x1="16" y1="15" x2="36" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="33" x2="28" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M10 14l1.5 1.5L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 23l1.5 1.5L14 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11.5" cy="33" r="1.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="38" y1="10" x2="38" y2="38" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" strokeLinecap="round" />
        <circle cx="38" cy="15" r="2.5" fill="currentColor" opacity="0.7" />
        <circle cx="38" cy="24" r="2.5" fill="currentColor" opacity="0.35" />
    </svg>
);

/** B2B Card 1 — bar chart with rising bars */
export const BarChartNumbersIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <line x1="8" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="8" x2="8" y2="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="12" y="28" width="7" height="12" rx="1.5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="20" width="7" height="20" rx="1.5" fill="currentColor" opacity="0.4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="32" y="12" width="7" height="28" rx="1.5" fill="currentColor" opacity="0.7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15.5 25l9-7 10-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" opacity="0.5" />
        <circle cx="35.5" cy="14" r="2.5" fill="currentColor" opacity="0.8" />
    </svg>
);

/** B2B Card 2 — shield with checkmark */
export const ShieldCheckmarkIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M24 4L8 10v14c0 9.5 7 17.5 16 20 9-2.5 16-10.5 16-20V10L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M24 8L10 13.5v10.5c0 7.5 5.5 13.5 14 16 8.5-2.5 14-8.5 14-16V13.5L24 8Z" fill="currentColor" opacity="0.08" />
        <path d="M16 24l5.5 5.5L34 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** B2B Card 3 — dashboard panel with toggle switches */
export const TogglePanelIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4" y="6" width="40" height="36" rx="3" stroke="currentColor" strokeWidth="2" />
        <line x1="4" y1="14" x2="44" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
        <rect x="10" y="19" width="14" height="6" rx="3" fill="currentColor" opacity="0.75" />
        <circle cx="21" cy="22" r="2.5" fill="white" />
        <line x1="28" y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <rect x="10" y="29" width="14" height="6" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <circle cx="13" cy="32" r="2.5" fill="currentColor" opacity="0.3" />
        <line x1="28" y1="32" x2="36" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <line x1="10" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <circle cx="38" cy="10" r="2" fill="currentColor" opacity="0.35" />
    </svg>
);

/** B2B Card 4 — star with reply speech bubble */
export const StarReplyIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <polygon points="20,4 23.1,13.1 32.7,13.1 25,19 27.6,28.2 20,23 12.4,28.2 15,19 7.3,13.1 16.9,13.1" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
        <path d="M26 30h14c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H26c-1.1 0-2-.9-2-2v-9c0-1.1.9-2 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M26 38l-4 4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="29" y1="34" x2="38" y2="34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
        <line x1="29" y1="37" x2="35" y2="37" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
);

export const CheckCircleIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    </svg>
);

export const GithubIcon: SVGComponent = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.4-3.6 5 5 0 0 0-.1-3.5s-1.1-.35-3.5 1.25a12.8 12.8 0 0 0-7 0C6.1 1.75 5 2.1 5 2.1a5 5 0 0 0-.1 3.5A5.2 5.2 0 0 0 3.5 9.24c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4" />
        <path d="M3 19s1-1 3-1" />
    </svg>
);
