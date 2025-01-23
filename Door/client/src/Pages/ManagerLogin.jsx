import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ManagerLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    // if (token) {
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("role", "manager");
    // }
    navigate("/login");
  }, [searchParams, navigate]);

  return <div>Processing login...</div>;
};

export default ManagerLogin;
