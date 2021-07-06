import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const USERNAME = useParams().username;

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user/?username=${USERNAME}`);
      setUser(res.data);
    };

    fetchUser();
  }, [USERNAME]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                src={
                  user.coverPicture
                    ? PUBLIC_FOLDER + user.coverPicture
                    : PUBLIC_FOLDER + "person/noCover.png"
                }
                alt="cover"
                className="profile-cover-img"
              />
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "person/noCover.png"
                }
                alt="cover"
                className="profile-user-img"
              />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name">{user.username}</h4>
              <span className="profile-info-desc">{user.desc}</span>
            </div>
          </div>
          <div className="profile-right-bottom">
            <Feed username={USERNAME} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
