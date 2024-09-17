import React, { useState } from 'react';
import GameWindow from './components/GameWindow';
import BotPanel from './components/BotPanel';
import './styles/App.css';

function App() {
  const [inventory, setInventory] = useState({});
  const [shards, setShards] = useState(0); // Initialize shards with 0

  return (
    <div className="container">
      <div className="game-window">
        <GameWindow inventory={inventory} shards={shards} /> {/* Pass shards */}
      </div>

      <div className="bot-panel">
        <BotPanel inventory={inventory} setInventory={setInventory} shards={shards} setShards={setShards} /> {/* Pass setShards */}
      </div>
    </div>
  );
}

export default App;
