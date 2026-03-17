import { cx } from "../../lib/cx";
import { routeHref } from "../../lib/site-paths";

const variantClasses = {
  primary:
    "bg-aquamesh-500 text-white shadow-lg shadow-aquamesh-500/20 hover:bg-aquamesh-700 hover:shadow-aquamesh-700/30",
  secondary:
    "bg-white/10 text-white ring-1 ring-inset ring-white/30 backdrop-blur hover:bg-white/20",
  outline:
    "bg-white text-aquamesh-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50",
  subtle:
    "bg-aquamesh-50 text-aquamesh-700 ring-1 ring-inset ring-aquamesh-300/50 hover:bg-aquamesh-300/20"
};

const sizeClasses = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm sm:text-base",
  lg: "min-h-12 px-6 text-base"
};

function resolveHref(href) {
  if (!href) {
    return href;
  }

  if (
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  return routeHref(href);
}

export function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className
} = {}) {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aquamesh-500 focus-visible:ring-offset-2",
    variantClasses[variant] ?? variantClasses.primary,
    sizeClasses[size] ?? sizeClasses.md,
    fullWidth ? "w-full" : null,
    className
  );
}

export default function ButtonLink({
  href,
  variant,
  size,
  fullWidth = false,
  className,
  children,
  ...props
}) {
  return (
    <a
      href={resolveHref(href)}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </a>
  );
}
