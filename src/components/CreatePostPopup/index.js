import React, { useRef, useState } from "react";
import { createPost } from "../../functions/post";
import useClickOutside from "../../helpers/clickOutside";
import AddToYourPost from "./AddToYourPost";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import ImagePreview from "./ImagePreview";
import ClipLoader from "react-spinners/ClipLoader";

import "./styles.css";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";

function CreatePostPopup({
  user,
  setCreatePostVisible,
  post,
  dispatch,
  profile,
}) {
  const [text, setText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const popupRef = useRef(null);

  useClickOutside(popupRef, () => {
    setCreatePostVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const res = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setTimeout(() => {
        setLoading(false);

        if (res.status === "data") {
          dispatch({
            type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
            payload: [res.data, ...post],
          });
          setBackground("");
          setText("");
          setCreatePostVisible(false);
        } else {
          setError(res);
        }
      }, 2000);
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });

      const path = `${user.username}/post_images`;

      let formData = new FormData();

      formData.append("path", path);

      postImages.forEach((image) => {
        formData.append("file", image);
      });

      const response = await uploadImages(formData, path, user.token);

      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setTimeout(() => {
        setLoading(false);

        if (res.status === "data") {
          dispatch({
            type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
            payload: [res.data, ...post],
          });
          setText("");
          setImages("");
          setCreatePostVisible(false);
        } else {
          setError(res);
        }
      }, 2000);
    } else if (text) {
      setLoading(true);
      const res = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setTimeout(() => {
        setLoading(false);

        if (res.status === "data") {
          dispatch({
            type: profile ? "PROFILE_POSTS" : "POSTS_SUCCESS",
            payload: [res.data, ...post],
          });
          setBackground("");
          setText("");
          setCreatePostVisible(false);
        } else {
          setError(res);
        }
      }, 2000);
    } else {
      console.log("nothign");
    }
  };

  return (
    <div className="blur">
      <div className="postBox" ref={popupRef}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => setCreatePostVisible(false)}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPreview ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              setText={setText}
              user={user}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            images={images}
            setImages={setImages}
            setShowPreview={setShowPreview}
            error={error}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPreview={setShowPreview} />
        <button
          className="post_submit"
          onClick={() => postSubmit()}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#fff" loading={loading} size={10} />
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
}

export default CreatePostPopup;
