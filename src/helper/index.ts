export const getLocalStorageData = (key: string) =>
  typeof window !== "undefined" ? localStorage.getItem(key) : null;

export const baseURL = "http://localhost:5000";
