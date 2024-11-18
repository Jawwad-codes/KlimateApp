import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialvalue: T) {
  const [storedValue, setStoreValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialvalue;
    } catch (e) {
      console.log(e);
      return initialvalue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (e) {
      console.log(e);
    }
  }, [key, storedValue]);
  return [storedValue, setStoreValue] as const;
}
