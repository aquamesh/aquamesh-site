"use client";

import { useState } from "react";
import ButtonLink from "../ui/button-link";
import SiteContainer from "../ui/site-container";
import { routeHref } from "../../lib/site-paths";

const CHECKOUT_URL =
  "https://wwrg1xdnr2.execute-api.us-west-1.amazonaws.com/live/create-checkout-session";

export default function PreorderPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(CHECKOUT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, quantity, comments }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.message || "Failed to create checkout session.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-aquamesh-500 focus:outline-none focus:ring-1 focus:ring-aquamesh-500 disabled:opacity-50";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <SiteContainer padded={false}>
          <ButtonLink href="/" variant="secondary" size="sm">
            &larr; Back to Home
          </ButtonLink>
        </SiteContainer>
      </div>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <SiteContainer padded={false}>
          <div className="rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-300">
              Preorder
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Preorder AquaSpectra™
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Be among the first to experience the next-generation water quality
              probe. Reserve yours today and get priority access when we ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#preorder-form" variant="secondary" size="sm">
                Reserve Now
              </ButtonLink>
              <ButtonLink
                href="/products/aquaspectra-probe/"
                variant="outline"
                size="sm"
              >
                View Tech Specs
              </ButtonLink>
            </div>
          </div>
        </SiteContainer>
      </section>

      <section id="preorder-form" className="px-4 pb-20 sm:px-6 lg:px-8">
        <SiteContainer padded={false}>
          <div className="rounded-[40px] border border-white/10 bg-white p-8 text-slate-900 shadow-2xl shadow-black/20">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
                Preorder Form
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-aquamesh-700">
                Secure Your AquaSpectra™
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Fill out the form below to reserve your probe. You&apos;ll be
                redirected to our secure checkout to complete your order.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
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
                    Desired Quantity
                  </span>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    disabled={loading}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className={inputClass}
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="text-sm font-medium text-slate-700">
                    Comments or Questions
                  </span>
                  <textarea
                    rows="4"
                    disabled={loading}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Let us know about deployment requirements or timelines."
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
                      Processing order…
                    </p>
                  )}
                  <p>
                    By placing a preorder you agree to our{" "}
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
                  {loading ? "Processing…" : "Preorder Now"}
                </button>
              </div>
            </form>
          </div>
        </SiteContainer>
      </section>
    </div>
  );
}
