import React from 'react';
import gameWorldImage from '../assets/game_world.png'; // Update the path accordingly
import shardImage from '../assets/shard.png'; // Import the shard image

function GameWindow({ gatheringResource, inventory, shards }) {
  // Positioning based on the resource being gathered
  const getPlayerPosition = () => {
    switch (gatheringResource) {
      case 'wood':
        return { left: '120px', top: '200px' }; // Position near tree
      case 'stone':
        return { left: '350px', top: '250px' }; // Position near rock
      default:
        return { left: '50px', top: '350px' }; // Default position (idle)
    }
  };

  return (
    <div style={{
      width: '100%', 
      height: '500px', 
      border: '1px solid black', 
      position: 'relative', 
      backgroundColor: '#23272a',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: 'white',
      overflow: 'hidden' // Ensure no overflow
    }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Game world background */}
        <img 
          src={gameWorldImage} 
          alt="Game world" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain' // Maintain aspect ratio, no stretching
          }} 
        />

        {/* Player character */}
        <div style={{
          position: 'absolute',
          width: '30px', // Size of player
          height: '30px', 
          backgroundColor: 'blue', // Placeholder color
          borderRadius: '50%', // Circular shape
          zIndex: 2, // Make sure it stays above game elements but below inventory
          ...getPlayerPosition(),
        }}>
        </div>

        {/* Inventory inside the game window */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '20px', // Adjusted to prevent overlap
          width: '150px',
          padding: '10px',
          backgroundColor: '#2c2f33',
          color: 'white',
          border: '1px solid white',
          zIndex: 3, // Ensure inventory is on top of everything
        }}>
          <h4>Inventory</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {Object.keys(inventory).map((item) => (
              <li key={item} style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                {item}: {inventory[item]}
              </li>
            ))}
          </ul>
        </div>

        {/* Shards display */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '20px', // Position the shards display in the bottom-right
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#2c2f33',
          padding: '5px 10px',
          border: '1px solid white',
          borderRadius: '5px',
          zIndex: 3
        }}>
          <img 
            src={shardImage} 
            alt="Shard" 
            style={{ width: '20px', height: '20px', marginRight: '5px' }} // Set size of the shard image
          />
          <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>
            {shards} {/* Display the amount of shards */}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GameWindow;
