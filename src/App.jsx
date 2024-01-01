import { useEffect, useState } from 'react';
import './App.css';
import { allCharacters } from './data/data';
import CharacterDetail from './components/CharacterDetail';
import CharacterList from './components/CharacterList';
import Navbar, { SearchResult } from './components/Navbar';
import Loading from './components/Loading';
import { Toaster } from 'react-hot-toast';

export function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAllCharacters() {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://rickandmortyapi.com/api/characters'
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setCharacters(data.results);
        setIsLoading(false);
      } catch (error) {
        console.log('error', error.message);
        setIsLoading(false);
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
        <SearchResult numOfResult={characters?.length} />
      </Navbar>
      <div className="main">
        {isLoading ? <Loading /> : <CharacterList characters={characters} />}
        <CharacterDetail />
      </div>
    </div>
  );
}
