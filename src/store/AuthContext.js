import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState();
  const [email, setEmail] = useState("");

  const pageLoading = useMemo(() => {
    return token === undefined;
  }, [token]);

  const isLogin = useMemo(() => {
    return token !== null;
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("muiizinToken");
    const email = localStorage.getItem("muiizinEmail");
    setToken((prevToken) => prevToken || token);
    setEmail(email);
  }, []);

  const userData = {
    pageLoading,
    isLogin,
    token,
    email,
    setToken,
    setEmail,
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
