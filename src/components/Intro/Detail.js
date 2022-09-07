import React, { useState } from "react";
import Bio from "./Bio";

function Detail({
  rel,
  value,
  img,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      
      <div className="add_details_flex" onClick={() => setShow(true)}>
        {value ? (
          <div className="info_profile">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            Add {text}
          </>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setShow={setShow}
          rel={rel}
        />
      )}
    </div>
  );
}

export default Detail;
