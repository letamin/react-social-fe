import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

import "./post.css";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const likeHandler = () => {
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user/?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "person/noAvatar.png"
                }
                alt="avatar"
                className="post-profile-img"
              />
            </Link>
            <span className="post-username">{user.username}</span>
            <span className="post-date">{format(post.createdAt)}</span>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>
        <div className="post-center">
          <span className="post-text">{post?.desc}</span>
          {post.img && (
            <img
              src={PUBLIC_FOLDER + post.img}
              alt="post"
              className="post-img"
            />
          )}
        </div>
        <div className="post-bottom">
          <div className="post-bottom-left">
            <img
              src={`${PUBLIC_FOLDER}like.png`}
              alt="like"
              className="like-icon"
              onClick={likeHandler}
            />
            <img
              src={`${PUBLIC_FOLDER}heart.png`}
              alt="heart"
              className="like-icon"
              onClick={likeHandler}
            />
            <span className="post-like-counter">{like} people liked this</span>
          </div>
          <div className="post-bottom-right">
            <div className="post-comment-text">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}
