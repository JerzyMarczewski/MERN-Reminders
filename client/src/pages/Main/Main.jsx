import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Main = (props) => {
  const navigate = useNavigate();

  const {value, setValue} = useContext(UserContext);

  useEffect(() => {
    // if (!userContextValue) navigate("/register");
  }, [])
  

  return (
    <>
      <div>Main: {value}</div>
      <Link to="/login">Login</Link>
    </>
  )
}

export default Main;