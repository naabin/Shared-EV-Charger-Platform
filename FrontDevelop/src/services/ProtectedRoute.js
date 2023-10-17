import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
