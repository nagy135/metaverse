import { useCallback, useContext } from "react";
import { JwtTokenContext } from "../App";
import Login from "./login";

interface IProps {
  children: JSX.Element;
}

const JWT_TOKEN_KEY = "jwt-token";

export default ({ children }: IProps) => {
  let { jwtToken, setJwtToken } = useContext(JwtTokenContext);

  // NOTE: try getting it from localStorage if present
  if (jwtToken) {
    localStorage.setItem(JWT_TOKEN_KEY, jwtToken);
  } else {
    const localJwtToken = localStorage.getItem(JWT_TOKEN_KEY);
    if (localJwtToken) setJwtToken(localJwtToken);
  }

  const handleLogOut = useCallback(() => {
    setJwtToken(null);
    localStorage.removeItem(JWT_TOKEN_KEY);
  }, []);

  const content = jwtToken ? (
    <div>
      <div className="flex justify-end">
        <button onClick={() => handleLogOut()} className="btn btn-error m-2">
          Log out
        </button>
      </div>
      {children}
    </div>
  ) : (
    children
  );

  return jwtToken ? content : <Login />;
};
