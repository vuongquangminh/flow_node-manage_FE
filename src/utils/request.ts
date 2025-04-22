import { setLocalStorage } from "../hooks/localStorage";

const request = async ({
  path,
  payload,
  method,
}: {
  path: string;
  payload?: object;
  method?: string;
}) => {
  const url = `${import.meta.env.VITE_API_URL}${path}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    setLocalStorage({ key: "token", value: json.token });
    return { ...json, status: response.ok };
  } catch (error) {
    console.log(error);
  }
};

export default request;
