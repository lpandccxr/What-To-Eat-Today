import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Head from "./components/Head/Head";
import Foot from "./components/Foot/Foot";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import { useState } from "react";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

function App() {
  const [login, setLogin] = useState(false);
  return (
    <div className="app">
      <BrowserRouter>
        <Head status={login} setStatus={setLogin} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Foot />
      </BrowserRouter>
    </div>
  );
}

export default App;
