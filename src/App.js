import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Frames from "./Framesshop";
import Cart from "./Cart";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterAndLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/frames" element={<Frames />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

const RegisterAndLogin = () => (
  <div className="auth-container">
    <Register />
    <Login />
  </div>
);

export default App;
