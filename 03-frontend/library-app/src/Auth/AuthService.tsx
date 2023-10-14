export const isUserAuthenticated = async () => {
  const authTokenJson = localStorage.getItem("authToken");

  if (authTokenJson == null) {
    return false;
  } else {
    const tokenModel = JSON.parse(authTokenJson || "");
    var result = isTokenExpiredSum(tokenModel.expirationToken);
    return !result;
  }
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
