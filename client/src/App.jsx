import React, { useEffect, useState } from "react";

const App = () => {
  const backendUrl = "http://localhost:8000";
  const [urls, setUrls] = useState([]);
  const getUrls = async () => {
    const user = "test@test.com";
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
      {urls.map((el, i) => (
        <div key={i}>
          <p>{backendUrl + "/" + el.code}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
