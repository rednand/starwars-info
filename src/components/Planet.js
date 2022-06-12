import React from "react";

const Planet = ({ planet }) => {
  return (
    <div className="card">
      <h2>{planet.name}</h2>
      <p>Popularion - {planet.population}</p>
      <p>Terrain - {planet.terrain}</p>
    </div>
  );
};

export default Planet;