import SitePageShell from "../site-page-shell";
import SectionShell from "../ui/section-shell";

const policySections = [
  {
    title: "1. Information We Collect",
    content: "We collect personal information that you provide to us, including name, email, address, and payment details, when you make a preorder or contact us."
  },
  {
    title: "2. How We Use Your Information",
    bullets: [
      "To fulfill and manage preorders.",
      "To communicate updates about your orders.",
      "To analyze website usage and improve user experience."
    ]
  },
  {
    title: "3. Third-Party Services",
    content: "We use third-party services like Stripe for payment processing and Google Analytics for tracking website performance. These services have their own privacy policies."
  },
  {
    title: "4. Your Rights",
    contentNode: (
      <p className="mt-3 text-sm leading-6 text-slate-600">
        You have the right to access, update, or delete your personal data. To exercise these rights, contact us at{" "}
        <a href="mailto:info@aquamesh.ai" className="text-aquamesh-700 underline">info@aquamesh.ai</a>.
      </p>
    )
  },
  {
    title: "5. Cookies",
    content: "We use cookies to enhance your browsing experience. By continuing to use our website, you consent to the use of cookies."
  },
  {
    title: "6. Contact",
    contentNode: (
      <p className="mt-3 text-sm leading-6 text-slate-600">
        If you have questions about this policy, contact us at{" "}
        <a href="mailto:privacy@aquamesh.ai" className="text-aquamesh-700 underline">privacy@aquamesh.ai</a>.
      </p>
    )
  }
];

export default function PrivacyPage() {
  return (
    <SitePageShell route="privacy">
      <SectionShell
        eyebrow="Legal"
        title="Privacy Policy"
        description="We are committed to protecting your privacy. This policy explains how we handle your data."
      >
        <div className="mx-auto max-w-3xl rounded-[32px] border border-aquamesh-300/40 bg-aquamesh-50 p-8 text-left shadow-lg shadow-aquamesh-900/5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-700">
            Last updated: January 16, 2025
          </p>
        </div>
      </SectionShell>

      <SectionShell id="policy-sections" align="left">
        <div className="mx-auto max-w-3xl space-y-4">
          {policySections.map((section) => (
            <article
              key={section.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5"
            >
              <h3 className="text-xl font-semibold text-aquamesh-700">{section.title}</h3>
              {section.contentNode ?? (
                section.bullets ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-slate-600">{section.content}</p>
                )
              )}
            </article>
          ))}
        </div>
      </SectionShell>
    </SitePageShell>
  );
}
