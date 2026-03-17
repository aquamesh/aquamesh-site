"use client";

import { useState } from "react";
import { buttonClassName } from "../ui/button-link";
import SectionCta from "../ui/section-cta";

const FORMSPREE_URL = "https://formspree.io/f/mojkkzoj";

const formFieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-aquamesh-500 focus:bg-white focus:ring-4 focus:ring-aquamesh-500/10 disabled:opacity-50";

export default function CtaSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, product, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionCta
      id="contact"
      eyebrow="Contact"
      title="Talk to the AquaMesh Team"
      description="Tell us what you are monitoring and we will help match the right hardware, connectivity, and reporting workflow."
      className="bg-[radial-gradient(circle_at_top,_rgba(148,210,189,0.24),_transparent_50%),linear-gradient(180deg,#f8fbfc_0%,#eef7f8_100%)]"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-5">
          <p className="text-lg leading-8 text-slate-600">
            AquaMesh supports autonomous field sensing, watershed monitoring, stormwater
            deployments, and custom water quality instrumentation programs.
          </p>
          <div className="space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-aquamesh-50 text-aquamesh-500">
                <i className="fas fa-wave-square"></i>
              </span>
              Multi-parameter optical sensing with resilient telemetry.
            </p>
            <p className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-aquamesh-50 text-aquamesh-500">
                <i className="fas fa-satellite-dish"></i>
              </span>
              Guidance on hardware selection, deployment topology, and reporting.
            </p>
            <p className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-aquamesh-50 text-aquamesh-500">
                <i className="fas fa-envelope-open-text"></i>
              </span>
              Fast follow-up for pilots, procurement, and research conversations.
            </p>
          </div>
        </div>
        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-aquamesh-50 text-aquamesh-500">
              <i className="fas fa-check text-lg"></i>
            </span>
            <h3 className="text-lg font-bold text-aquamesh-700">
              Message Received
            </h3>
            <p className="text-sm leading-6 text-slate-600">
              Thanks for reaching out! We&apos;ll get back to you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
          >
            {/* Honeypot field — hidden from humans, traps bots */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="!absolute !overflow-hidden !h-0 !w-0 !p-0 !border-0"
            />
            <input
              className={formFieldClassName}
              type="text"
              placeholder="Your Name"
              required
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={formFieldClassName}
              type="email"
              placeholder="Your Email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              className={formFieldClassName}
              required
              disabled={loading}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="" disabled>
                I&apos;m interested in...
              </option>
              <option>AquaSpectra™ Sensor</option>
              <option>AquaLink™ Hub</option>
              <option>AquaView™ Platform</option>
              <option>Custom Solution</option>
            </select>
            <textarea
              className={formFieldClassName}
              rows="4"
              placeholder="Your Message"
              disabled={loading}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className={buttonClassName({ size: "lg", className: "w-full sm:w-fit disabled:opacity-50" })}
            >
              {loading ? "Sending\u2026" : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </SectionCta>
  );
}
