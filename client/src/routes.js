import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import Error404 from "./pages/error404";
import User from "./pages/dashboard/User";
import Admin from "./pages/dashboard/Admin";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/user"
        element={<PrivateRoute element={User} roles={["user", "admin"]} />}
      />
      <Route
        path="/admin"
        element={<PrivateRoute element={Admin} roles={["admin"]} />}
      />
      <Route path="/404" element={<Error404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default Router;
