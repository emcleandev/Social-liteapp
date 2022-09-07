import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function DisplayAccessibility({ setVisible }) {
  const { darkTheme } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div className="circle hover1" onClick={() => setVisible(0)}>
          <i className="arrow_back_icon"></i>
        </div>
        Display & Accessibility
      </div>
      <div className="mmenu_main hover1">
        <div className="small_circle" style={{ width: "60px" }}>
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenu_col">
          <div className="mmenu_span1">Dark Mode</div>
          <div className="mmenu_span2">
            Adjust the appearance of Facebook to reduce glare and give your eyes
            a break
          </div>
        </div>
      </div>
      <label
        htmlFor="darkOff"
        className="hover1"
        onClick={() => {
          Cookies.set("darkTheme", false);
          dispatch({ type: "LIGHT" });
        }}
      >
        <span>Off</span>
        {darkTheme ? (
          <input type="radio" name="dark" id="darkOff" />
        ) : (
          <input type="radio" name="dark" id="darkOff" checked />
        )}
      </label>
      <label
        htmlFor="darkOn"
        className="hover1"
        onClick={() => {
          Cookies.set("darkTheme", true);
          dispatch({ type: "DARK" });
        }}
      >
        <span>On</span>
        {darkTheme ? (
          <input type="radio" name="dark" id="darkOn" checked />
        ) : (
          <input type="radio" name="dark" id="darkOn" />
        )}
      </label>

      <div className="mmenu_main hover1">
        <div className="small_circle" style={{ width: "60px" }}>
          <i className="compact_icon"></i>
        </div>
        <div className="mmenu_col">
          <div className="mmenu_span1">Compact Mode</div>
          <div className="mmenu_span2">
            Make your font size smaller so more content can fit on the screen.
          </div>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="compact" id="compactOff" />
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compactOn" />
      </label>

      <div className="mmenu_item hover1">
        <div className="small_circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>Keyboard</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
}

export default DisplayAccessibility;
