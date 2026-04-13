import { useState, useCallback, useEffect } from "react";

interface UseDarkModeOptions {
  storageKey?: string;
}

export function useDarkMode({ storageKey = "theme" }: UseDarkModeOptions = {}) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(storageKey);
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(storageKey, isDark ? "dark" : "light");
  }, [isDark, storageKey]);

  const toggle = useCallback(() => setIsDark((prev) => !prev), []);

  return { isDark, toggle };
}
