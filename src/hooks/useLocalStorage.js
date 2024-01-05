import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem('FAVORITE')) || []
  );

  useEffect(() => {
    localStorage.setItem('FAVORITE', JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
