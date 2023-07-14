import React from "react";
import { createRootStore, RootStore } from "./TaskModel";

const MSTContext = React.createContext<RootStore | null>(null);

export const MSTProvider: React.FC = ({ children }) => {
  const rootStore = createRootStore();
  return (
    <MSTContext.Provider value={rootStore}>{children}</MSTContext.Provider>
  );
};

export const useStore = (): RootStore => {
  const store = React.useContext(MSTContext);
  if (!store) {
    throw new Error("useStore must be used within an MSTProvider.");
  }
  return store;
};
