import { cx } from "../../lib/cx";

export default function SiteContainer({
  as: Tag = "div",
  className,
  padded = true,
  children
}) {
  return (
    <Tag
      className={cx(
        "mx-auto w-full max-w-6xl",
        padded ? "px-4 sm:px-6 lg:px-8" : null,
        className
      )}
    >
      {children}
    </Tag>
  );
}
