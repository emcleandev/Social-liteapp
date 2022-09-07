import React, { useState } from "react";
import LeftLink from "./LeftLink";
import "./styles.css";

import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import Shortcut from "./Shortcut";
import { useMediaQuery } from "react-responsive";

function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);

  const query1030px = useMediaQuery({
    query: "(max-width: 1175px)",
  });

const margin_left = query1030px ? '0px' : '12px'

  return (
    <div className="left_home">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          notification={link.notification}
          text={link.text}
        />
      ))}

      {!visible && (
        <div
          className="left_link hover1"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span style={{ marginLeft: "12px" }}>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              notification={link.notification}
              text={link.text}
            />
          ))}
          <div
            className="left_link hover1"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate180">
              <ArrowDown1 />
            </div>
            <span style={{ marginLeft: "12px" }}>See less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>

      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut
          link="https://www.youtube.com/watch?v=Jnca3CroYbE&ab_channel=Dev7"
          img="../../images/ytb.png"
          name="Youtube"
        />
        <Shortcut
          link="https://github.com/Britishexchangestudent"
          img="../../images/insta.png"
          name="Instagram"
        />
      </div>

            <div className={`fb_copyright ${visible && 'relative_fb_copyright'}`}>
                <Link to="/">Privacy </Link><span>. </span>
                <Link to="/">Terms </Link><span>. </span>
                <Link to="/">Advertising </Link><span>. </span>
                <Link to="/">Ad Choices </Link><span>. </span>
                <Link to="/">Cookies </Link><span>. </span>
                <Link to="/">More </Link><span>. </span>
            </div>

    </div>
  );
}

export default LeftHome;
