import { cx } from "../../lib/cx";
import ButtonLink from "./button-link";
import FeatureChecklist from "./feature-checklist";

function AccentBlob({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "absolute inset-x-8 bottom-4 top-8 rounded-full bg-aquamesh-300/35 blur-3xl",
        className
      )}
    />
  );
}

function ProductVisual({ product }) {
  return (
    <div
      className={cx(
        "relative flex min-h-[280px] items-center justify-center",
        product.imageFullBleed
          ? ""
          : "rounded-[28px] border border-slate-200 bg-slate-50/80 p-8"
      )}
      data-aos={product.imageAos}
    >
      {product.imageHasBlob ? <AccentBlob /> : null}
      <img
        src={product.imageSrc}
        alt={product.imageAlt}
        className={cx(
          "relative z-10 w-auto object-contain",
          product.imageFullBleed ? "max-h-full rounded-2xl" : "max-h-[360px]"
        )}
      />
    </div>
  );
}

function ProductContent({ product }) {
  return (
    <div className="space-y-6" data-aos={product.textAos}>
      {product.eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
          {product.eyebrow}
        </p>
      ) : null}
      <div className="space-y-4">
        <h3 className="text-3xl font-bold tracking-tight text-aquamesh-700">{product.title}</h3>
        <p className="text-lg leading-8 text-slate-700">{product.description}</p>
      </div>
      <FeatureChecklist items={product.features} />
      <div
        className="flex flex-wrap gap-3"
        data-aos={product.ctaContainerAos}
        data-aos-delay={product.ctaContainerAosDelay}
      >
        {product.ctas.map((cta) => (
          <ButtonLink
            key={cta.label}
            href={cta.href}
            variant={cta.variant}
            data-aos={cta.dataAos}
            data-aos-delay={cta.dataAosDelay}
          >
            {cta.label}
          </ButtonLink>
        ))}
      </div>
    </div>
  );
}

export default function ProductFeature({ product, className }) {
  return (
    <article
      className={cx(
        "grid gap-10 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-2 lg:items-center lg:p-10",
        className
      )}
    >
      {/* Image always first on mobile; use order to swap on desktop */}
      <div className={product.reverse ? "lg:order-1" : "lg:order-2"}>
        <ProductVisual product={product} />
      </div>
      <div className={product.reverse ? "lg:order-2" : "lg:order-1"}>
        <ProductContent product={product} />
      </div>
    </article>
  );
}
