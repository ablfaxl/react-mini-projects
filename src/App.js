export default function App() {
  return (
    <div className="app">
      <Logo />
      <From />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function From() {
  return (
    <div className="add-form">
      <h3>What do you need for your trip ?</h3>
    </div>
  );
}

function PackingList() {
  return <div className="list">List</div>;
}

function Stats() {
  return (
    <em>
      <footer className="stats">
        You have X items on your list, and you already packed X%
      </footer>
    </em>
  );
}
