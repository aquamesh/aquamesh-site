"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const HeaderVisibilityContext = createContext(true);

export function HeaderVisibilityProvider({ children }) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    if (y > lastScrollY.current && y > 80) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    lastScrollY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <HeaderVisibilityContext.Provider value={visible}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
}

export function useHeaderVisible() {
  return useContext(HeaderVisibilityContext);
}
