import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState();
  const [user, setUser] = useState({ adminId: 0, adminType: "", email: "" });

  const pageLoading = useMemo(() => {
    return token === undefined;
  }, [token]);

  const isLogin = useMemo(() => {
    return token !== null;
  }, [token]);

  useEffect(() => {
    const muiizin = localStorage.getItem("muiizin");
    const muiizinData = JSON.parse(muiizin);
    setToken(() => muiizinData?.token || null);
    setUser(() => ({
      ...muiizinData,
    }));
  }, []);

  const userData = {
    pageLoading,
    isLogin,
    token,
    user,
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
