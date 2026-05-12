import * as React from "react";
import { useRouter } from "next/router";
import History from "../lib/history";
import uiEvents from "../lib/uiEvents";

const disableBrowserScrollRestoration = () => {
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
};

const restoreBrowserScroll = (position) => {
  window.scroll({ top: position, behavior: "auto" });
}

function RouterHistoryContainer() {
  const router = useRouter();

  const handleUrlStore = (url) => {
    History.addToHistory(url);
    if (History.scrollRestore) {
      restoreBrowserScroll(History.getPrevPosition());
      History.scrollRestore = false;
    }
  };

  const handlePositionStore = () => {
    History.savePosition(window.scrollY);
  };

  const handleGoBack = () => {
    const prevPage = History.getPrevious();
    History.scrollRestore = true;
    router.push(prevPage || "/", undefined, { scroll: false, locale: router.locale });
  }

  React.useEffect(() => {
    History.addToHistory(router.asPath);
    disableBrowserScrollRestoration();
    router.events.on("beforeHistoryChange", handlePositionStore);
    router.events.on("routeChangeComplete", handleUrlStore);
    uiEvents.on("goBack", handleGoBack)

    return () => {
      router.events.off("beforeHistoryChange", handlePositionStore);
      router.events.off("routeChangeComplete", handleUrlStore);
      uiEvents.off("goBack", handleGoBack)
    };
  }, []);

  return null;
}

export default RouterHistoryContainer;
