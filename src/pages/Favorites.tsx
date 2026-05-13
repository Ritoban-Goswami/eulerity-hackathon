import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { colors, typography, spacing, borderRadius, gradients } from '../theme';
import { Navigation } from '../components/Layout/Navigation';
import { GalleryGrid } from '../components/GalleryGrid';
import { SelectionControls } from '../components/SelectionControls';
import { useSelection } from '../contexts/SelectionContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { downloadSelectedImages } from '../utils/download';

const FavoritesContainer = styled.div`
  padding: ${spacing.sm};
  max-width: 1400px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    padding: ${spacing.xl};
  }
`;

const FavoritesHeader = styled.div`
  margin-bottom: ${spacing.md};
  
  @media (min-width: 768px) {
    margin-bottom: ${spacing.xl};
  }
`;

const FavoritesTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  font-family: ${typography.display.fontFamily};
  background: ${gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 ${spacing.sm} 0;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: ${typography.display.fontSize};
    font-weight: ${typography.display.fontWeight};
    line-height: 1.1;
  }
`;

const FavoritesSubtitle = styled.p`
  font-size: 13px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.large.fontSize};
    font-weight: ${typography.body.large.fontWeight};
  }
`;

const EmptyFavorites = styled.div`
  text-align: center;
  padding: ${spacing.lg} ${spacing.md};
  background: ${colors.surfaceContainer};
  border-radius: ${borderRadius.xl};
  border: 1px solid ${colors.outlineVariant}20;
  
  @media (min-width: 768px) {
    padding: ${spacing.xl} ${spacing.lg};
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const EmptyIcon = styled.div`
  font-size: 40px;
  margin-bottom: ${spacing.sm};
  color: ${colors.primary};
  animation: ${float} 3s ease-in-out infinite;
  
  @media (min-width: 768px) {
    font-size: 64px;
    margin-bottom: ${spacing.lg};
  }
`;

const EmptyTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.sm} 0;
  
  @media (min-width: 768px) {
    font-size: ${typography.headline.large.fontSize};
    font-weight: ${typography.headline.large.fontWeight};
  }
`;

const EmptyMessage = styled.p`
  font-size: 13px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.large.fontSize};
    font-weight: ${typography.body.large.fontWeight};
  }
`;

export const Favorites: React.FC = () => {
  const { pets, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, clearSelection, selectAll } = useSelection();
  const { favoriteIds } = useFavorites();
  const [isDownloading, setIsDownloading] = useState(false);

  const favoritePets = pets.filter(pet => favoriteIds.has(pet.id));

  const handleDownload = async () => {
    if (selectedCount === 0) return;
    setIsDownloading(true);
    try {
      await downloadSelectedImages(selectedPets);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSelectAll = () => {
    selectAll(favoritePets);
  };

  return (
    <Navigation>
      <FavoritesContainer>
        <FavoritesHeader>
          <FavoritesTitle>Your Collection</FavoritesTitle>
          <FavoritesSubtitle>
            {favoritePets.length === 0
              ? 'Start curating your favorite pets'
              : `${favoritePets.length} ${favoritePets.length === 1 ? 'pet' : 'pets'} saved`
            }
          </FavoritesSubtitle>
        </FavoritesHeader>

        {favoritePets.length === 0 ? (
          <EmptyFavorites>
            <EmptyIcon>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1' }}>
                favorite
              </span>
            </EmptyIcon>
            <EmptyTitle>Your collection is empty</EmptyTitle>
            <EmptyMessage>
              Tap the heart icon on any pet to save it here and build your personal collection
            </EmptyMessage>
          </EmptyFavorites>
        ) : (
          <GalleryGrid
            pets={favoritePets}
            selectedIds={selectedIds}
            onToggleSelection={toggleSelection}
            loading={false}
            error={null}
            onRetry={() => { }}
          />
        )}
      </FavoritesContainer>

      <SelectionControls
        selectedCount={selectedCount}
        totalFileSize={totalFileSize}
        onClearSelection={clearSelection}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        onSelectAll={handleSelectAll}
        totalItems={favoritePets.length}
      />
    </Navigation>
  );
};

export default Favorites;
