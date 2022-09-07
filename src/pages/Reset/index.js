import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../components/Inputs/LoginInputs";
import CodeVerification from "./CodeVerification";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import Footer from "../../components/Login/Footer";
import "./styles.css";
import ChangePassword from "./ChangePassword";

function Reset() {
  const { user } = useSelector((state) => ({ ...state }));

  const [visible, setVisible] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [userInfo, setUserInfo] = useState("");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    Cookies.set("user", "");
    navigate("/login");
  };

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile" className="right_reset">
              <img src={user?.picture} alt="" />
            </Link>
            <button className="blue_btn" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>

      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            loading={loading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfo && (
          <SendEmail
            userInfo={userInfo}
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            loading={loading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            code={code}
            setCode={setCode}
            userInfo={userInfo}
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            loading={loading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            code={code}
            setCode={setCode}
            userInfo={userInfo}
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setLoading={setLoading}
            loading={loading}
            setUserInfo={setUserInfo}
            setVisible={setVisible}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Reset;
