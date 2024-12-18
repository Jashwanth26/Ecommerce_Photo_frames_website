// Register.js
import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [cpswd, setCpswd] = useState("");

  const navigate = useNavigate();
  const changePath =()=>{
    navigate("/login")
  }

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeEmail = (f) => {
    setEmail(f.target.value);
  };
  const changePswd = (g) => {
    setPswd(g.target.value);
  };
  const changeCpswd = (h) => {
    setCpswd(h.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (pswd !== cpswd) {
      alert("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, pswd)
      .then(() => {
        alert("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  }; 

  return (
    <div className="header">
      <div className="container" >
        <div className="card">
          <div className="card-title text-center">
            <h1>Registration</h1>
          </div>
          <div className="card-body">
            <form onSubmit={submitData}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={changeName}
                  className="form-control"
                  id="name"
                />
              </div>
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
                  id="password"/>
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={cpswd}
                  onChange={changeCpswd}
                  className="form-control"
                  id="confirmPassword"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Signup
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
