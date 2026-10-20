import { createContext, useContext } from "react";

export type CurtainApi = {
  /** Route with the panel wipe; same-page anchors scroll smoothly instead. */
  go: (to: string) => void;
};

export const CurtainContext = createContext<CurtainApi>({ go: () => undefined });

export const usePageCurtain = () => useContext(CurtainContext);
