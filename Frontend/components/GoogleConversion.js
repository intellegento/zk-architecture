import * as React from "react";

const sendTo = process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_SEND_TO;

const GoogleConversion = ({ children, onClick, ...props }) => {
  const wrappedClick = (...props) => {
    if (window && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: sendTo,
        event_callback: () => {
          if (onClick) {
            onClick(...props);
          }
        },
      });
    } else {
      if (onClick) {
        onClick(...props);
      }
    }
  };

  return React.cloneElement(children, { ...props, onClick: wrappedClick });
};

export default GoogleConversion;
