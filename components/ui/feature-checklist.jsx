import { cx } from "../../lib/cx";

export default function FeatureChecklist({
  items,
  className,
  itemClassName,
  iconClassName,
  textClassName,
  renderIcon
}) {
  const resolvedItemClassName = itemClassName || "flex items-start gap-3 text-sm leading-6 text-slate-700";
  const resolvedIconClassName =
    iconClassName ||
    "mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-aquamesh-50 text-aquamesh-500";

  return (
    <ul className={cx("space-y-3", className)}>
      {items.map((entry) => {
        const item = typeof entry === "string" ? { text: entry } : entry;

        return (
          <li
            key={item.key || item.text}
            className={cx(resolvedItemClassName)}
          >
            {renderIcon ? (
              renderIcon(item)
            ) : (
              <span
                className={cx(
                  resolvedIconClassName,
                  item.iconWrapperClassName
                )}
              >
                <i className={item.icon || "fas fa-check text-[10px]"}></i>
              </span>
            )}
            <span className={cx(textClassName, item.textClassName)}>{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
}
