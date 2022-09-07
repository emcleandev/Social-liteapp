import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/Inputs/LoginInputs";
import ClipLoader from "react-spinners/ClipLoader";

function CodeVerification({
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
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min("5", "Code must be 5 characters")
      .max("5", "Code must be 5 characters"),
  });

  console.log(`loading222`, loading);



  const verifyCode = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        { email, code }
      );
      setTimeout(() => {
        setError("");
        setVisible(3);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>

      <div className="reset_form_text">
        Please enter code that has been sent to your email
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
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

export default CodeVerification;
