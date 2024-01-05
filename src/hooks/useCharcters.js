import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function useCharacters(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchAllCharacters() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );

        setCharacters(data.results.slice(0, 6));
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel()) {
          console.log('Canceld Succeccfully');
        } else {
          console.log('error', error.message);
          toast.error(error.response?.data?.error || 'Something went wrong');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllCharacters();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { isLoading, characters };
}
