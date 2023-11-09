export const fetchWithAuth = async (
  url: string,
  options: any = {}
): Promise<Response> => {
  const authTokenJson = localStorage.getItem("authToken");
  let tokenModel: any;
  if (authTokenJson != null) {
    tokenModel = JSON.parse(authTokenJson || "");
  } else {
    tokenModel = "";
  }

  if (tokenModel) {
    if (!options.headers) {
      options.headers = {};
    }

    // Set Authorization header in the headers object
    options.headers["Authorization"] = `Bearer ${tokenModel.token}`;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    // Handle any error responses here (e.g., token expiration)
    throw new Error("Network response was not ok");
  }

  return response;
};
