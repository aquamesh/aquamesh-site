import { cx } from "../../lib/cx";

export default function InfoCard({
  leading,
  eyebrow,
  title,
  description,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  children,
  ...props
}) {
  return (
    <article
      className={cx(
        "h-full rounded-[28px] p-6",
        className || "border border-slate-200 bg-white shadow-sm"
      )}
      {...props}
    >
      {leading ? <div className="mb-4">{leading}</div> : null}
      {eyebrow ? (
        <p
          className={cx(
            "mb-3 text-xs font-semibold uppercase tracking-[0.24em]",
            eyebrowClassName || "text-aquamesh-500"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h3 className={cx("text-xl font-semibold", titleClassName || "text-aquamesh-700")}>
          {title}
        </h3>
      ) : null}
      {description ? (
        <p className={cx("mt-3 text-sm leading-6", descriptionClassName || "text-slate-700")}>
          {description}
        </p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </article>
  );
}
