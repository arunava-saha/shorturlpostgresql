import React, { useState } from "react";
import { backendUrl } from "../App";
import { useCookies } from "react-cookie";
export const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [conformPassword, setConformPassword] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== conformPassword) {
      setError("Password doesn't match!");
      return;
    }
    const res = await fetch(`${backendUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
    if (data.details) {
      setError(data.details);
    } else {
      setCookie("Email", data.email);
      setCookie("authToken", data.token);

      window.location.reload();
    }
  };
  return (
    <div className="auth">
      <div className="auth-box">
        <form>
          <h2>{isLogin ? "PLease log in" : "Please sign up"}</h2>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {!isLogin && (
            <input
              type="password"
              name="password"
              onChange={(e) => setConformPassword(e.target.value)}
              placeholder="Conform your password"
            />
          )}
          <input
            type="submit"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
            className="create"
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            style={{
              background: !isLogin ? "rgb(55, 205, 55)" : "rgb(205, 55, 55)",
              borderRadius: "20px",
              border: "none",
              color: "rgb(15, 25, 55)",
              fontSize: "medium",
              fontWeight: "600",
              margin: "10px",
            }}
            onClick={() => viewLogin(false)}
          >
            click to Sign Up Page
          </button>
          <button
            style={{
              background: isLogin ? "rgb(55, 205, 55)" : "rgb(205, 55, 55)",
              borderRadius: "20px",
              border: "none",
              color: "rgb(15, 25, 55)",
              fontSize: "medium",
              fontWeight: "600",
              margin: "10px",
            }}
            onClick={() => viewLogin(true)}
          >
            click to Login Page
          </button>
        </div>
      </div>
    </div>
  );
};
