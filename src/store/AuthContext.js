import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState();
  const [user, setUser] = useState({ email: "", adminType: "" });

  const pageLoading = useMemo(() => {
    return token === undefined;
  }, [token]);

  const isLogin = useMemo(() => {
    return token !== null;
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("muiizinToken");
    setToken(token);
  }, []);

  const userData = {
    pageLoading,
    isLogin,
    token,
    adminEmail: user.email,
    adminType: user.adminType,
    setToken,
    setUser,
  };

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Error context undefined");
  }
  return context;
}

export { AuthContextProvider, useAuthContext };
