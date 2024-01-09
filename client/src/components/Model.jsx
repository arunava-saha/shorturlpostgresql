import React, { useState } from "react";

const Model = ({ user }) => {
  const [data, setData] = useState({
    original_url: "",
    user_email: user,
  });
  const postData = async (e) => {
    try {
      e.preventDefault();
      console.log(data);
      const res = await fetch("http://localhost:8000/api/create-short-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
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
      </div>
    </div>
  );
};

export default Model;
