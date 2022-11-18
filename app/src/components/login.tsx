import { JwtTokenContext } from "App";
import { useContext, useState } from "react";

export default () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {setJwtToken} = useContext(JwtTokenContext);

  const handleLogin = () => {
  console.log("================\n", "username: ", username, "\n================");
  console.log("================\n", "password: ", password, "\n================");
  }
  
  return (<div>
    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
    <button onClick={handleLogin}>LOGIN</button>
  </div>);
};
