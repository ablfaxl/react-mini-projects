import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const CharacterList = ({ characters, onSelectCharacter, selectedId }) => {
  return (
    <div className="characters-list">
      {characters?.map((character) => (
        <Character
          key={character.id}
          character={character}
          onSelectCharacter={onSelectCharacter}
          selectedId={selectedId}
        >
          <button
            className="icon red"
            onClick={() => onSelectCharacter(character.id)}
          >
            {selectedId === character.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </Character>
      ))}
    </div>
  );
};

export default CharacterList;

export function Character({ character, children }) {
  return (
    <div className="list__item">
      <img src={character.image} alt={character.name} />
      <CharacterName item={character} />
      <CharacterInfo item={character} />
      {children}
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
