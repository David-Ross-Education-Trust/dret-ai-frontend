import { useState, useEffect, useCallback } from "react";

const readArray = (key) => {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function useFavourites(key = "analyticsFavourites", { syncAcrossTabs = true } = {}) {
  const [favourites, setFavourites] = useState(() => readArray(key));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(favourites));
    } catch {}
  }, [favourites, key]);

  useEffect(() => {
    if (!syncAcrossTabs) return;
    const onStorage = (e) => {
      if (e.key === key) setFavourites(readArray(key));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, syncAcrossTabs]);

  const toggleFavourite = useCallback((id) => {
    setFavourites((prev) => {
      const set = new Set(prev);
      set.has(id) ? set.delete(id) : set.add(id);
      return Array.from(set);
    });
  }, []);

  return [favourites, toggleFavourite];
}
