import React, { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/clickOutside";
import getCroppedImg from "../../helpers/getCroppedImg";
import Cropper from "react-easy-crop";
import { uploadImages } from "../../functions/uploadImages";
import { useSelector } from "react-redux";
import { updateCover } from "../../functions/user";
import { createPost } from "../../functions/post";
import ClipLoader from "react-spinners/ClipLoader";
import OldCovers from "./OldCovers";

function Cover({ cover, visitor, photos }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPic, setCoverPic] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const menuRef = useRef();
  const refInput = useRef();
  const coverRef = useRef();
  const cRef = useRef();

  const { user } = useSelector((state) => ({ ...state }));

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef();

  const zoomOut = () => {
    sliderRef.current?.stepDown();
    setZoom(sliderRef?.current?.value);
  };
  const zoomIn = () => {
    sliderRef.current?.stepUp();
    setZoom(sliderRef?.current?.value);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const [description, setDescription] = useState("");

  const getCroppedImage = useCallback(
    async (crop) => {
      try {
        const img = await getCroppedImg(coverPic, croppedAreaPixels);
        if (crop === "crop") {
          setZoom(1);
          setCrop({ x: 0, y: 0 });

          setCoverPic(img);
        } else {
          setCoverPic(img);

          return img;
        }
      } catch (error) {
        console.log(`error`, error);
      }
    },
    [croppedAreaPixels]
  );

  useClickOutside(menuRef, () => {
    setShowCoverMenu(false);
  });

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
      setCoverPic(event.target.result);
    };
  };

  const [width, setWidth] = useState();

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);

  const updateCoverPic = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();

      let blob = await fetch(img).then((b) => b.blob());

      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      console.log(`res[0]`, res[0]);
      const updatedPic = await updateCover(res[0].url, user.token);
      console.log(`updatedPic`, updatedPic);
      if (updatedPic === "data") {
        const new_post = await createPost(
          "coverPicture",
          null,
          null,
          res,
          user.id,
          user.token
        );
        if (new_post.status === "data") {
          setTimeout(() => {
            setLoading(false);
            setCoverPic("");
            cRef.current.src = res[0].url;
          }, 2000);
        } else {
          setError(new_post);
          console.log(`babababa`);
          setLoading(false);
        }
      } else {
        setError(updatedPic);
        console.log(`wawawawawa`);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
      console.log(`zazazaaza`);
    }
  };

  return (
    <div className="profile_cover" ref={coverRef}>
      {coverPic && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Your cover photo is public.
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opactiy_btn"
              onClick={() => setCoverPic("")}
            >
              Cancel
            </button>
            <button className="blue_btn" onClick={() => updateCoverPic()}>
              {loading ? (
                <ClipLoader color="#fff" loading={loading} size={8} />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={refInput}
        hidden
        accept="image/jpeg, image/png, image/webp, image/gif"
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
      {coverPic && (
        <div className="cover_cropper">
          <Cropper
            image={coverPic}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPic && (
        <img src={cover} alt="" className="cover" ref={cRef} />
      )}
      {!visitor && (
        <div className="update_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            Add Cover Photo
          </div>
          {showCoverMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => setShow(true)}
              >
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => refInput.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
      {show && (
        <OldCovers
          photos={photos}
          setCoverPic={setCoverPic}
          setShow={setShow}
        />
      )}
    </div>
  );
}

export default Cover;
