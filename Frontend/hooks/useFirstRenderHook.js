import React from "react";

function useFirstRender() {
  const [isFirstInit, setFirstInit] = React.useState(false);

  React.useEffect(() => {
    setFirstInit(true);
  }, []);

  return isFirstInit;
}

export default useFirstRender;
