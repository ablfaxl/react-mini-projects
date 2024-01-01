import { EyeIcon } from '@heroicons/react/24/outline';

const CharacterList = ({ characters, onSelectCharacter }) => {
  return (
    <div className="characters-list">
      {characters?.map((character) => (
        <Character
          key={character.id}
          character={character}
          onSelectCharacter={onSelectCharacter}
        />
      ))}
    </div>
  );
};

export default CharacterList;

function Character({ character, onSelectCharacter }) {
  return (
    <div className="list__item">
      <img src={character.image} alt={character.name} />
      <CharacterName item={character} />
      <CharacterInfo item={character} />
      <button
        className="icon red"
        onClick={() => onSelectCharacter(character.id)}
      >
        <EyeIcon />
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === 'Male' ? '👱‍♂️' : '👩‍🦰'}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === 'Dead' && 'red'}`}></span>
      <span> {item.status} </span>
      <span> - {item.species}</span>
    </div>
  );
}
