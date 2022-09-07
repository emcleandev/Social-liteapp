import React from "react";
import { useSelector } from "react-redux";

function Contact() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="contact hover1">
      <div className="contact_img">
        <img src={user?.picture} alt="" />
      </div>
      <span>
          {user?.first_name} {" "} {user?.last_name}
      </span>
    </div>
  );
}

export default Contact;
