import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // Import a React Icon spinner
import config from "../config";
const RefreshLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        navigate("/login"); // Redirect to login if tokens are missing
        return;
      }

      try {
        let newToken = accessToken;

        // Validate the access token with the backend
        const validateResponse = await fetch(
          `${config.API_URL}/api/auth/validate/token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!validateResponse.ok) {
          // If token is invalid, attempt to refresh it
          const refreshResponse = await fetch(
            `${config.API_URL}/api/auth/refresh/token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refreshToken }),
            }
          );

          if (!refreshResponse.ok) {
            throw new Error("Failed to refresh token");
          }

          const data = await refreshResponse.json();
          newToken = data.accessToken;
          localStorage.setItem("token", newToken); // Update the access token
          const { role } = JSON.parse(atob(newToken.split(".")[1])); // Decode JWT payload

          // Navigate to the correct dashboard based on the role
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else if (role === "teamleader") {
            navigate("/teamleader/dashboard");
          } else if (role === "teammember") {
            navigate("/teammember/dashboard");
          } else if (role === "manager") {
            navigate("/manager/dashboard");
          } else {
            throw new Error("Invalid role");
          }
        }

        // Decode the token to get the role
      } catch (error) {
        console.error("Error validating token or determining role:", error);
        localStorage.removeItem("token"); // Remove invalid tokens
        localStorage.removeItem("refreshToken");
        navigate("/login"); // Redirect to login if validation or refresh fails
        return;
      } finally {
        setIsLoading(false);
      }
    };

    checkTokenValidity();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    ); // Modern spinner using React Icons (FaSpinner)
  }

  return (
    <>
      <Outlet />
    </>
  ); // Render the children components when verification is complete
};

export default RefreshLayout;
