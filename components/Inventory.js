import React from 'react';

function Inventory({ wood, stone }) {
  return (
    <div className="inventory">
      <h3>Inventory</h3>
      <p>Wood: {wood}</p>
      <p>Stone: {stone}</p>
    </div>
  );
}

export default Inventory;
