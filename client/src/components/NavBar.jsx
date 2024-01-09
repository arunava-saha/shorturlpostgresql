import React from "react";

export const NavBar = () => {
  const signOut = () => {};
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
