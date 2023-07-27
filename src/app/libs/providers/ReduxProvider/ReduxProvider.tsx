"use client";

import { store } from "@/app/store";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: React.PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
