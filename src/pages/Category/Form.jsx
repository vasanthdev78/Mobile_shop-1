import React, { useEffect, useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeCud, postEmployeeCud, patchEmployeeCud } from "@api/urls";
import { useAppContext } from "@context/AppContext";

const userFormSchema = Yup.object().shape({
  identity: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Full Name should contain only letters and spaces"
    )
    .required("Full Name is required"),

  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
    .required("Phone Number is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .nullable(),
});

function index() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(uuid);
  const [formMeta, setFormMeta] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identity: "",
    phone_number: "",
    password: "",
    employee_id: "",
  });

  const { setBreadcrumbs } = useAppContext();
  useEffect(() => {
    setBreadcrumbs({
      activeID: 2,
    });
  }, [setBreadcrumbs]);

  const formatData = (data) => {
    const mappedData = {
      identity: data.initial.identity || "",
      phone_number: data.initial.phone_number || "",
      password: data.initial.password || "",
      employee_id: data.initial.employee_id || "",
    };
    setFormData(mappedData);
  };

  useEffect(() => {
    const FetchData = async () => {
      const response = await userTableMeta();
      setFormMeta(response.filter_data);
      console.log("Table Meta : ", response);
    };
    FetchData();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      if (uuid) {
        setLoader(true);
        const response = await getEmployeeCud(uuid);
        setUserData(response);
        formatData(response);
        setLoader(false);
      }
    };
    FetchData();
  }, [uuid]);
  const handleBackClick = () => {
    navigate("/employee/list");
  };
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {!formData && loader ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="row">
            <div className="col-12">
              <h5>{uuid ? "Edit Employee" : "Add Employee"}</h5>
            </div>
            <div className="col-md-12">
              <div className="card mb-6" style={{ padding: "20px 40px" }}>
                <svg
                  onClick={handleBackClick}
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-square-rounded-arrow-left-filled"
                  width="28"
                  height="28"
                  color="#556df5"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017c-.21 .003 -.424 -.005 -.642 -.005l-.642 .005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm.707 5.293a1 1 0 0 0 -1.414 0l-4 4a1.037 1.037 0 0 0 -.2 .284l-.022 .052a.95 .95 0 0 0 -.06 .222l-.008 .067l-.002 .063v-.035v.073a1.034 1.034 0 0 0 .07 .352l.023 .052l.03 .061l.022 .037a1.2 1.2 0 0 0 .05 .074l.024 .03l.073 .082l4 4l.094 .083a1 1 0 0 0 1.32 -.083l.083 -.094a1 1 0 0 0 -.083 -1.32l-2.292 -2.293h5.585l.117 -.007a1 1 0 0 0 -.117 -1.993h-5.585l2.292 -2.293l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                    fill="currentColor"
                    strokeWidth="0"
                  />
                </svg>
                <Formik
                  initialValues={{ ...formData }}
                  validationSchema={userFormSchema}
                  enableReinitialize
                  onSubmit={async (values, { resetForm }) => {
                    setLoading(true);
                    console.log("Form values:", values);
                    if (uuid) {
                      await patchEmployeeCud(uuid, values);
                    } else {
                      await postEmployeeCud(values);
                    }
                    // resetForm();
                    handleBackClick();
                    setLoading(false);
                  }}
                >
                  {({ values }) => (
                    <Form id="formAccountSettings">
                      <div className="card-body">
                        <div className="row pt-4">
                          <div className="mb-4 col-md-6">
                            <label htmlFor="field" className="form-label">
                              Employee ID
                            </label>
                            <Field
                              className="form-control"
                              name="field"
                              id="field"
                            />
                            <ErrorMessage
                              name="field"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="mb-4 col-md-6">
                            <label htmlFor="identity" className="form-label">
                              Full Name
                            </label>
                            <Field
                              className="form-control"
                              name="identity"
                              id="identity"
                            />
                            <ErrorMessage
                              name="identity"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="mb-4 col-md-6">
                            <label
                              htmlFor="phone_number"
                              className="form-label"
                            >
                              Phone Number
                            </label>
                            <Field
                              className="form-control"
                              name="phone_number"
                              id="phone_number"
                            />
                            <ErrorMessage
                              name="phone_number"
                              component="div"
                              className="text-danger"
                            />
                          </div>

                          <div className="mb-4 col-md-6">
                            <label htmlFor="field" className="form-label">
                              Password
                            </label>
                            <Field
                              className="form-control"
                              name="field"
                              id="field"
                            />
                            <ErrorMessage
                              name="field"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <button
                              type="submit"
                              disabled={loading}
                              className="btn btn-primary"
                            >
                              {uuid ? (
                                <>{loading ? "Updating..." : "Update User"}</>
                              ) : (
                                <>{loading ? "Adding..." : "Add User"}</>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default index;
