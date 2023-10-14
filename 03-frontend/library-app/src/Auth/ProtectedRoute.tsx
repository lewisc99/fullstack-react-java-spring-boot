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
    const authTokenJson = localStorage.getItem("authToken");
    if (authTokenJson == null) {
      setAuthToken("");
      setLoading(false); // Set loading to false after fetching the token
    } else {
      const tokenModel = JSON.parse(authTokenJson || "");
      setAuthToken(tokenModel.token);
      setLoading(false); // Set loading to false after fetching the token
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

export default ProtectedRoute;
