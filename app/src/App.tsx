import LoginSwitcher from "@components/login-switcher";
import { createContext, useState } from "react";

type TJwtToken = string | null;
type TJwtTokenContext = {
  jwtToken: TJwtToken;
  setJwtToken: (token: TJwtToken) => void;
};
const jwtTokenContextDefault: TJwtTokenContext = {
  jwtToken: null,
  setJwtToken: (_token: TJwtToken): void => {},
};

export const JwtTokenContext = createContext<TJwtTokenContext>(
  jwtTokenContextDefault
);

function App() {
  const [jwtToken, setJwtToken] = useState<TJwtToken>(null);

  return (
    <JwtTokenContext.Provider value={{ jwtToken, setJwtToken }}>
      <LoginSwitcher />
    </JwtTokenContext.Provider>
  );
}

export default App;
