import { getLocalStorage } from "../hooks/localStorage";

const headerTokenRequest = (headers: Headers) => {
  const token = getLocalStorage({ key: "token" });

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};

export default headerTokenRequest;
