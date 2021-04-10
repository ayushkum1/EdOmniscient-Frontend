import React, { useContext } from "react";
import { refreshLogin } from "../services/auth.service";

export const TokenContext = React.createContext();
TokenContext.displayName = "TokenContext";

export const useToken = () => useContext(TokenContext);

export function TokenWrapper({ children }) {
  const [token, setToken] = React.useState("invalid token");

  React.useEffect(() => {
    const refreshToken = () => {
      refreshLogin()
        .then((resp) => {
          setToken(resp.data.jwt);

          // silent refresh to improve UX
          setTimeout(() => {
            refreshToken();
          }, 280000);
        })
        .catch((err) => {
          setToken(null);
        });
    };

    refreshToken();
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
