import React from "react";
import Model from "./Model";
import { backendUrl } from "../App";
export const List = ({ user, urls }) => {
  return (
    <div className="list">
      <Model user={user} />
      <div className="url-list">
        {urls.map((el, i) => (
          <div className="url-item" key={i}>
            <a href={backendUrl + "/" + el.code}>
              {backendUrl + "/" + el.code}
            </a>
            <p className="date-url">{el.date}</p>
            <p className="clicks-url">{el.clicks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
