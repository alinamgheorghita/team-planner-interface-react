import React from "react";

import "./Login.scss";

import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/dashboard");
    console.log("SIGN IN WAS PRESSED");
  };

  return (
    <div className="page-login-container">
      <div className="login-form-card">
        <p className="title">SIGN IN TO YOUR ACCOUNT</p>
        <div className="input-container">
          <p className="input-label">Username</p>
          <input
            className="username-bar"
            type="text"
            placeholder="Type your username"
          />
        </div>
        <div className="input-container">
          <p className="input-label">Password</p>
          <input
            className="password-bar"
            type="text"
            placeholder="Type your password "
          />
        </div>
        <button onClick={handleClick}>SIGN IN</button>
      </div>
    </div>
  );
};

export default Login;
