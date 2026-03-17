"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonLink from "../ui/button-link";
import { buttonClassName } from "../ui/button-link";
import SiteContainer from "../ui/site-container";
import { routeHref } from "../../lib/site-paths";

const FORMSPREE_URL = "https://formspree.io/f/mojkkzoj";

export default function ContactPage() {
  const router = useRouter();
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

  const inputClass =
    "mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-aquamesh-500 focus:outline-none focus:ring-1 focus:ring-aquamesh-500 disabled:opacity-50";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <SiteContainer padded={false}>
          <button
            type="button"
            onClick={() => router.back()}
            className={buttonClassName({ variant: "secondary", size: "sm" })}
          >
            &larr; Go Back
          </button>
        </SiteContainer>
      </div>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SiteContainer padded={false}>
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-300">
              Get In Touch
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s Talk
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Whether you&apos;re exploring a pilot deployment, planning a
              large-scale rollout, or simply have questions about our
              technology&mdash;we&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#contact-form" variant="secondary" size="sm">
                Send a Message
              </ButtonLink>
            </div>
          </div>
        </SiteContainer>
      </section>

      <section id="contact-form" className="px-4 pb-20 sm:px-6 lg:px-8">
        <SiteContainer padded={false}>
          <div className="rounded-[40px] border border-white/10 bg-white p-8 text-slate-900 shadow-2xl shadow-black/20">
            {submitted ? (
              <div className="py-12 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
                  Thank You
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-aquamesh-700">
                  Message Received
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600">
                  We&apos;ll get back to you shortly. In the meantime, feel free
                  to explore our products.
                </p>
                <div className="mt-8">
                  <ButtonLink href="/" size="sm">
                    Back to Home
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
                  Contact Form
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-aquamesh-700">
                  How Can We Help?
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Fill out the form below and a member of our team will be in
                  touch.
                </p>

                <form onSubmit={handleSubmit} className="mt-8">
                  {/* Honeypot field — hidden from humans, traps bots */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    className="!absolute !overflow-hidden !h-0 !w-0 !p-0 !border-0"
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <label>
                      <span className="text-sm font-medium text-slate-700">
                        Name
                      </span>
                      <input
                        type="text"
                        required
                        disabled={loading}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </label>

                    <label>
                      <span className="text-sm font-medium text-slate-700">
                        Email
                      </span>
                      <input
                        type="email"
                        required
                        disabled={loading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                        className={inputClass}
                      />
                    </label>

                    <label>
                      <span className="text-sm font-medium text-slate-700">
                        Product Interest
                      </span>
                      <select
                        disabled={loading}
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select a product (optional)</option>
                        <option value="AquaSpectra Sensor">
                          AquaSpectra Sensor
                        </option>
                        <option value="AquaLink Hub">AquaLink Hub</option>
                        <option value="AquaView Platform">
                          AquaView Platform
                        </option>
                        <option value="Custom Solution">Custom Solution</option>
                      </select>
                    </label>

                    <label className="md:col-span-2">
                      <span className="text-sm font-medium text-slate-700">
                        Message
                      </span>
                      <textarea
                        rows="4"
                        disabled={loading}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your project, deployment needs, or any questions you have."
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-aquamesh-500 focus:outline-none focus:ring-1 focus:ring-aquamesh-500 disabled:opacity-50"
                      />
                    </label>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1 text-sm text-slate-500">
                      {error && (
                        <p className="font-medium text-red-600">{error}</p>
                      )}
                      {loading && (
                        <p className="font-medium text-aquamesh-600">
                          Sending message&hellip;
                        </p>
                      )}
                      <p>
                        By submitting you agree to our{" "}
                        <a
                          className="text-aquamesh-700 underline"
                          href={routeHref("/privacy/")}
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                          className="text-aquamesh-700 underline"
                          href={routeHref("/terms/")}
                        >
                          Terms and Conditions
                        </a>
                        .
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-aquamesh-500 px-5 text-sm font-semibold text-white shadow-lg shadow-aquamesh-500/20 transition-all duration-300 hover:bg-aquamesh-700 hover:shadow-aquamesh-700/30 disabled:opacity-50"
                    >
                      {loading ? "Sending\u2026" : "Send Inquiry"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </SiteContainer>
      </section>
    </div>
  );
}
