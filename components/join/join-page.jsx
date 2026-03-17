"use client";

import { useState } from "react";
import SitePageShell from "../site-page-shell";
import { buttonClassName } from "../ui/button-link";
import SectionCta from "../ui/section-cta";
import SectionShell from "../ui/section-shell";

const FORMSPREE_URL = "https://formspree.io/f/mojkkzoj";

const formFieldClassName =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-aquamesh-500 focus:bg-white focus:ring-4 focus:ring-aquamesh-500/10 disabled:opacity-50";

const roles = [
  {
    title: "Business Development Co-Founder",
    description:
      "Shape partnerships, go-to-market strategy, and customer development as a founding teammate. We're looking for someone who can build relationships, identify market opportunities, and drive growth from day one."
  },
  {
    title: "Mechanical Engineering Co-Founder",
    description:
      "Lead product design, enclosure engineering, and field deployment systems. You'll iterate on hardware that survives real-world environmental conditions while keeping manufacturing costs practical."
  },
  {
    title: "Mission-Driven Builders",
    description:
      "Passionate about environmental sensing and water-quality infrastructure? We're always looking for talented individuals who want to apply their skills to meaningful problems — regardless of specific role."
  }
];

export default function JoinPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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
        body: JSON.stringify({ name, email, role, message }),
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
    <SitePageShell route="join">
      <SectionShell
        eyebrow="Careers"
        title="Join the AquaMesh Team"
        description="Be part of an innovative team working to revolutionize environmental sensing. We're seeking passionate individuals who want to make a difference."
      >
        <div className="mx-auto max-w-3xl rounded-[32px] border border-aquamesh-300/40 bg-aquamesh-50 p-8 text-left shadow-lg shadow-aquamesh-900/5">
          <p className="text-base leading-7 text-slate-700">
            We&apos;re especially looking for talented co-founders experienced in business development and mechanical engineering. Email us at{" "}
            <a href="mailto:info@aquamesh.ai" className="text-aquamesh-700 underline">info@aquamesh.ai</a>{" "}
            with your resume and why you&apos;re excited to be part of AquaMesh.
          </p>
        </div>
      </SectionShell>

      <SectionShell
        id="roles"
        title="Open Roles"
        description="We're building a team of people who care deeply about environmental impact. Here's where we need help right now."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((r) => (
            <article
              key={r.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-lg shadow-slate-900/5"
            >
              <h3 className="text-xl font-semibold text-aquamesh-700">{r.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{r.description}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionCta
        title="Ready to make a difference?"
        description="We'd love to hear from you. Tell us about yourself, what excites you about environmental sensing, and how you'd like to contribute."
      >
        {submitted ? (
          <div className="flex flex-col items-center justify-center gap-3 text-center">
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
            className="mx-auto grid max-w-lg gap-4"
          >
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
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>
                I&apos;m interested in...
              </option>
              <option>Business Development Co-Founder</option>
              <option>Mechanical Engineering Co-Founder</option>
              <option>Other / General Interest</option>
            </select>
            <textarea
              className={formFieldClassName}
              rows="4"
              placeholder="Tell us about yourself and why you're excited about AquaMesh"
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
              {loading ? "Sending\u2026" : "Send Your Resume"}
            </button>
          </form>
        )}
      </SectionCta>
    </SitePageShell>
  );
}
