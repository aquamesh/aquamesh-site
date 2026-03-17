"use client";

import { useState } from "react";
import { cx } from "../../../lib/cx";
import ProbeSection from "./probe-section";
import { faqs } from "./probe-page-data";

export default function ProbeFaq() {
  const [openId, setOpenId] = useState(faqs.find((faq) => faq.expanded)?.id ?? faqs[0]?.id);

  return (
    <ProbeSection
      id="faq"
      eyebrow="FAQ"
      title="The operational questions buyers ask first."
      intro="What it measures, how it deploys, how the data is accessed, and where it fits in the AquaMesh system."
      tone="dark"
      containerClassName="max-w-4xl"
    >
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openId === faq.id;

          return (
            <article
              key={faq.id}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <button
                type="button"
                className={cx(
                  "flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.04]",
                  isOpen ? "bg-white/[0.06]" : ""
                )}
                onClick={() => setOpenId((current) => (current === faq.id ? null : faq.id))}
                aria-expanded={isOpen ? "true" : "false"}
                aria-controls={faq.id}
              >
                <span className={cx("text-lg font-semibold transition-colors", isOpen ? "text-aquamesh-200" : "text-white")}>{faq.question}</span>
                <span
                  className={cx(
                    "inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/10 text-aquamesh-300 transition",
                    isOpen ? "rotate-45" : null
                  )}
                >
                  +
                </span>
              </button>
              <div
                id={faq.id}
                className={cx(
                  "grid transition-[grid-template-rows] duration-300",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-white/10 px-6 py-5 text-sm leading-7 text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </ProbeSection>
  );
}
