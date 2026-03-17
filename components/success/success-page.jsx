import ButtonLink from "../ui/button-link";
import SiteContainer from "../ui/site-container";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center bg-[linear-gradient(135deg,#0f2027,#203a43,#2c5364)] px-4 py-16 text-white sm:px-6 lg:px-8">
      <SiteContainer padded={false} className="max-w-3xl">
        <div className="rounded-[40px] border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-black/30 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-300">
            Payment Status
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Payment Successful
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-200">
            Thank you for your purchase! Your payment has been processed
            successfully. We appreciate your business and look forward to
            serving you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/preorder/" variant="secondary" size="sm">
              Return to Preorder
            </ButtonLink>
            <ButtonLink href="/" variant="outline" size="sm">
              Back to Home
            </ButtonLink>
          </div>
        </div>
      </SiteContainer>
    </div>
  );
}
