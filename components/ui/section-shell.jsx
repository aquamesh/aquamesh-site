import { cx } from "../../lib/cx";
import SiteContainer from "./site-container";

export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
  containerClassName,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  children
}) {
  const centered = align === "center";

  return (
    <section
      id={id}
      className={cx(id ? "scroll-mt-24" : null, "px-4 py-16 sm:px-6 lg:px-8", className)}
    >
      <SiteContainer padded={false} className={containerClassName}>
        {eyebrow || title || description ? (
          <div className={cx("mb-12", centered ? "text-center" : "max-w-3xl")}>
            {eyebrow ? (
              <p
                className={cx(
                  "mb-3 text-sm font-semibold uppercase tracking-[0.24em]",
                  eyebrowClassName || "text-aquamesh-500"
                )}
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                className={cx(
                  "text-3xl font-bold tracking-tight sm:text-4xl",
                  titleClassName || "text-aquamesh-700"
                )}
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                className={cx(
                  "mt-4 text-base leading-7 sm:text-lg",
                  descriptionClassName || "text-slate-700",
                  centered ? "mx-auto max-w-3xl" : null
                )}
              >
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </SiteContainer>
    </section>
  );
}
