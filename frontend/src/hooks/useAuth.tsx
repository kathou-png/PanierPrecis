import { createContext, useContext, useMemo } from "react";
import { User, UserLogin } from "../types.ts/user";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type AuthContextType = {
  user: UserLogin | null;
  login: (data: User) => void;
  logout: () => void;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);

  // call this function when you want to authenticate the user
  const login = async (data: UserLogin) => {
    console.log("login");
    setUser(data);
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType | undefined => {
  return useContext(AuthContext);
};
