import React, { useState } from "react";
import "./LoginAuth.css";
import { SpinnerLoading } from "../layout/Utils/SpinnerLoading";
import { Redirect } from "react-router-dom";

export const LoginAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNotAuthenticated, setIsNotAuthenticated] = useState(true);

  const handleSubmit = () => {
    const requestData = {
      email,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };
    setIsLoading(true);
    fetch("http://localhost:8080/api/login", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data != null) {
          setIsAuthenticated(true);
          localStorage.setItem("authToken", JSON.stringify(data));
        }
      })
      .catch(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsNotAuthenticated(true);
        }, 2000);
        setIsNotAuthenticated(false);
      });
  };

  if (isLoading) {
    return (
      <div className="container">
        <SpinnerLoading />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <div id="login-form-wrap">
      {!isNotAuthenticated && (
        <div className="alert alert-danger" role="alert">
          You are not authorized to access this page. Please log in to continue.
        </div>
      )}

      <h2>Login</h2>
      <form id="login-form">
        <p>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            required
            value={email} // Bind the email input field to the email state
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
          />
          <i className="validation" />
          <span></span>
          <span></span>
        </p>
        <p>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password} // Bind the password input field to the password state
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          />
          <i className="validation" />
          <span></span>
          <span></span>
        </p>
        <p>
          <input
            type="button"
            id="login"
            value="Login"
            onClick={handleSubmit} // Call the handleSubmit function on button click
          />
        </p>
      </form>
      <div id="create-account-wrap">
        <p>
          Not a member? <a href="#">Create Account</a>
        </p>
      </div>
    </div>
  );
};
