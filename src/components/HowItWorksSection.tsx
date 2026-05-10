"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/useTranslation";
import { Check } from "lucide-react";

export function HowItWorksSection() {
  const { dict } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const data = dict.howItWorks;
  const steps = data.steps;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            {data.heading}
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 lg:gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                activeStep === index
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
              onClick={() => setActiveStep(index)}
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-semibold tracking-wider ${
                  activeStep === index ? "text-primary-foreground" : "text-muted-foreground"
                }`}>
                  {step.label}
                </span>
                {activeStep === index && (
                  <Check className="w-5 h-5" />
                )}
              </div>

              {/* Step Title */}
              <h3 className={`font-heading text-lg md:text-xl font-bold leading-tight whitespace-pre-line ${
                activeStep === index ? "text-primary-foreground" : "text-foreground"
              }`}>
                {step.heading}
              </h3>

              {/* Progress Indicator */}
              <div className="mt-6 flex gap-1">
                {steps.map((_, dot) => (
                  <div
                    key={dot}
                    className={`h-1 rounded-full flex-1 transition-all ${
                      dot === index
                        ? activeStep === index
                          ? "bg-primary-foreground"
                          : "bg-primary"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Description Panel */}
        <motion.div
          className="bg-secondary rounded-3xl p-8 md:p-12 border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                {steps[activeStep].heading}
              </h4>
              <p className="text-foreground/80 text-lg leading-relaxed">
                {steps[activeStep].body}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Visual Indicators */}
        <motion.div
          className="mt-12 flex justify-center items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStep === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

