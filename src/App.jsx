import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Head from "./components/Head/Head";
import Foot from "./components/Foot/Foot";
import Main from "./pages/Main";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Head />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Foot />
      </BrowserRouter>
    </div>
  );
}

export default App;
