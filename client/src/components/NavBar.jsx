import React from "react";
import { useCookies } from "react-cookie";
export const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const signOut = () => {
    removeCookie("Email");
    removeCookie("authToken");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="nav">
        <h1 className="navHead">urlshortner</h1>
        <button onClick={signOut} className="sign-out">
          sign out
        </button>
      </div>
    </div>
  );
};
