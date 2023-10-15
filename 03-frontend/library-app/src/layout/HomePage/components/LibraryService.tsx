import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isUserAuthenticated } from "../../../Auth/AuthService";

export const LibraryServices = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    isUserAuthenticated().then((result) => setIsAuthenticated(result));
  }, [isAuthenticated]);

  return (
    <div className="container my-5">
      <div className="row p-4 align-items-center border shadow-lg">
        <div className="col-lg-7 p-3">
          <h1 className="display-4 fw-bold">
            Can't find what you are looking for?
          </h1>
          <p className="lead">
            If you cannot find what you are looking for, send our library
            admin's a personal message!
          </p>
          <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
            {isAuthenticated ? (
              <Link
                type="button"
                className="btn main-color btn-lg px-4 me-md-2 fw-bold  text-white"
                to="#"
                key="0">
                Library Services
              </Link>
            ) : (
              <Link
                type="button"
                className="btn main-color btn-lg text-white"
                to="/login"
                key="0">
                Sign in
              </Link>
            )}
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
      </div>
    </div>
  );
};
