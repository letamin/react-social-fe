import { useEffect, useState, useContext } from "react";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

import "./rightbar.css";

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    currentUser.followings.includes(user?.id);
  });

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put("/user/" + user._id + "/follow", {
          userId: currentUser._id,
        });
      } else {
        await axios.put("/user/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
      }
    } catch (err) {
      console.log(err);
    }

    setFollowed(!followed);
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthday-container">
          <img
            src={`${PUBLIC_FOLDER}gift.png`}
            alt="gift"
            className="birthday-img"
          />
          <span className="birthday-text">
            <b>QWERTY JKFHDJFGSDYUUI</b> and <b>3 other friends</b> have a
            birthday today.
          </span>
        </div>
        <img src={`${PUBLIC_FOLDER}ad.png`} alt="ads" className="rightbar-ad" />
        <h4 className="rightbar-title">Online Friends</h4>
        <ul className="rightbar-list-friend">
          {Users.map((user) => (
            <Online user={user} key={user.id} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbar-follow-btn" onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbar-title">User information</h4>
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">City:</span>
            <span className="rightbar-info-value">{user.city}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">From:</span>
            <span className="rightbar-info-value">{user.from}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Relationship:</span>
            <span className="rightbar-info-value">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbar-title">User friends</h4>
        <div className="rightbar-followings">
          {friends.map((friend) => (
            <div className="rightbar-following" key={friend._id}>
              <Link to={`/profile/${friend.username}`}>
                <img
                  src={
                    friend.profilePicture
                      ? PUBLIC_FOLDER + friend.profilePicture
                      : PUBLIC_FOLDER + "person/noAvatar.png"
                  }
                  alt="following"
                  className="rightbar-following-img"
                />
              </Link>
              <span className="rightbar-following-name">{friend.username}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
