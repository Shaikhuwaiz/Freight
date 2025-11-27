import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  console.log("Token check:", token);

  if (!token) {
    console.warn("Token missing – redirecting to login");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
