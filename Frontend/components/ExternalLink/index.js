import * as React from "react";

const ExternalLink = ({ url, ...props }) => {
  return <a href={url} {...props} rel="noopener" />;
};

ExternalLink.defaultProps = {
  target: "_blank",
};

export default ExternalLink;
