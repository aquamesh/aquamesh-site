import { cx } from "../../lib/cx";
import SectionShell from "./section-shell";

export default function SectionCta({
  id,
  eyebrow,
  title,
  description,
  className,
  cardClassName,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  children
}) {
  return (
    <SectionShell
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      className={className}
      eyebrowClassName={eyebrowClassName}
      titleClassName={titleClassName}
      descriptionClassName={descriptionClassName}
    >
      <div
        className={cx(
          "rounded-[32px] p-6 sm:p-8 lg:p-10",
          cardClassName || "border border-slate-200 bg-white/95 shadow-xl shadow-slate-900/5"
        )}
      >
        {children}
      </div>
    </SectionShell>
  );
}
