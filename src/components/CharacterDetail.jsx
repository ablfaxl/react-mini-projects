import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { character, episodes } from '../data/data';
import { useState } from 'react';

const CharacterDetail = ({ selectedId }) => {
  const [character, setCharacter] = useState(null);
  return (
    <div style={{ flex: 1 }}>
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
            <button className="btn btn--primary">Add to Favorite</button>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default CharacterDetail;
