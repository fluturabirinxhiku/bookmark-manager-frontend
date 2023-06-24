import { signUp } from "../services/authService";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateSignUp } from "../validation/validator";

const SignUpForm = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign Up
              </h5>
              <Formik
                initialValues={{
                  name: "",
                  username: "",
                  password: "",
                  passwordConfirmation: "",
                }}
                validateOnChange={false}
                validationSchema={validateSignUp}
                onSubmit={(user, { setSubmitting }) => {
                  setSubmitting(false);
                  signUp(user);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-floating mb-3">
                      <Field
                        id="floatingName"
                        type="text"
                        name="name"
                        className="form-control"
                      />
                      <label htmlFor="floatingName">Name</label>
                      <ErrorMessage
                        className="text-danger small"
                        name="name"
                        component="div"
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        id="floatingUsername"
                        type="text"
                        name="username"
                        className="form-control"
                      />
                      <label htmlFor="floatingUsername">Username</label>
                      <ErrorMessage
                        className="text-danger small"
                        name="username"
                        component="div"
                      />
                    </div>

                    <div className="form-floating mb-3">
                      <Field
                        id="floatingPassword"
                        type="password"
                        name="password"
                        className="form-control"
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      <ErrorMessage
                        className="text-danger small"
                        name="password"
                        component="div"
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        id="floatingPassword2"
                        type="password"
                        name="passwordConfirmation"
                        className="form-control"
                      />
                      <label htmlFor="floatingPassword2">
                        Password Confirmation
                      </label>
                      <ErrorMessage
                        className="text-danger small"
                        name="passwordConfirmation"
                        component="div"
                      />
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-login text-uppercase fw-bold"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="text-center mt-4">
                      <p className="mb-0">Already have an account?</p>
                      <Link to="/signin" className="text-decoration-none">
                        Sign in here
                      </Link>
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
};

export default SignUpForm;
