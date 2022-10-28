import {Link, useNavigate} from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

const Login = (props) => {

  const navigate = useNavigate()

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const {value, setValue} = useContext(UserContext);

  useEffect(() => {
    // console.log(userContextValue);
    if (value) navigate("/");
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!username) return alert("Username is required");
    if (!password) return alert("Password is required");

    axios.post("http://localhost:5000/login", {
      username: username,
      password: password
    }).then(res => {
      console.log(res.data);
      if (!res.data.ok) return alert(res.data.message);

      setValue(username);
      navigate("/");
    }).catch(err => console.log(err));

    
  }

  return (
    <>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="username" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
        <Link to="/register">Register</Link>
    </>
  )
}

export default Login;