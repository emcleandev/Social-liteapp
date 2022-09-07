import React from "react";

function Shortcut({ link, name, img }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="shortcut_item hover1">
      <img src={img} alt="" />
      <span>{name}</span>
    </a>
  );
}

export default Shortcut;
