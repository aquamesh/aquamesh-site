"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "../lib/cx";
import { siteAssets } from "../lib/site-assets";
import { getPrimaryNavigation } from "../lib/site-navigation";
import { routeHref } from "../lib/site-paths";
import { useHeaderVisible } from "./header-visibility-context";
import { buttonClassName } from "./ui/button-link";
import SiteContainer from "./ui/site-container";

function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  );
}

function NavDropdown({ item, dark, onMobileNavigate }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productsExpanded, setProductsExpanded] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close on outside click or Escape
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setProductsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const linkClass = cx(
    "rounded-full px-4 py-2 text-sm font-medium transition",
    dark
      ? "text-slate-100 hover:bg-white/10 hover:text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-aquamesh-700",
    item.active
      ? dark
        ? "bg-white/12 text-white"
        : "bg-aquamesh-50 text-aquamesh-700"
      : null
  );

  return (
    <>
      {/* Desktop dropdown */}
      <div
        ref={dropdownRef}
        className="relative hidden lg:block"
        onMouseEnter={() => {
          clearTimeout(timeoutRef.current);
          setDropdownOpen(true);
        }}
        onMouseLeave={() => {
          timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
        }}
      >
        <button
          type="button"
          className={cx(linkClass, "inline-flex items-center gap-1")}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
          onClick={() => setDropdownOpen((v) => !v)}
        >
          {item.label}
          <ChevronIcon
            className={cx(
              "transition-transform",
              dropdownOpen ? "rotate-180" : ""
            )}
          />
        </button>

        {dropdownOpen && (
          <div
            className={cx(
              "absolute left-0 top-full mt-2 min-w-[220px] rounded-xl border p-2 shadow-lg",
              dark
                ? "border-white/10 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-900"
            )}
          >
            {item.children.map((child) => (
              <a
                key={child.label}
                href={child.href}
                className={cx(
                  "block rounded-lg px-4 py-2.5 text-sm font-medium transition",
                  dark
                    ? "text-slate-200 hover:bg-white/10 hover:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-aquamesh-700"
                )}
                onClick={() => setDropdownOpen(false)}
              >
                {child.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Mobile accordion */}
      <div className="lg:hidden">
        <button
          type="button"
          className={cx(linkClass, "flex w-full items-center justify-between")}
          aria-haspopup="true"
          aria-expanded={productsExpanded}
          onClick={() => setProductsExpanded((v) => !v)}
        >
          {item.label}
          <ChevronIcon
            className={cx(
              "transition-transform",
              productsExpanded ? "rotate-180" : ""
            )}
          />
        </button>

        {productsExpanded && (
          <div className="flex flex-col gap-0.5 pl-4">
            {item.children.map((child) => (
              <a
                key={child.label}
                href={child.href}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  dark
                    ? "text-slate-300 hover:bg-white/10 hover:text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-aquamesh-700"
                )}
                onClick={() => onMobileNavigate()}
              >
                {child.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function MenuToggle({ open, onClick, dark }) {
  return (
    <button
      type="button"
      className={cx(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden",
        dark
          ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
          : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
      )}
      aria-expanded={open ? "true" : "false"}
      aria-label="Toggle navigation"
      onClick={onClick}
    >
      <span className="relative h-4 w-5">
        <span
          className={cx(
            "absolute left-0 top-0 h-0.5 w-5 rounded-full transition",
            dark ? "bg-white" : "bg-slate-900",
            open ? "translate-y-[7px] rotate-45" : null
          )}
        />
        <span
          className={cx(
            "absolute left-0 top-[7px] h-0.5 w-5 rounded-full transition",
            dark ? "bg-white" : "bg-slate-900",
            open ? "opacity-0" : null
          )}
        />
        <span
          className={cx(
            "absolute left-0 top-[14px] h-0.5 w-5 rounded-full transition",
            dark ? "bg-white" : "bg-slate-900",
            open ? "-translate-y-[7px] -rotate-45" : null
          )}
        />
      </span>
    </button>
  );
}

export default function SiteHeader({ route = "" }) {
  const [open, setOpen] = useState(false);
  const visible = useHeaderVisible();
  const dark = false;
  const links = getPrimaryNavigation(route);

  useEffect(() => {
    setOpen(false);
  }, [route]);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-transform duration-300",
        visible || open ? "translate-y-0" : "-translate-y-full",
        dark
          ? "border-white/10 bg-slate-950 text-white"
          : "border-slate-200 bg-white/95 text-slate-900"
      )}
    >
      <SiteContainer className="flex min-h-20 items-center justify-between gap-6">
        <a href={routeHref("/")} className="flex items-center gap-3">
          <img src={siteAssets.logo} alt="AquaMesh Logo" className="h-10 w-auto" />
        </a>

        <MenuToggle open={open} onClick={() => setOpen((current) => !current)} dark={dark} />

        <div
          className={cx(
            "absolute inset-x-4 top-[calc(100%-0.25rem)] rounded-[28px] border p-5 shadow-2xl lg:static lg:inset-auto lg:flex lg:items-center lg:gap-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
            dark
              ? "border-white/10 bg-slate-950/96"
              : "border-slate-200 bg-white",
            open ? "block" : "hidden lg:flex"
          )}
        >
          <nav className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1" aria-label="Primary">
            {links.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.label}
                  item={item}
                  dark={dark}
                  onMobileNavigate={() => setOpen(false)}
                />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className={cx(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    dark
                      ? "text-slate-100 hover:bg-white/10 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-aquamesh-700",
                    item.active
                      ? dark
                        ? "bg-white/12 text-white"
                        : "bg-aquamesh-50 text-aquamesh-700"
                      : null
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <a
            href={routeHref("/contact/")}
            className={buttonClassName({
              size: "sm",
              className: "mt-4 lg:mt-0"
            })}
            onClick={() => setOpen(false)}
          >
            Get In Touch
          </a>
        </div>
      </SiteContainer>
    </header>
  );
}
