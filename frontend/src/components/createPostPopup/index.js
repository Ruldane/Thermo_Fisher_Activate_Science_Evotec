import "./style.css";
import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
const CreatePostPopup = ({ user }) => {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const textRef = useRef(null);

  return (
    <div className="blur">
      <div className="postBox">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="avatar" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src={"../../../icons/public.png"} alt="privacy" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev && (
          <>
            <div className="flex_center">
              <textarea
                ref={textRef}
                placeholder={`What's on your mind ${user?.first_name}?`}
                className="post_input"
                maxLength="100"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <EmojiPickerBackground
              textRef={textRef}
              setText={setText}
              text={text}
            />
          </>
        )}
        <AddToYourPost />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
