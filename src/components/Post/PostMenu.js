import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import useOnClickOutside from "../../helpers/clickOutside";
import { deletePost, savePost } from "../../functions/post";
import { saveAs } from "file-saver";

function PostMenu({ post, setShowMenu, checkSaved, setCheckSaved, postRef }) {
  const { user } = useSelector((state) => ({ ...state }));

  const [test, setTest] = useState(post.user._id === user.id ? true : false);

  const menuRef = useRef();

  useOnClickOutside(menuRef, () => {
    setShowMenu(false);
  });

  const imageLength = post?.images?.length;

  const saveHandler = async () => {
    savePost(post._id, user.token);
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };

  const downloadImages = async () => {
    post.images.map((img) => {
      saveAs(img.url, "image.jpg");
    });
  };

  const handleDelete = async () => {
    const res = await deletePost(post._id, user.token);
    if (res.status === "working") {
      postRef.current.remove();
    }
  };

  return (
    <ul className="post_menu" ref={menuRef}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items"
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items"
          />
        )}
      </div>
      <div className="line"></div>
      {test && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )}
      {imageLength && (
        <div onClick={() => downloadImages()}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {imageLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
      {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post."
        />
      )}
      {test && <MenuItem icon="delete_icon" title="Turn off translations." />}
      {test && <MenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive" />}
      {test && (
        <div onClick={() => handleDelete()}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report Post"
          subtitle="I'm concerned about this post"
        />
      )}
    </ul>
  );
}

export default PostMenu;
