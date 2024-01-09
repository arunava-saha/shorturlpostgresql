import React, { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { List } from "./components/List";
import { Auth } from "./components/Auth";
import { useCookies } from "react-cookie";
const backendUrl = "http://localhost:8000";
export { backendUrl };
const App = () => {
  const [urls, setUrls] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const user = cookies.Email;
  const authToken = cookies.authToken;
  const getUrls = async () => {
    try {
      const res = await fetch(`${backendUrl}/v1/urls/${user}`);
      const data = await res.json();
      console.log(data);
      setUrls(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    authToken && getUrls();
  }, []);
  return (
    <div>
      {authToken ? (
        <>
          <NavBar />
          <List user={user} urls={urls} />
        </>
      ) : (
        <>
          <div className="containerDiv">
            <Auth />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
