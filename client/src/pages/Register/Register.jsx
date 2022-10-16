import {Link, redirect, useNavigate, Redi} from "react-router-dom";
import axios from "axios";
import { useState } from "react";


// TODO: Change password input to text for production

const Register = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState(""); 
  const [password1, setPassword1] = useState(""); 
  const [password2, setPassword2] = useState(""); 

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!username) return alert("username is required");
    if (!password1 || !password2) return alert("password fields are required");
    if (password1 != password2) return alert("passwords must be the same");

    axios.post("http://localhost:5000/register", {
      username: username,
      password1: password1,
      password2: password2
    })
      .then(res => {
        console.log(res);
        console.log(res.status);
        console.log(res.data);
      })

    // navigate("/");
  }

  return (
    <>
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password1">Password</label>
                <input type="text" id="password1" name="password1" value={password1} onChange={(e) => setPassword1(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password2">Password</label>
                <input type="text" id="password2" name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
            </div>
            <button type="submit">Register</button>
        </form>
        <Link to="/login">Login</Link>
    </>
  )
}

export default Register