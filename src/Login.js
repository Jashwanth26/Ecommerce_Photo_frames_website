// Login.js
import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");

  const navigate = useNavigate();

  const changeEmail = (f) => {
    setEmail(f.target.value);
  };
  const changePswd = (g) => {
    setPswd(g.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, pswd)
      .then(() => {
        alert("Login successful");
        navigate("/frames");
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <div className="container" style={{ width: "450px" }}>
        <div className="card">
          <div className="card-title text-center">
            <h1>Login</h1>
          </div>
          <div className="card-body">
            <form onSubmit={submitData}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={changeEmail}
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={pswd}
                  onChange={changePswd}
                  className="form-control"
                  id="password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
