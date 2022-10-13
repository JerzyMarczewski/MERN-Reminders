import {Route, Routes, BrowserRouter} from "react-router-dom";

import './App.css';
import Main from "./pages/Main/Main"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     

      <Routes>
        <Route exact path="/" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
