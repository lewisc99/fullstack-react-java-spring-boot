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

  if (currentTime >= expirationTime) {
    return true;
  }
  return false;
}
