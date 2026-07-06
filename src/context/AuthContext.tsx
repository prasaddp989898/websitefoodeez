import { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [authView, setAuthView] = useState<"login" | "signup" | "forgot">("login");
  const customerAuthLoginUrl = "http://localhost:3000/customer/auth/login";
  const appRedirectUrl = window.location.origin + "/";

  const goToCustomerAuthLogin = () => {
    const urlWithRedirect = `${customerAuthLoginUrl}?redirect_uri=${encodeURIComponent(appRedirectUrl)}`;
    window.location.href = urlWithRedirect;
  };

  return (
    <AuthContext.Provider value={{
      isAuthOpen,
      setIsAuthOpen,
      isLoggedIn,
      setIsLoggedIn,
      userName,
      setUserName,
      authView,
      setAuthView,
      goToCustomerAuthLogin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);