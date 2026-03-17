"use client";

import { useHeaderVisible } from "../../header-visibility-context";
import { cx } from "../../../lib/cx";
import SiteContainer from "../../ui/site-container";
import { platformSubnavItems } from "./platform-page-data";

export default function PlatformSubnav() {
  const headerVisible = useHeaderVisible();

  return (
    <div
      className={cx(
        "sticky z-40 border-y border-slate-200 bg-white/90 px-4 py-3 backdrop-blur transition-all duration-300 sm:px-6 lg:px-8",
        headerVisible ? "top-20" : "top-0"
      )}
    >
      <SiteContainer
        padded={false}
        className="flex gap-3 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {platformSubnavItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-aquamesh-300 hover:text-aquamesh-700"
          >
            {item.label}
          </a>
        ))}
      </SiteContainer>
    </div>
  );
}
