import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../functions/user";

function Card({ userr, type, getData }) {
  const { user } = useSelector((state) => ({ ...state }));

  const cancelRequestHandler = async (userrId) => {
    const res = await cancelRequest(userrId, user.token);
    if (res === "data") {
      getData();
    }
  };

  const confirmHandler = async (userrId) => {
    const res = await acceptRequest(userrId, user.token);
    if (res === "data") {
      getData();
    }
  };

  const deleteHandler = async (userrId) => {
    const res = await deleteRequest(userrId, user.token);
    if (res === "data") {
      getData();
    }
  };
  return (
    <div className="req_card">
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className="req_name">
        {userr.first_name} {userr.last_name}
      </div>
      {type === "sent" ? (
        <button
          className="blue_btn"
          onClick={() => cancelRequestHandler(userr._id)}
        >
          Cancel Request
        </button>
      ) : type === "request" ? (
        <>
          <button
            className="blue_btn"
            onClick={() => confirmHandler(userr._id)}
          >
            Confirm
          </button>
          <button className="gray_btn" onClick={() => deleteHandler(userr._id)}>
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Card;
