import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { comment } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import ClipLoader from "react-spinners/ClipLoader";

function CreateComment({ postId, setCount, setComments }) {
  const [text, setText] = useState("");
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [error, setError] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [loading, setLoading] = useState(false);

  const textRef = useRef();
  const imgInput = useRef();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const { user } = useSelector((state) => ({ ...state }));

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      if (commentImage != "") {
        setLoading(true);
        const img = dataURItoBlob(commentImage);

        const path = `${user.username}/post_images/${postId}/commentImages`;

        let formData = new FormData();

        formData.append("path", path);

        formData.append("file", img);

        const imgComments = await uploadImages(formData, path, user.token);
        const comments = await comment(
          postId,
          text,
          imgComments[0].url,
          user.token
        );

        setTimeout(() => {
          setLoading(false);
          setText("");
          setCommentImage("");
          setComments(comments)
          setCount((prev) => ++prev)
        }, 1000);
      } else {
        setLoading(true);
        const comments = await comment(postId, text, "", user.token);
        setTimeout(() => {
          setLoading(false);
          setText("");
          setCommentImage("");
          setComments(comments);
          setCount((prev) => ++prev)
        }, 1000);
      }
    }
  };

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImage}
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment"
            onKeyUp={handleComment}
          />
          <div className="comment_circle" style={{ marginTop: "5px" }}>
            <ClipLoader size={20} color="#1876f2" loading={loading} />
          </div>
          <div
            className="comment_circle_icon"
            onClick={() => setPicker((prev) => !prev)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon"
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateComment;
