import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll window to top on every client-side route change. */
export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
}
