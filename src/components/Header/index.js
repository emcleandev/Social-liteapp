import React, { useRef, useState } from "react";
import {
  ArrowDown,
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.css";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./UserMenu/UserMenu";

function Header({ page, getAllPosts }) {
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const color = "#65676b";
  const { user } = useSelector((user) => ({ ...user }));

  const allMenu = useRef(null);

  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });

  const userMenu = useRef(null);
  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      {/* LEFT SIDE */}

      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>

        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>

      {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} />}

      {/* LEFT SIDE */}

      {/* MIDDLE SECTION */}

      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          onClick={() => getAllPosts()}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}
        >
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>

      {/* MIDDLE SECTION */}

      {/* RIGHT SIDE */}

      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="user" />
          <span>{user?.first_name}</span>
        </Link>

        <div
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          ref={allMenu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <Menu />
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={userMenu}
        >
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>

      {/* RIGHT SIDE */}
    </header>
  );
}

export default Header;
