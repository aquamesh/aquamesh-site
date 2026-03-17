"use client";

import { useEffect, useState } from "react";
import { routeHref } from "../lib/site-paths";

const COOKIE_KEY = "cookiesAccepted";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!window.localStorage.getItem(COOKIE_KEY));
  }, []);

  if (!isVisible) {
    return null;
  }

  function acceptCookies() {
    window.localStorage.setItem(COOKIE_KEY, "true");
    setIsVisible(false);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-[28px] border border-slate-200 bg-white/96 p-5 shadow-2xl shadow-slate-900/15 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-sm leading-6 text-slate-600">
          We use cookies to enhance your experience. By continuing to visit this site,
          you accept our{" "}
          <a className="font-semibold text-aquamesh-700 hover:text-aquamesh-500" href={routeHref("/privacy/")}>
            Privacy Policy
          </a>
          .
        </p>
        <button
          type="button"
          onClick={acceptCookies}
          className="inline-flex items-center justify-center rounded-full bg-aquamesh-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-aquamesh-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
