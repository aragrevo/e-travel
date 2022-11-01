import { useState } from "react";
import { LocalStorageType } from "@model/local-storage-types";

export function useLocalStorage<T>(
  key: LocalStorageType,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    const item = window.localStorage.getItem(key);
    const obj = item ? JSON.parse(item) : initialValue;
    return obj;
  });

  const setValue = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };
  return [storedValue, setValue];
}
