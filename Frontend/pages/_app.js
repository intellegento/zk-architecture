import ResizeContainer from "../components/ResizeContainer";
import AppMobileHeight from "../components/AppMobileHeight";
import RouterChangeContainer from "../components/RouterChangeContainer";
import OnReady from "../components/OnReady";
import PasswordGuard from "../components/PasswordGuard";
import RouterHistoryContainer from "../components/HistoryContainer";
import CookieContainer from "../components/CookieContainer";
import Cursor from "../components/Cursor";
import SiteLoader from "../components/SiteLoader";
import "../styles/global.scss";
import ImagePreloader from "../components/ImagePreloader";
const isDevelopment = process && process.env.NODE_ENV !== "production";

function MyApp({ Component, pageProps }) {
  const globalImages = [
    "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/aniva/aniva_introSlider_all_1.jpg",
    "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/aniva/aniva_introSlider_mob_1.jpg",
    "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/obydenskij/obydenskij_introSlider_1.jpg",
    "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/obydenskij/obydenskij_introSlider_mob_1.jpg",
    "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/qatar_desert_rose/qatar_introSlider_1.jpg",
    "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/qatar_desert_rose/qatar_introSlider_mob_1.jpg",
    "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/high_bay/highBay_introSlider_1.jpg",
    "https://d10ivpwyhlengi.cloudfront.net/images/projectDetail/high_bay/highBay_introSlider_mob_1.jpg",
  ];
  return (
    <>
    <PasswordGuard>
    <ResizeContainer>
      <ImagePreloader images={globalImages} />
      <OnReady />
      <RouterChangeContainer />
      <AppMobileHeight />
      <SiteLoader>
          {/* <CookieContainer> */}
            <Component {...pageProps} />
          {/* </CookieContainer> */}
      </SiteLoader>
      {/* <Cursor /> */}
      <RouterHistoryContainer />
    </ResizeContainer>
    </PasswordGuard>
    <Cursor />
    </>
  );
}

export default MyApp;