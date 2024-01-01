import { useEffect, useState } from 'react';
import './App.css';
import { allCharacters } from './data/data';
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

  useEffect(() => {
    async function fetchAllCharacters() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          'https://rickandmortyapi.com/api/character'
        );
        setCharacters(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log('error', error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllCharacters();
  }, []);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search />
        <SearchResult numOfResult={characters?.length} />
      </Navbar>
      <div className="main">
        {isLoading ? <Loading /> : <CharacterList characters={characters} />}
        <CharacterDetail />
      </div>
    </div>
  );
}
