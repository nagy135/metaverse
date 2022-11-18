import { useContext } from "react";
import { JwtTokenContext } from "../App";
import Login from "./login";
import Model from "./model";

export default () => {
  const { jwtToken } = useContext(JwtTokenContext);
  return jwtToken ? <Model /> : <Login />;
};
