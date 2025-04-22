type TLocalStorage = {
  key: string;
  value?: unknown;
};

export const getLocalStorage = ({ key }: TLocalStorage) => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch (e) {
    console.error("Lỗi parse JSON:", e);
    return null;
  }
};

export const setLocalStorage = ({ key, value }: TLocalStorage) => {
  localStorage.setItem(key, JSON.stringify(value));
};
