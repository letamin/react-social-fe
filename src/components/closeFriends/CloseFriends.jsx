import React from "react";

import "./closeFriends.css";

export default function CloseFriends({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebar-friend">
      <img
        src={PUBLIC_FOLDER + user.profilePicture}
        alt=""
        className="sidebar-friend-img"
      />
      <span className="sidebar-friend-name">{user.username}</span>
    </li>
  );
}
