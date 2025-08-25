import { Navigate } from "react-router-dom";
import paths from "./paths";

function hasToken() {
  return !!(sessionStorage.getItem("token") || localStorage.getItem("token"));
}

export default function PublicRoute({ children }: { children: JSX.Element }) {
  if (hasToken()) return <Navigate to={paths.home} replace />;
  return children;
}
