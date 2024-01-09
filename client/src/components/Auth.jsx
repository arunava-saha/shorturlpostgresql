import React, { useState } from "react";

export const Auth = () => {
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  return (
    <div className="auth">
      <div className="auth-box">
        <form>
          <h2>{isLogin ? "PLease log in" : "Please sign up"}</h2>
          <input type="email" name="email" placeholder="Enter your email" />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          {!isLogin && (
            <input
              type="password"
              name="password"
              placeholder="Conform your password"
            />
          )}
          <input type="submit" className="create" />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            style={{
              background: !isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
            onClick={() => viewLogin(false)}
          >
            Sign Up
          </button>
          <button
            style={{
              background: !isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
            onClick={() => viewLogin(true)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
