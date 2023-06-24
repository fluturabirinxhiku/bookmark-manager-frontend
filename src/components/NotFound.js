import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container d-flex flex-column vh-100 justify-content-center align-items-center">
      <h1 className="display-1">404</h1>
      <h2 className="display-4">Page Not Found</h2>
      <p className="lead">The requested page could not be found.</p>
      <Link to="/" className="btn btn-primary">
        Go back to Home page
      </Link>
    </div>
  );
};
export default NotFound;
