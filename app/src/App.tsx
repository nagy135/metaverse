import LoginSwitcher from "@components/login-switcher";
import { TJwtToken } from "@ctypes/jwt";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Model from "@components/model";

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
  const [jwtToken, setJwtToken] = useState<TJwtToken>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpa3RvciIsInN1YiI6MSwiaWF0IjoxNjY4NzYyNTQyLCJleHAiOjE2Njg3NjI2MDJ9.uUS80kLr1lNO6MbFqlLxZAzuxeli00bpad-7iG7zaMQ');
  // const [jwtToken, setJwtToken] = useState<TJwtToken>(null);

  return (
    <JwtTokenContext.Provider value={{ jwtToken, setJwtToken }}>
      <Router>
        <Routes>
          <Route index element={<LoginSwitcher />} />
          <Route path="models/:id" element={<Model />} />
        </Routes>
      </Router>
    </JwtTokenContext.Provider>
  );
}

export default App;
