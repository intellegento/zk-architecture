import * as React from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { useCookie } from "./CookieContainer";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const getPageUrl = () => {
  if (window) {
    return window.location.origin + window.location.pathname;
  }
  return "";
};

const GoogleTagManager = () => {
  const router = useRouter();
  const { isCookieAccepted } = useCookie();

  const handleRouteChange = (router) => {
    if (window.dataLayer) {
      setTimeout(() => {
        window.dataLayer.push({
          pageTitle: document?.title || "",
          pagePath: router.asPath,
          pageURL: getPageUrl(),
          event: "pageView",
        });
      }, 500);
    }
  };

  React.useEffect(() => {
    handleRouteChange(router);
  }, [router.asPath]);

  React.useEffect(() => {
    if (isCookieAccepted) {
      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [isCookieAccepted]);

  if (!isCookieAccepted) {
    return null;
  }

  return (
    <>
      <Script
        id="GoogleTagManager"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
};

export default GoogleTagManager;
