import React, { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { List } from "./components/List";
const backendUrl = "http://localhost:8000";
export { backendUrl };
const App = () => {
  const [urls, setUrls] = useState([]);
  const user = "test@test.com";
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
  useEffect(() => getUrls, []);
  return (
    <div>
      <NavBar />
      <List user={user} urls={urls} />
    </div>
  );
};

export default App;
