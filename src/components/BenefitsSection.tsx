"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/useTranslation";
import { CheckCircle2 } from "lucide-react";

export function BenefitsSection() {
  const { dict } = useTranslation();
  const [activeTab, setActiveTab] = useState<"b2c" | "b2b">("b2c");
  const data = dict.benefits;
  const benefits = activeTab === "b2c" ? data.b2c : data.b2b;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative w-full px-4 py-20 sm:py-24 md:py-32 lg:py-40 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            {data.heading}
            <span className="text-primary ml-2">{data.headingAccent}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {data.subheading}
          </p>
        </motion.div>

        {/* Tab Toggle */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setActiveTab("b2c")}
            className={`px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "b2c"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-secondary text-foreground hover:bg-muted border border-border"
            }`}
          >
            {data.tabConsumer}
          </button>
          <button
            onClick={() => setActiveTab("b2b")}
            className={`px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "b2b"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-secondary text-foreground hover:bg-muted border border-border"
            }`}
          >
            {data.tabBusiness}
          </button>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeTab}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-8 rounded-2xl bg-secondary border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-6 inline-block p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-foreground/70 leading-relaxed">
                {benefit.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          className="bg-secondary rounded-3xl p-8 md:p-12 border border-border overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {activeTab === "b2c" ? (
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {data.screenLabelConsumer}
                  </h3>
                  <div className="space-y-4">
                    {data.b2c.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {data.screenLabelBusiness}
                  </h3>
                  <div className="bg-white/50 rounded-lg p-6 mb-6">
                    <p className="text-sm text-muted-foreground mb-4">{data.dashboard.promoLabel}</p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                          {data.dashboard.views}
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-2">2.4K</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                          {data.dashboard.redemptions}
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-2">847</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                          {data.dashboard.redemptionsPerDay}
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-2">127</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70">{data.dashboard.promoStatus}</p>
                  </div>
                  <div className="space-y-4">
                    {data.b2b.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

