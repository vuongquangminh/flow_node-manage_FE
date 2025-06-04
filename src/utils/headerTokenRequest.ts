const headerTokenRequest = (headers: Headers) => {
  const token = localStorage.getItem("token");

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};

export default headerTokenRequest;
