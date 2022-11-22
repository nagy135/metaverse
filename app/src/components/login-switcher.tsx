import { useContext } from "react";
import { JwtTokenContext } from "../App";
import Login from "./login";

interface IProps {
  children: JSX.Element;
}

export default ({ children }: IProps) => {
  const { jwtToken } = useContext(JwtTokenContext);
  return jwtToken ? children : <Login />;
};
