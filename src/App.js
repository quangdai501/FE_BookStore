import React from "react";
import Home from "./pages/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      {/* <div>Day la root file</div> */}
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
