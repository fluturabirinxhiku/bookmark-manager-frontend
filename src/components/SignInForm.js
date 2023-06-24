import { ErrorMessage, Field, Form, Formik } from "formik";
import { validateSignIn } from "../validation/validator";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const SignInForm = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign In
              </h5>
              <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validateSignIn}
                onSubmit={(user, { setSubmitting }) => {
                  setSubmitting(false);
                  login(user)
                    .then(() => {
                      navigate("/");
                    })
                    .catch((error) => console.error(error));
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-floating mb-3">
                      <Field
                        id="floatingInput"
                        type="text"
                        name="username"
                        className="form-control"
                      />
                      <label htmlFor="floatingInput">Username</label>
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
                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-login text-uppercase fw-bold"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="text-center mt-4">
                      <p className="mb-0">Don't have an account?</p>
                      <Link to="/signup" className="text-decoration-none">
                        Sign up here
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

export default SignInForm;
