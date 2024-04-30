import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Track from "./components/Track";
import Protection from "./components/Protection";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import Diet from "./components/Diet";
function App() {
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const isAuthenticated = () => {
    return loggedIn !== null;
  };

  //  useEffect(()=>{
  //   if(localStorage.getItem('userData')!==null){
  //     let data = JSON.parse(localStorage.getItem('userData'));
  //     setLoggedIn(data);

  //   }
  // },[])
  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!isAuthenticated() ? <Login /> : <Navigate to="/track" />} />
          <Route path="/login" element={!isAuthenticated() ? <Login /> : <Navigate to="/track" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/track" element={isAuthenticated() ? <Protection Component={Track} /> : <Navigate to="/login" />} />
          <Route path="/diet" element={isAuthenticated() ? <Protection Component={Diet} /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
