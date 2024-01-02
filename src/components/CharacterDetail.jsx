import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from './Loading';

const CharacterDetail = ({ selectedId, onAddFavorite, isAddedToFavorite }) => {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function getCharaterDetail() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        const episodesId = data.episode?.map((e) => e.split('/').at(-1));

        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat().slice(0, 5));
        setCharacter(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) {
      getCharaterDetail();
    }
  }, [selectedId]);

  if (isLoading) {
    return (
      <div style={{ color: 'var(--slate-300)', flex: 1 }}>
        <Loading />
      </div>
    );
  }

  if (!character) {
    return (
      <div style={{ color: 'var(--slate-300)', flex: 1 }}>
        please select character
      </div>
    );
  }

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        character={character}
        isAddedToFavorite={isAddedToFavorite}
        onAddFavorite={onAddFavorite}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
};

export default CharacterDetail;

function CharacterSubInfo({ character, isAddedToFavorite, onAddFavorite }) {
  return (
    <div className="character-detail">
      <img
        className="character-detail__img"
        src={character.image}
        alt={character.name}
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === 'Male' ? '👱‍♂️' : '👩‍🦰'}</span>
          <span>&nbsp;{character.name} </span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === 'Dead' && 'red'}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span> - &nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <span>{character.location.name}</span>
        </div>
        <div className="actions">
          {isAddedToFavorite ? (
            <p>Already Added to Favorite ✅</p>
          ) : (
            <button
              onClick={() => onAddFavorite(character)}
              className="btn btn--primary"
            >
              Add to Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(false);

  let sortedEpisodes;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = episodes;
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button>
          <ArrowUpCircleIcon className="icon" />
        </button>
      </div>
      <ul>
        {episodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {/* for sorting index number */}
              {String(index + 1).padStart(2, '0')} {item.episode} :{' '}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
