import {useState, useEffect} from "react";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";

import './App.css';
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import {UserContext} from "./Context/UserContext";

function App() {
  const [value, setValue] = useState(""); 

  return (
    <div className="App">

     <BrowserRouter>
      <UserContext.Provider value={{value, setValue}}>
        <Routes>
          <Route exact path="/" element={<Main />}/>
          <Route path="/login" element={<Login cb={(uname) => setValue(uname)} />}/>
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
     </BrowserRouter>
    </div>
  );
}

export default App;
