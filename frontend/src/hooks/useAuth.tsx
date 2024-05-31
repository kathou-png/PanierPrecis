import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "../types";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export type AuthContextType = {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = async (data: unknown) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
