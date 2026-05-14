import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, gradients } from '../theme';
import { Navigation } from '../components/Layout/Navigation';
import { GalleryGrid } from '../components/GalleryGrid';
import { SelectionControls } from '../components/SelectionControls';
import { EmptyState } from '../components/EmptyState';
import { useSelection } from '../contexts/SelectionContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useDownload } from '../hooks/useDownload';

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

export const Favorites: React.FC = () => {
  const { pets, colorAnalysisLoading, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, clearSelection, selectAll } = useSelection();
  const { favoriteIds } = useFavorites();
  const { isDownloading, handleDownload } = useDownload();

  const favoritePets = pets.filter(pet => favoriteIds.has(pet.id));

  const handleDownloadSelected = () => {
    handleDownload(selectedPets);
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
          <EmptyState
            icon={
              <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1' }}>
                favorite
              </span>
            }
            title="Your collection is empty"
            message="Tap the heart icon on any pet to save it here and build your personal collection"
            hasBackground={true}
            animateIcon={true}
          />
        ) : (
          <GalleryGrid
            pets={favoritePets}
            selectedIds={selectedIds}
            onToggleSelection={toggleSelection}
            loading={false}
            error={null}
            onRetry={() => { }}
            allPets={pets}
            colorAnalysisLoading={colorAnalysisLoading}
          />
        )}
      </FavoritesContainer>

      <SelectionControls
        selectedCount={selectedCount}
        totalFileSize={totalFileSize}
        onClearSelection={clearSelection}
        onDownload={handleDownloadSelected}
        isDownloading={isDownloading}
        onSelectAll={handleSelectAll}
        totalItems={favoritePets.length}
      />
    </Navigation>
  );
};

export default Favorites;
