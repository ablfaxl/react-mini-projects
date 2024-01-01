import { useEffect, useState } from 'react';
import './App.css';
import { allCharacters } from './data/data';
import CharacterDetail from './components/CharacterDetail';
import CharacterList from './components/CharacterList';
import Navbar, { SearchResult } from './components/Navbar';
import Loading from './components/Loading';

export function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAllCharacters() {
      setIsLoading(true);
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setCharacters(data.results);
      setIsLoading(false);
    }
    fetchAllCharacters();
  }, []);

  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <div className="main">
        {isLoading ? <Loading /> : <CharacterList characters={characters} />}
        <CharacterDetail />
      </div>
    </div>
  );
}