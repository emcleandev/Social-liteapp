import React, { useState } from "react";
import * as Yup from "yup";
import LoginInput from "../../components/Inputs/LoginInputs";
import { Form, Formik } from "formik";
import "../../pages/Login/styles.css";
import { Link } from "react-router-dom";
import DotLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const loginInfo = {
  email: "",
  password: "",
};

function LoginForm({ setVisible }) {
  const [login, setLogin] = useState(loginInfo);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = login;

  console.log(`login`, login);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email address")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );

      setError("");
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: data });
        Cookies.set("user", JSON.stringify(data));
        navigate("/");
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span className="login_1_span">
          EMs Facebook clone helps you connect and share with the people in your
          life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            validationSchema={loginValidation}
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or Phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  {loading ? (
                    <DotLoader color="#fff" loading={loading} size={30} />
                  ) : (
                    "Log in"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/reset" className="forgot_password ">
            Forgotten Password?
          </Link>

          {error && <div className="error_text">{error}</div>}

          <div className="divider"></div>

          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>

        <Link to="/" className="sign_extra">
          <b>Create a page </b>
          for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
