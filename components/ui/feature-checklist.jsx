import { cx } from "../../lib/cx";

export default function FeatureChecklist({
  items,
  className,
  itemClassName,
  iconClassName,
  textClassName
}) {
  return (
    <ul className={cx("space-y-3", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cx("flex items-start gap-3 text-sm leading-6", itemClassName || "text-slate-700")}
        >
          <span
            className={cx(
              "mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full",
              iconClassName || "bg-aquamesh-50 text-aquamesh-500"
            )}
          >
            <i className="fas fa-check text-[10px]"></i>
          </span>
          <span className={textClassName}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
