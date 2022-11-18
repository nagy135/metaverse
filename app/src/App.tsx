import LoginSwitcher from "@components/login-switcher";
import { createContext } from "react";

export const JwtTokenContext = createContext<string | null>(null);

function App() {
  return (
    <JwtTokenContext.Provider value={null}>
      <LoginSwitcher />
    </JwtTokenContext.Provider>
  );
}

export default App;
