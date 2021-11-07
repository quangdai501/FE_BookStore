import React from "react";
import Home from "./pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <Router>
      {/* <div>Day la root file</div> */}
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
