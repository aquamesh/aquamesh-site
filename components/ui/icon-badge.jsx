import { cx } from "../../lib/cx";

export default function IconBadge({
  icon,
  className,
  iconClassName = "text-[13px]"
}) {
  return (
    <span
      className={cx(
        "flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[#21363e] text-aquamesh-300",
        className
      )}
    >
      <i className={cx(icon, "text-current", iconClassName)} aria-hidden="true" />
    </span>
  );
}
