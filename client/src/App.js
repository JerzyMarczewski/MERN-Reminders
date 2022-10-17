import {useState, useEffect} from "react";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";

import './App.css';
import Main from "./pages/Main/Main"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(username);
  }, [username])

  function handleRegister(uname){
    setUsername(uname);

  } 

  return (
    <div className="App">

     <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main username={username} />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register cb={handleRegister} />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
