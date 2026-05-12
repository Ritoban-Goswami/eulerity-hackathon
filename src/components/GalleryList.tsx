import React from 'react';
import styled from 'styled-components';
import { LoadingSkeleton } from './LoadingSkeleton';
import { colors, typography, spacing, borderRadius, elevation, transitions } from '../theme';
import type { Pet } from '../types/pet';

interface GalleryListProps {
  pets: Pet[];
  selectedIds: Set<string>;
  onToggleSelection: (pet: Pet) => void;
  link?: boolean;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const ListItem = styled.div`
  display: flex;
  background: ${colors.surfaceContainerLowest};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  box-shadow: ${elevation.level1};
  transition: ${transitions.hover};
  cursor: pointer;
  border: 1px solid ${colors.outlineVariant};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${elevation.level2};
  }
`;

const ListImage = styled.img`
  width: 200px;
  height: 160px;
  aspect-ratio: 4/5;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 120px;
    aspect-ratio: 4/5;
  }
`;

const ListContent = styled.div`
  flex: 1;
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  
  @media (max-width: 768px) {
    min-height: 120px;
  }
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.sm};
`;

const ListTitle = styled.h3`
  margin: 0;
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.primary};
`;

const ListCheckbox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: ${borderRadius.DEFAULT};
  border: 1px solid ${colors.outline};
  background: ${colors.surface};
  transition: all 0.2s ease;

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

const ListDescription = styled.p`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  line-height: ${typography.body.medium.lineHeight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${spacing.sm};
`;

const ListMetadata = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${typography.label.small.fontSize};
  font-weight: ${typography.label.small.fontWeight};
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.outline};
`;

const MetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const EmptyState = styled.div`
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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const extractBreed = (title: string) => {
  const breeds = ['Golden Retriever', 'Tabby', 'Bulldog', 'Persian', 'Siamese', 'Poodle', 'Labrador'];
  const found = breeds.find(breed => title.toLowerCase().includes(breed.toLowerCase()));
  return found || 'Unknown';
};

const formatFileSize = () => {
  const sizes = ['20MP', '24MP', '42MP', '61MP'];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

export const GalleryList: React.FC<GalleryListProps> = React.memo(({
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
      <List>
        <LoadingSkeleton variant="list" count={5} />
      </List>
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
    <List>
      {pets.map((pet) => {
        const breed = extractBreed(pet.title);
        const fileSize = formatFileSize();

        return (
          <ListItem key={pet.id} onClick={() => !link && onToggleSelection(pet)}>
            <ListImage
              src={pet.url}
              alt={pet.description}
              loading="lazy"
              decoding="async"
              width="400"
              height="300"
            />
            <ListContent>
              <ListHeader>
                <ListTitle>{pet.title}</ListTitle>
                <ListCheckbox
                  type="checkbox"
                  checked={selectedIds.has(pet.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggleSelection(pet);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Select ${pet.title}`}
                  aria-checked={selectedIds.has(pet.id)}
                />
              </ListHeader>
              <ListDescription>{pet.description}</ListDescription>
              <ListMetadata>
                <MetadataItem>
                  <span className="material-symbols-outlined" style={{ fontSize: typography.label.small.fontSize }}>pets</span>
                  {breed}
                </MetadataItem>
                <MetadataItem>
                  <span className="material-symbols-outlined" style={{ fontSize: typography.label.small.fontSize }}>calendar_today</span>
                  {formatDate(pet.created)}
                </MetadataItem>
                <MetadataItem>
                  <span className="material-symbols-outlined" style={{ fontSize: typography.label.small.fontSize }}>photo_camera</span>
                  {fileSize}
                </MetadataItem>
              </ListMetadata>
            </ListContent>
          </ListItem>
        );
      })}
    </List>
  );
});
