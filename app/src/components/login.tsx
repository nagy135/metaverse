import loginSignup from "@api/login-signup";
import { API_EP } from "@constants/api";
import { JwtTokenContext } from "App";
import { useContext, useState } from "react";

export const LOGIN_EP = `${API_EP}/login`;

export default () => {
  const [username, setUsername] = useState<string>("viktor");
  const [password, setPassword] = useState<string>("viktor");

  const { setJwtToken } = useContext(JwtTokenContext);

  const handleLogin = (logSig: 'login' | 'signup') => {
    loginSignup(logSig, { username, password }).then((e: string) =>
      setJwtToken(e)
    );
  };

  return (
    <div className="container mx-auto flex flex-col items-center mt-5">
      <input
        type="text"
        value={username}
        className="input input-bordered w-full max-w-xs mb-3"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={password}
        className="input input-bordered w-full max-w-xs mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" onClick={() => handleLogin('login')}>
        LOGIN
      </button>
      <button className="btn" onClick={() => handleLogin('signup')}>
        SIGN UP
      </button>
    </div>
  );
};
