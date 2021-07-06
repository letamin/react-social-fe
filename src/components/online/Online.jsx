import React from "react";

import "./online.css";

export default function Online({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbar-friend">
      <div className="rightbar-profile-img-container">
        <img
          src={PUBLIC_FOLDER + user.profilePicture}
          alt="profile"
          className="rightbar-profile-img"
        />
        <span className="rightbar-online"></span>
      </div>
      <span className="rightbar-username">{user.username}</span>
    </li>
  );
}
