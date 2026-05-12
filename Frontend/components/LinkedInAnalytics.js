import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import CookieContext from "../contexts/CookieContext";

const LinkedInAnalytics = () => {
  const router = useRouter();
  const { isCookieAccepted } = React.useContext(CookieContext);

  const handleRouteChange = () => {
    if (window.lintrk) {
      window.lintrk("track");
    }
  };

  React.useEffect(() => {
    if (isCookieAccepted) {
      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [isCookieAccepted]);

  return (
    <>
      {isCookieAccepted && (
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                _linkedin_partner_id = "3577844";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
          `,
            }}
          />
        </Head>
      )}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://px.ads.linkedin.com/collect/?pid=3577844&fmt=gif"
        />
      </noscript>
    </>
  );
};

export default LinkedInAnalytics;
