import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import LoginInput from "../../components/Inputs/LoginInputs";

function SearchAccount({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  loading,
  setUserInfo,
  setVisible,
}) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email"),
  });

  const handleSearch = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );

      setUserInfo(data);

      setTimeout(() => {
        setVisible(1);

        setError("");

        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className={`reset_form`}>
      <div className="reset_form_header">Find Your Account</div>

      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ email }}
        validationSchema={validateEmail}
        onSubmit={() => handleSearch()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or phone number"
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
                  "Search"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SearchAccount;
