"use client";

import { useTranslation } from "@/i18n/useTranslation";

const VIDEOS = [
  {
    key: "product",
    embedUrl: "https://www.youtube.com/embed/W2HLC4PCJRQ",
  },
  {
    key: "team",
    embedUrl: "https://www.youtube.com/embed/MyfhH-qDnhU",
  },
] as const;

export function VideoSection() {
  const { dict } = useTranslation();

  const videoCopy = {
    product: {
      title: dict.videos.productTitle,
      description: dict.videos.productDescription,
      iframeTitle: dict.videos.productIframeTitle,
    },
    team: {
      title: dict.videos.teamTitle,
      description: dict.videos.teamDescription,
      iframeTitle: dict.videos.teamIframeTitle,
    },
  };

  return (
    <section
      id="videos"
      className="relative scroll-mt-28 overflow-hidden bg-[#fbfbff] py-20 dark:bg-[#0F0F1A]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent dark:from-[#0F0F1A]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 h-72 w-[min(760px,90vw)] -translate-x-1/2 rounded-full bg-[#7161ef]/10 blur-3xl dark:bg-[#7161ef]/20"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#7161ef]">
            Klippr
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1a1a1a] md:text-4xl dark:text-white">
            {dict.videos.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#6b7280] md:text-lg dark:text-white/70">
            {dict.videos.subheading}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {VIDEOS.map((video) => {
            const copy = videoCopy[video.key];

            return (
              <article
                key={video.key}
                className="group overflow-hidden rounded-[1.5rem] border border-[#e7e3ff] bg-white shadow-[0_18px_55px_rgba(15,15,26,0.08)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_18px_55px_rgba(0,0,0,0.24)]"
              >
                <div className="aspect-video w-full overflow-hidden bg-[#0F0F1A]">
                  <iframe
                    className="h-full w-full"
                    src={video.embedUrl}
                    title={copy.iframeTitle}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="font-heading text-xl font-bold text-[#1a1a1a] dark:text-white">
                    {copy.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b7280] md:text-base dark:text-white/70">
                    {copy.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
