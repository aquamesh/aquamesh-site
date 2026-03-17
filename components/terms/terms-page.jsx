import SitePageShell from "../site-page-shell";
import SectionShell from "../ui/section-shell";

const termsSections = [
  {
    title: "1. Preorder Terms",
    content: "By placing a preorder, you agree to pay the full price as indicated on the preorder page. Shipping costs will be calculated and communicated separately."
  },
  {
    title: "2. Payment",
    content: "All payments are processed securely through Stripe. AquaMesh does not store your payment information."
  },
  {
    title: "3. Refund Policy",
    content: "Orders are non-refundable once processed, except in the case of product unavailability. Preorders are refundable once processed."
  },
  {
    title: "4. Shipping",
    content: "Estimated delivery dates are provided at the time of preorder confirmation. AquaMesh is not liable for delays caused by shipping carriers or customs."
  },
  {
    title: "5. Liability",
    content: "AquaMesh is not liable for damages arising from the use of its products, except as explicitly stated in the product warranty."
  },
  {
    title: "6. Contact",
    contentNode: (
      <p className="mt-3 text-sm leading-6 text-slate-600">
        For questions about these terms, contact us at{" "}
        <a href="mailto:info@aquamesh.ai" className="text-aquamesh-700 underline">info@aquamesh.ai</a>.
      </p>
    )
  }
];

export default function TermsPage() {
  return (
    <SitePageShell route="terms">
      <SectionShell
        eyebrow="Legal"
        title="Terms and Conditions"
        description="Please review these terms carefully before placing a preorder or using any AquaMesh product."
      >
        <div className="mx-auto max-w-3xl rounded-[32px] border border-aquamesh-300/40 bg-aquamesh-50 p-8 text-left shadow-lg shadow-aquamesh-900/5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-700">
            Last updated: January 16, 2025
          </p>
        </div>
      </SectionShell>

      <SectionShell id="terms-sections" align="left">
        <div className="mx-auto max-w-3xl space-y-4">
          {termsSections.map((section) => (
            <article
              key={section.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5"
            >
              <h3 className="text-xl font-semibold text-aquamesh-700">{section.title}</h3>
              {section.contentNode ?? (
                <p className="mt-3 text-sm leading-6 text-slate-600">{section.content}</p>
              )}
            </article>
          ))}
        </div>
      </SectionShell>
    </SitePageShell>
  );
}
