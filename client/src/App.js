import {useState, useEffect} from "react";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";

import './App.css';
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {UserContext} from "./Context/UserContext";

function App() {
  const [username, setUsername] = useState(""); 

  return (
    <div className="App">

     <BrowserRouter>
      <UserContext.Provider value={username}>
        <Routes>
          <Route exact path="/" element={<Main username={username} />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register cb={(uname) => setUsername(uname)} />} />
        </Routes>
      </UserContext.Provider>
     </BrowserRouter>
    </div>
  );
}

export default App;
