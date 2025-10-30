import React from 'react';
import { GardenState } from '../types';

interface GardenProps {
  garden: GardenState;
}

export function Garden({ garden }: GardenProps) {
  const renderPlants = () => {
    const plants = [];
    for (let i = 0; i < garden.plants; i++) {
      plants.push(
        <span key={i} className="plant" role="img" aria-label="plant">
          🌱
        </span>
      );
    }
    return plants;
  };

  return (
    <div className="garden">
      <h2>Your Garden</h2>
      <div className="garden-plot" data-testid="garden-plot">
        {garden.plants > 0 ? (
          renderPlants()
        ) : (
          <p className="empty-garden">Complete habits to grow your garden! 🌱</p>
        )}
      </div>
      <p className="plant-count">Plants grown: {garden.plants}</p>
    </div>
  );
}