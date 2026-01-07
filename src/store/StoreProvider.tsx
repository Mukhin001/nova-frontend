"use client";

import { Provider } from "react-redux";
import { ReactNode, useState } from "react";
import { AppStore, makeStore } from "./store";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
