import { createContext, useContext, useMemo } from "react";

const DataContext = createContext<DataContextType>({
  marketPlaces: [],
});

export type DataContextType = {
  marketPlaces: string[];
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const value: DataContextType = useMemo(
    () => ({
      marketPlaces,
    }),
    [marketPlaces]
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  return useContext(DataContext);
};
