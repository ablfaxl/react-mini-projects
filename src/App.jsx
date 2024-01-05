import { useEffect, useState } from 'react';
import './App.css';
import CharacterDetail from './components/CharacterDetail';
import CharacterList from './components/CharacterList';
import Navbar, { Favorite, Search, SearchResult } from './components/Navbar';
import Loading from './components/Loading';
import { Toaster } from 'react-hot-toast';

import useCharacters from './hooks/useCharcters';

export function App() {
  const [query, setQuery] = useState('');
  const { characters, isLoading } = useCharacters(
    'https://rickandmortyapi.com/api/character?name',
    query
  );
  const [selectedId, setSelectedId] = useState(null);
  // const [favorite, setFavorite] = useState(
  //   () => JSON.parse(localStorage.getItem('FAVORITE')) || []
  // );

  // useEffect(() => {
  //   localStorage.setItem('FAVORITE', JSON.stringify(favorite));
  // }, [favorite]);

  const handleSelectCharacter = (id) => {
    setSelectedId(id);
  };
  const handleAddFavorite = (char) => {
    setFavorite((prevFav) => [...prevFav, char]);
  };
  const handleDeleteFavorite = (id) => {
    setFavorite((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isAddedToFavorite = favorite.some((char) => char.id === selectedId);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters?.length} />
        <Favorite favorite={favorite} onDeleteFavorite={handleDeleteFavorite} />
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
