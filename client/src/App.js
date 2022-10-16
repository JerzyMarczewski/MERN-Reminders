import {useState} from "react";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";

import './App.css';
import Main from "./pages/Main/Main"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">

     <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ !username ? <Navigate to="/register" /> : <Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
