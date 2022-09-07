import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../components/Inputs/LoginInputs";
import * as Yup from "yup";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function ChangePassword({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  code,
  setCode,
  userInfo,
  email,
  setEmail,
  error,
  setError,
  setLoading,
  loading,
  setUserInfo,
  setVisible,
}) {
  const validatePassword = Yup.object({
    password: Yup.string()
      .required("Enter at least six characters")
      .min(6, "Enter at least six characters"),
    confirmPassword: Yup.string()
      .required("Enter at least six characters")
      .min(6, "Enter at least six characters")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const navigate = useNavigate();

  const changePassword = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email,
        password,
      });

      setTimeout(() => {
        setError("");
        navigate("/");
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form" style={{ height: "330px" }}>
      <div className="reset_form_header">Change Password</div>

      <div className="reset_form_text">Please enter your new password.</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirmPassword }}
        validationSchema={validatePassword}
        onSubmit={() => {
          changePassword();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <LoginInput
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                {loading ? (
                  <ClipLoader color="#fff" size={20} loading={loading} />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword;
