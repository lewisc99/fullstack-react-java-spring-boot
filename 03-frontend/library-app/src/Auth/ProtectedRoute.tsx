import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    debugger;
    const authTokenJson = localStorage.getItem("authToken");
    if (authTokenJson == null) {
      setAuthToken("");
      setLoading(false); // Set loading to false after fetching the token
    } else {
      const tokenModel = JSON.parse(authTokenJson || "");
      var isTokenExpired = isTokenExpiredSum(tokenModel.expirationToken)!;
      if (isTokenExpired) {
        setAuthToken("");
        setLoading(false); // Set loading to false after fetching the token
      } else {
        setAuthToken(tokenModel.token);
        setLoading(false); // Set loading to false after fetching the token
      }
    }
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function isTokenExpiredSum(expirationTime: number): boolean {
  const currentTime = Date.now(); // Get the current timestamp in milliseconds

  // Compare the current time to the token's expiration time
  if (currentTime >= expirationTime) {
    // Token has expired
    return true;
  }

  // Token is not expired
  return false;
}

export default ProtectedRoute;
