import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
const Model = ({ user }) => {
  const [data, setData] = useState({
    original_url: "",
    user_email: user,
  });
  const [shortId, setShortId] = useState(null);
  const postData = async (e) => {
    try {
      e.preventDefault();
      console.log(data);
      const res = await fetch(`${backendUrl}/api/create-short-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setShortId(result.code);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  return (
    <div className="over">
      <div className="model">
        <div className="form-title">
          <h3>Enter Your url</h3>
        </div>
        <form onSubmit={postData} className="form-url">
          <input
            type="text"
            name="original_url"
            value={data.original_url}
            id="url"
            placeholder={`url for shortner`}
            required
            onChange={handleChange}
          />
          <button>submit</button>
        </form>
        {shortId && (
          <a href={`${backendUrl}/${shortId}`}>{backendUrl + "/" + shortId}</a>
        )}
      </div>
    </div>
  );
};

export default Model;
