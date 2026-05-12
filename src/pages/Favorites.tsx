import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, typography, spacing } from '../theme';
import { Navigation } from '../components/Layout/Navigation';
import { GalleryGrid } from '../components/GalleryGrid';
import { SelectionControls } from '../components/SelectionControls';
import { useSelection } from '../contexts/SelectionContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { downloadSelectedImages } from '../utils/download';
import { useNavigate } from 'react-router-dom';

const FavoritesContainer = styled.div`
  padding: ${spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
`;

const FavoritesHeader = styled.div`
  margin-bottom: ${spacing.xl};
`;

const FavoritesTitle = styled.h1`
  font-size: ${typography.display.fontSize};
  font-weight: ${typography.display.fontWeight};
  font-family: ${typography.display.fontFamily};
  color: ${colors.primary};
  margin: 0 0 ${spacing.sm} 0;
  line-height: 1.1;
`;

const FavoritesSubtitle = styled.p`
  font-size: ${typography.body.large.fontSize};
  font-weight: ${typography.body.large.fontWeight};
  font-family: ${typography.body.large.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
`;

const EmptyFavorites = styled.div`
  text-align: center;
  padding: ${spacing.xl} ${spacing.lg};
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: ${spacing.lg};
  color: ${colors.outlineVariant};
`;

const EmptyTitle = styled.h2`
  font-size: ${typography.headline.large.fontSize};
  font-weight: ${typography.headline.large.fontWeight};
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.sm} 0;
`;

const EmptyMessage = styled.p`
  font-size: ${typography.body.large.fontSize};
  font-weight: ${typography.body.large.fontWeight};
  font-family: ${typography.body.large.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
`;

export const Favorites: React.FC = () => {
  const { pets, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, clearSelection, selectAll } = useSelection();
  const { favoriteIds } = useFavorites();
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Navigation searchValue={searchQuery} onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit}>
      <FavoritesContainer>
        <FavoritesHeader>
          <FavoritesTitle>Your Favorites</FavoritesTitle>
          <FavoritesSubtitle>
            {favoritePets.length === 0
              ? 'You haven\'t favorited any pets yet'
              : `${favoritePets.length} ${favoritePets.length === 1 ? 'pet' : 'pets'} in your collection`
            }
          </FavoritesSubtitle>
        </FavoritesHeader>

        {favoritePets.length === 0 ? (
          <EmptyFavorites>
            <EmptyIcon>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 0' }}>
                favorite
              </span>
            </EmptyIcon>
            <EmptyTitle>No favorites yet</EmptyTitle>
            <EmptyMessage>
              Start building your collection by clicking the heart icon on any pet
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
