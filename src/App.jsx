import { useEffect, useState } from 'react';
import './App.css';
import CharacterDetail from './components/CharacterDetail';
import CharacterList from './components/CharacterList';
import Navbar, { Search, SearchResult } from './components/Navbar';
import Loading from './components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function fetchAllCharacters() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );

        setCharacters(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log('error', error.message);
        toast.error(error.response?.data?.error || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length > 3) {
      setCharacters([]);
      return;
    }

    fetchAllCharacters();
  }, [query]);

  const handleSelectCharacter = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters?.length} />
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
        <CharacterDetail selectedId={selectedId} />
      </div>
    </div>
  );
}
