import { useContext, useRef, useState } from "react";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import "./share.css";

export default function Share() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const desc = useRef();

  const handlePostCreate = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    console.log(file);

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/post", newPost);
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            src={
              user.profilePicture
                ? PUBLIC_FOLDER + user.profilePicture
                : PUBLIC_FOLDER + "person/noAvatar.png"
            }
            alt="avatar"
            className="share-profile-img"
          />
          <input
            type="text"
            className="share-input"
            placeholder="What's in your mind?"
            ref={desc}
          />
        </div>
        <hr className="share-hr" />
        {file && (
          <div className="share-img-container">
            <img
              src={URL.createObjectURL(file)}
              alt="upload"
              className="share-img"
            />
            <Cancel
              className="share-cancel-icon"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="share-bottom" onSubmit={handlePostCreate}>
          <div className="share-options">
            <label htmlFor="file-input" className="share-option">
              <PermMedia className="share-icon" htmlColor="tomato" />
              <span className="share-option-text">Photos/Videos</span>
              <input
                type="file"
                id="file-input"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="share-option">
              <Label className="share-icon" htmlColor="blue" />
              <span className="share-option-text">Tag</span>
            </div>
            <div className="share-option">
              <Room className="share-icon" htmlColor="green" />
              <span className="share-option-text">Location</span>
            </div>
            <div className="share-option">
              <EmojiEmotions className="share-icon" htmlColor="gold" />
              <span className="share-option-text">Feelings</span>
            </div>
          </div>
          <button className="share-button" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
