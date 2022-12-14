import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Login/Footer";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Login/RegisterForm";

import "./styles.css";

function Login() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />

        {visible && <RegisterForm setVisible={setVisible} />}

        <Footer />
      </div>
    </div>
  );
}

export default Login;
