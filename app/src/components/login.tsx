import loginSignup from "@api/login-signup";
import { API_EP } from "@constants/api";
import { JwtTokenContext } from "App";
import { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";

export const LOGIN_EP = `${API_EP}/login`;

export default () => {
  const [username, setUsername] = useState<string>("viktor");
  const [password, setPassword] = useState<string>("viktor");

  const { setJwtToken } = useContext(JwtTokenContext);

  const handleLogin = useCallback(async () => {
    const token = await loginSignup("login", { username, password });
    if (token !== null) setJwtToken(token);
  }, [username, password]);

  const handleSignup = useCallback(async () => {
    try {
      await loginSignup("signup", { username, password });
    } catch (error) {
      alert("signup failed");
      return;
    }
    alert("user created ...logging in");
    const token = await loginSignup("login", { username, password });
    if (token !== null) setJwtToken(token);
  }, [username, password]);

  return (
    <div className="container h-screen mx-auto flex flex-col max-w-xs items-center mt-5 justify-center">
      <input
        type="text"
        value={username}
        className="input input-bordered w-full mb-3"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={password}
        className="input input-bordered w-full mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex flex-col w-full gap-y-2">
        <div className="flex justify-between gap-x-2">
          <button
            className="btn btn-primary flex-1"
            onClick={() => handleLogin()}
          >
            LOGIN
          </button>
          <button className="btn" onClick={() => handleSignup()}>
            SIGN UP
          </button>
        </div>
        <Link className="btn btn-warning" to="/models">
          All models
        </Link>
      </div>
    </div>
  );
};
