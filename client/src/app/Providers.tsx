import React from "react";

import StoreProvider from "@/state/redux";

function Providers({ children }: React.PropsWithChildren) {
  return <StoreProvider>{children}</StoreProvider>;
}

export default Providers;
