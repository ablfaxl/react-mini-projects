import { useEffect, useState } from 'react';
import './App.css';
import CharacterDetail from './components/CharacterDetail';
import CharacterList from './components/CharacterList';
import Navbar, { Favorite, Search, SearchResult } from './components/Navbar';
import Loading from './components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [favorite, setFavorite] = useState([]);

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

  const handleSelectCharacter = (id) => {
    setSelectedId(id);
  };
  const handleAddFavorite = (char) => {
    setFavorite((prevFav) => [...prevFav, char]);
  };
  const isAddedToFavorite = favorite.some((char) => char.id === selectedId);
  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters?.length} />
        <Favorite favorite={favorite} />
      </Navbar>
      <div className="main">
        {isLoading ? (
          <Loading />
        ) : (
          <CharacterList
            selectedId={selectedId}
            characters={characters}
            onSelectCharacter={handleSelectCharacter}
          />
        )}
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={handleAddFavorite}
          isAddedToFavorite={isAddedToFavorite}
        />
      </div>
    </div>
  );
}
