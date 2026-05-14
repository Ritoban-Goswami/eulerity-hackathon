import React from 'react';
import styled from 'styled-components';
import { PetCard } from './PetCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { spacing } from '../theme';
import type { Pet } from '../types/pet';

interface GalleryGridProps {
  pets: Pet[];
  selectedIds: Set<string>;
  onToggleSelection: (pet: Pet) => void;
  link?: boolean;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  allPets?: Pet[];
  colorAnalysisLoading?: boolean;
}

/**
 * GalleryGrid Component
 * 
 * Displays a responsive grid of pet cards with the following breakpoints:
 * - Mobile (< 768px): 1 column
 * - Tablet (768px - 1024px): 2 columns
 * - Desktop (>= 1024px): 4 columns
 * 
 * Supports loading, error, and empty states with appropriate UI.
 */

const Grid = styled.div`
  display: grid;
  gap: ${spacing.md};
  align-items: stretch;

  /* Mobile: 1 column */
  grid-template-columns: 1fr;

  /* Tablet: 2 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.md};
  }

  /* Desktop: 4 columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${spacing.md};
  }
`;

export const GalleryGrid: React.FC<GalleryGridProps> = React.memo(({
  pets,
  selectedIds,
  onToggleSelection,
  link = true,
  loading = false,
  error = null,
  onRetry,
  colorAnalysisLoading = false
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
      <EmptyState
        title="Error Loading Pets"
        message={error}
        action={onRetry ? { label: 'Try Again', onClick: onRetry } : undefined}
      />
    );
  }

  if (pets.length === 0) {
    return (
      <EmptyState
        title="No pets found"
        message="Try adjusting your search or filters to find what you're looking for."
      />
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
          colorAnalysisLoading={colorAnalysisLoading}
        />
      ))}
    </Grid>
  );
});
