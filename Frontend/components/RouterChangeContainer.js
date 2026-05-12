import * as React from "react";
import { useRouter } from "next/router";
import { debouncedRefreshScrollTrigger } from "../lib/gsap";

const RouterChangeContainer = () => {
  const router = useRouter();

  React.useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest("a[href]");

      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.getAttribute("rel") === "external" ||
        anchor.href.includes("#") || // игнорируем якори
        anchor.origin !== window.location.origin
      ) {
        return;
      }

      e.preventDefault();

      const url = anchor.pathname + anchor.search + anchor.hash;

      if (document.startViewTransition) {
        document.startViewTransition(() => router.push(url));
      } else {
        router.push(url);
      }
    };

    const handleRouteAfterChange = () => {
      debouncedRefreshScrollTrigger(true);
    };

    document.body.addEventListener("click", handleClick);
    router.events.on("routeChangeComplete", handleRouteAfterChange);

    return () => {
      document.body.removeEventListener("click", handleClick);
      router.events.off("routeChangeComplete", handleRouteAfterChange);
    };
  }, [router]);

  return null;
};

export default RouterChangeContainer;
