import { Link, NavLink, useHistory } from "react-router-dom";
import { fetchWithAuth } from "../../Auth/fetchWithAuth";
import { useEffect, useState } from "react";
import { isUserAuthenticated } from "../../Auth/AuthService";

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory(); // Initialize the history object


  useEffect(() => {
    isUserAuthenticated().then((result) => setIsAuthenticated(result));
  }, [isAuthenticated]);

  const handleLogout = async () => {
    const baseUrl: string = `http://localhost:8080/api/logout`;
    const response = await fetchWithAuth(baseUrl);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    history.push("/login"); // Redirect the user to the "/login" URL
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">Luv 2 Read</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search Books
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <li className="nav-item m-1">
                <button
                  className="btn btn-outline-light"
                  onClick={() => handleLogout()}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item m-1">
                <Link
                  type="button"
                  className="btn btn-outline-light"
                  to="/login"
                  key="0">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
