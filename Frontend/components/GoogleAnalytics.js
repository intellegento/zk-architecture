import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCookie } from "./CookieContainer";

const gtagId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "";

const GoogleAnalytics = () => {
  const router = useRouter();
  const { isCookieAccepted } = useCookie();

  const handleRouteChange = (url) => {
    if (window.gtag) {
      window.gtag("set", "page_path", url);
      window.gtag("event", "page_view");
    }
  };

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
    <Head>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtagId}');
          `,
        }}
      />
    </Head>
  );
};

export default GoogleAnalytics;
