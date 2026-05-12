import * as React from "react";
import { useRouter } from "next/router";

function useRouteChange(callback) {
  const router = useRouter();
  React.useEffect(() => callback, [router.asPath]);
}

export default useRouteChange;
