import { useEffect, useState } from 'react';
import './App.css';
import { allCharacters } from './data/data';
import CharacterDetail from './components/CharacterDetail';
import CharacterList from './components/CharacterList';
import Navbar, { SearchResult } from './components/Navbar';

export function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character').then((res) =>
      res.json().then((data) => {
        setCharacters(data.results);
      })
    );
  }, []);

  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <div className="main">
        <CharacterList characters={characters} />
        <CharacterDetail />
      </div>
    </div>
  );
}
