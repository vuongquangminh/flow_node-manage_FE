type TLocalStorage = {
  key: string;
  value?: unknown;
};

export const getLocalStorage = ({ key }: TLocalStorage) => {
  const value = JSON.parse(localStorage.getItem(key) || "{}");
  return value;
};

export const setLocalStorage = ({ key, value }: TLocalStorage) => {
  localStorage.setItem(key, JSON.stringify(value));
};
