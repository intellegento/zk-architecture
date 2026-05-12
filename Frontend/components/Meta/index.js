import React from "react";
import Head from "next/head";

const buildOgImage = (image, host) => {
  if (image && image.url) {
    return `${host}${image.url}`;
  }

  return undefined
};

function Meta({ title="", description="", preview=null, locale="", host=process.env.NEXT_PUBLIC_HOST, path="/" }) {
  const [url, updateUrl] = React.useState({ host, path });
  const ogUrl = url.host + url.path;
  const ogImage = buildOgImage(preview, url.host);
  const isStaging = process && process.env.NEXT_PUBLIC_IS_STAGING;
  React.useEffect(() => {
    if (url.host !== window.location.origin || url.path !== window.location.pathname) {
      updateUrl({
        host: window.location.origin,
        path: window.location.pathname,
      });
    }
  }, []);
  return (
    <Head>
       <link rel="icon" href="/favicon.svg" />
      {/* <title>{title}</title> */}
      {/* <title>{`VALUE ${url.path}`}</title> */}
      <title>VALUE 11.19 is an architectural bureau creating public and residential spaces, shaping urban environments, developing industrial design, and crafting landscapes.</title>
      {
        isStaging && (
          <meta name="robots" content="noindex,index of embedded" />
        )
      }
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      
      <meta property="og:type" content="website" />
      <meta name="description" content={"We create inspiring public and residential spaces, shape urban environments, craft innovative industrial design, and provide landscaping."} />
      <meta property="og:title" content={"VALUE 11.19 is an architectural bureau creating public and residential spaces, shaping urban environments, developing industrial design, and crafting landscapes."} />
      <meta property="og:description" content={"We create inspiring public and residential spaces, shape urban environments, craft innovative industrial design, and provide landscaping."} />
      <meta property="og:url" content={ogUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:site" content={ogUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={"VALUE 11.19 is an architectural bureau creating public and residential spaces, shaping urban environments, developing industrial design, and crafting landscapes."} />
      <meta name="twitter:description" content={"We create inspiring public and residential spaces, shape urban environments, craft innovative industrial design, and provide landscaping."} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="theme-color" content="#FFFFFF" />
    </Head>
  );
}

export default Meta;
