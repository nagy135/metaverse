import { useContext } from "react";
import { JwtTokenContext } from "../App";
import Login from "./login";
import ModelSwitcher from "./model-switcher";

export default () => {
  const { jwtToken } = useContext(JwtTokenContext);
  return jwtToken ? <ModelSwitcher /> : <Login />;
};
