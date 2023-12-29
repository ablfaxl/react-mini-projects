import { useState } from 'react';
import './App.css';
import { allCharacters } from './data/data';
import CharacterDetail from './components/CharacterDetail';
import CharacterList from './components/CharacterList';
import Navbar, { SearchResult } from './components/Navbar';

export function App() {
  const [characters, setCharacters] = useState(allCharacters);

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
