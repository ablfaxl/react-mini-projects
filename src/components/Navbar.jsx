import { HeartIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Modal from './Modal';
const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
};

export default Navbar;

function Logo() {
  return <div className="navbar__logo">LOGO 🤘🏾👽</div>;
}
export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      placeholder="search ..."
    />
  );
}
export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function Favorite({ nameOfFavories }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal></Modal>
      <button onClick={() => setIsOpen((o) => !o)} className="heart">
        <HeartIcon className="icon" />
        <span className="badge">{nameOfFavories}</span>
      </button>
    </>
  );
}
