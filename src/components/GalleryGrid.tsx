import React from 'react';
import styled from 'styled-components';
import { PetCard } from './PetCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import type { Pet } from '../types/pet';

interface GalleryGridProps {
  pets: Pet[];
  selectedIds: Set<string>;
  onToggleSelection: (pet: Pet) => void;
  link?: boolean;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
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

const RetryButton = styled.button`
  margin-top: 24px;
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #2980b9;
  }
`;

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  pets,
  selectedIds,
  onToggleSelection,
  link = true,
  loading = false,
  error = null,
  onRetry
}) => {
  if (loading) {
    return (
      <Grid>
        <LoadingSkeleton variant="card" count={12} />
      </Grid>
    );
  }

  if (error) {
    return (
      <EmptyState>
        <EmptyTitle>Error Loading Pets</EmptyTitle>
        <EmptyMessage>{error}</EmptyMessage>
        {onRetry && (
          <RetryButton onClick={onRetry}>Try Again</RetryButton>
        )}
      </EmptyState>
    );
  }

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
          link={link}
        />
      ))}
    </Grid>
  );
};
