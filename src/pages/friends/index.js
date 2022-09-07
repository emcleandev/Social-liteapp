import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { friendsReducer } from "../../functions/reducers";
import { getFriendsPageInfo } from "../../functions/user";
import Card from "./Card";

import "./styles.css";

function Friends({ setCreatePostVisible, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();

  const [{ loading, error, data }, dispatch] = useReducer(friendsReducer, {
    loading: false,
    data: {},
    error: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch({ type: "FRIENDS_REQUEST" });
    const data = await getFriendsPageInfo(user.token);

    if (data.status === "ok") {
      dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "FRIENDS_ERROR", payload: data.data });
    }
  };

  return (
    <div>
      <Header page="friends" getAllPosts={getAllPosts} />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h2>Friends</h2>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="friends_left_wrap">
            <Link
              to={`/friends`}
              className={`menu_item hover1 ${
                type === undefined && "active_friends"
              }`}
            >
              <div className="small_circle">
                <i className="friends_home_icon"></i>
              </div>
              <span>Home</span>
              <div className="rightArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to={`/friends/requests`}
              className={`menu_item hover1 ${
                type === "requests" && "active_friends hover1"
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friends Requests</span>
              <div className="rightArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to={`/friends/sent`}
              className={`menu_item hover1 ${
                type === "sent" && "active_friends hover1"
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent Requests</span>
              <div className="rightArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <div className="menu_item hover1">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rightArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <Link
              to={`/friends/all`}
              className={`menu_item hover1 ${
                type === "all" && "active_friends hover1"
              }`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All Friends</span>
              <div className="rightArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <div className="menu_item hover1">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rightArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="menu_item hover1">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Custom List</span>
              <div className="rightArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="friends_right">
          {(type === undefined || type === "requests") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h2>Friends Requests</h2>
                {type === undefined && (
                  <Link to="/friends/requests" className="see_link hover2">
                    See all
                  </Link>
                )}
              </div>

              <div className="flex_wrap">
                {data.requests &&
                  data.requests.map((user, i) => (
                    <Card
                      userr={user}
                      key={i}
                      type="request"
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}

          {(type === undefined || type === "sent") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h2>Sent Requests</h2>
                {type === undefined && (
                  <Link to="/friends/sent" className="see_link hover2">
                    See all
                  </Link>
                )}
              </div>

              <div className="flex_wrap">
                {data.sentRequest &&
                  data.sentRequest.map((user, i) => (
                    <Card userr={user} key={i} type="sent" getData={getData} />
                  ))}
              </div>
            </div>
          )}

          {(type === undefined || type === "all") && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h2>Friends</h2>
                {type === undefined && (
                  <Link to="/friends/all" className="see_link hover2">
                    See all
                  </Link>
                )}
              </div>

              <div className="flex_wrap">
                {data.friends &&
                  data.friends.map((user, i) => (
                    <Card
                      userr={user}
                      key={i}
                      type="friends"
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Friends;
