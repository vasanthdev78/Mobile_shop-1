import { useState } from "react";
import APP_CONSTANTS from "@config/AppConstants";
import { useNavigate } from "react-router-dom";
import { login } from "@api/urls";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css";

const validationSchema = Yup.object({
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
    .required("Phone Number is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export default function Login() {
  const [passView, setPassView] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    phone_number: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    console.log("values", values);
    try {
      const response = await login(values);
      console.log("response", response);
      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      navigate("/dashboard");
      // setSubmitting(false);
    } catch (err) {
      setStatus({
        errorMsg:
          err.response?.data?.data?.detail ||
          "An unexpected error occurred. Please try again.",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner py-6">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center mb-6">
                <a href="javascript:void(0);" className="app-brand-link">
                  <span className="app-brand-text demo text-heading fw-bold">
                    <img
                      src={APP_CONSTANTS.App_Logo}
                      width={175}
                      alt="App Logo"
                    />
                  </span>
                </a>
              </div>
              <h4 className="mb-1">Welcome to {APP_CONSTANTS.App_Name} 👋</h4>
              <p className="mb-6">
                Please sign in to your account and start the adventure.
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, status }) => (
                  <Form id="formAuthentication" className="mb-4">
                    {status && status.errorMsg && (
                      <div className="alert alert-danger">
                        {status.errorMsg}
                      </div>
                    )}
                    <div className="mb-6">
                      <label>Phone:</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="phone_number"
                        placeholder="Enter your phone"
                      />
                      <ErrorMessage
                        name="phone_number"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-6 form-password-toggle">
                      <label>Password:</label>
                      <div className="input-group input-group-merge">
                        <Field
                          type={`${passView ? "text" : "password"}`}
                          id="password"
                          className="form-control"
                          name="password"
                          placeholder="············"
                        />
                        <span
                          className="input-group-text cursor-pointer"
                          onClick={() => setPassView(!passView)}
                        >
                          <i
                            className={`ti ${
                              passView ? "ti-eye" : "ti-eye-off"
                            }`}
                          />
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-6">
                      <button
                        className="btn btn-primary d-grid w-100"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
