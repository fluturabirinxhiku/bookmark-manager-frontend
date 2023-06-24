import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/signin");
    }
  });
  return isAuthenticated() ? children : "";
};
export default ProtectedRoute;
