import React from 'react';
import styled from 'styled-components';
import { PetCard } from './PetCard';
import type { Pet } from '../types/pet';

interface GalleryGridProps {
  pets: Pet[];
  selectedIds: Set<string>;
  onToggleSelection: (pet: Pet) => void;
}

const Grid = styled.div`
  display: grid;
  gap: 24px;
  padding: 24px;
  
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
  
  /* Tablet: 2 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 32px;
    gap: 32px;
  }
  
  /* Desktop: 4 columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 40px;
    gap: 32px;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const EmptyTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 12px;
  color: #333;
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

export const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  pets, 
  selectedIds, 
  onToggleSelection 
}) => {
  if (pets.length === 0) {
    return (
      <EmptyState>
        <EmptyTitle>No pets found</EmptyTitle>
        <EmptyMessage>
          Try adjusting your search or filters to find what you're looking for.
        </EmptyMessage>
      </EmptyState>
    );
  }

  return (
    <Grid>
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          isSelected={selectedIds.has(pet.id)}
          onToggleSelection={onToggleSelection}
        />
      ))}
    </Grid>
  );
};
