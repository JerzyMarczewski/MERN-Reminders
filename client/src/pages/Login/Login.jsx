import {Link} from "react-router-dom";

const Login = () => {
  return (
    <>
        <h1>Login</h1>
        <form action="/login" method="POST">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" name="password"/>
            </div>
            <button type="submit">Login</button>
        </form>
        <Link to="/register">Register</Link>
    </>
  )
}

export default Login;