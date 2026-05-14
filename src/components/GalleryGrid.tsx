import React from 'react';
import styled from 'styled-components';
import { PetCard } from './PetCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { colors, typography, spacing } from '../theme';
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

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: ${colors.onSurfaceVariant};
`;

const EmptyTitle = styled.h2`
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  margin-bottom: 12px;
  color: ${colors.onSurface};
`;

const EmptyMessage = styled.p`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  max-width: 400px;
  margin: 0 auto;
  line-height: ${typography.body.medium.lineHeight};
`;

const RetryButton = styled.button`
  margin-top: 24px;
  padding: 12px 24px;
  background: ${colors.primary};
  color: ${colors.onPrimary};
  border: none;
  border-radius: 8px;
  font-size: ${typography.body.medium.fontSize};
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.primaryContainer};
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
          colorAnalysisLoading={colorAnalysisLoading}
        />
      ))}
    </Grid>
  );
});
