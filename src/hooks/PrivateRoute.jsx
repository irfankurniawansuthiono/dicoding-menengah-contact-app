import { getAccessToken } from "../api/api";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ components }) {
  const token = getAccessToken();
  return token ? components : <Navigate to={"/login"} />;
}
