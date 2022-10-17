import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.username)
      navigate("/register");
  }, [])
  

  return (
    <div>Main</div>
  )
}

export default Main;