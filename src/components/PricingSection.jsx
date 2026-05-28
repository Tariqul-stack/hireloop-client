"use client";

import { useState } from "react";
import {
  CrownDiamond,
  ChartBar,
  ThunderboltFill,
  Plus,
  ArrowRight,
} from "@gravity-ui/icons";

const plans = [
  {
    id: "starter",
    icon: <CrownDiamond className="h-5 w-5 text-violet-400" />,
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: false,
    cta: "Choose This Plan",
  },
  {
    id: "growth",
    icon: <ChartBar className="h-5 w-5 text-violet-400" />,
    name: "Growth",
    monthlyPrice: 17,
    yearlyPrice: 13,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: true,
    cta: "Choose This Plan",
  },
  {
    id: "premium",
    icon: <ThunderboltFill className="h-5 w-5 text-violet-400" />,
    name: "Premium",
    monthlyPrice: 99,
    yearlyPrice: 74,
    description: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    highlighted: false,
    cta: "Choose This Plan",
  },
];

function PricingCard({ plan, isYearly }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className="relative flex flex-col rounded-2xl border p-7 transition-all"
      style={{
        backgroundColor: plan.highlighted ? "#1c1c1e" : "#141414",
        borderColor: plan.highlighted
          ? "rgba(255,255,255,0.15)"
          : "rgba(255,255,255,0.07)",
        boxShadow: plan.highlighted
          ? "0 0 0 1px rgba(255,255,255,0.08)"
          : "none",
      }}
    >
      {/* Plan header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8"
            style={{ backgroundColor: "#222" }}
          >
            {plan.icon}
          </div>
          <span className="text-lg font-semibold text-white">{plan.name}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-0.5">
          <span className="text-4xl font-bold text-white">${price}</span>
          <span
            className="text-sm ml-0.5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            /month
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-5 h-px"
        style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
      />

      {/* Features */}
      <p className="mb-4 text-sm font-semibold text-white">
        {plan.description}
      </p>
      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10"
              style={{ backgroundColor: "#2a2a2a" }}
            >
              <Plus
                className="h-3 w-3"
                style={{ color: "rgba(255,255,255,0.5)" }}
              />
            </span>
            <span
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <button
        className="mt-8 flex w-full items-center justify-between rounded-xl px-5 py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
        style={{
          backgroundColor: plan.highlighted ? "#ffffff" : "#252525",
          color: plan.highlighted ? "#0a0a0a" : "#ffffff",
        }}
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full py-24" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center text-center gap-4">
          <div
            className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span className="h-1 w-1 rounded-full bg-violet-500" aria-hidden />
            PRICING
            <span className="h-1 w-1 rounded-full bg-violet-500" aria-hidden />
          </div>

          <h2 className="max-w-lg text-4xl font-bold text-white sm:text-5xl leading-tight">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        {/* Toggle */}
        <div className="mb-12 flex justify-center">
          <div
            className="flex items-center gap-1 rounded-full p-1.5 border border-white/10"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <button
              onClick={() => setIsYearly(false)}
              className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
              style={{
                backgroundColor: !isYearly ? "#ffffff" : "transparent",
                color: !isYearly ? "#0a0a0a" : "rgba(255,255,255,0.5)",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all"
              style={{
                backgroundColor: isYearly ? "#ffffff" : "transparent",
                color: isYearly ? "#0a0a0a" : "rgba(255,255,255,0.5)",
              }}
            >
              Yearly
              <span
                className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
                style={{ backgroundColor: "#a855f7" }}
              >
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>
      </div>
    </section>
  );
}
