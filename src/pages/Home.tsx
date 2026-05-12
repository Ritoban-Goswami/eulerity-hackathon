import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelection } from '../contexts/SelectionContext';
import { GalleryGrid } from '../components/GalleryGrid';
import { SelectionControls } from '../components/SelectionControls';
import { Navigation } from '../components/Layout/Navigation';
import { CustomDropdown } from '../components/CustomDropdown';
import { sortPets } from '../utils/filterAndSort';
import { downloadSelectedImages } from '../utils/download';
import { colors, typography, spacing } from '../theme';
import type { SortOption } from '../types/pet';

// Remove the old Container, Header, and other styled components as they're now handled by Navigation





const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;


const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: ${typography.display.fontSize};
  font-weight: ${typography.display.fontWeight};
  font-family: ${typography.display.fontFamily};
  color: ${colors.primary};
  line-height: ${typography.display.lineHeight};
  letter-spacing: ${typography.display.letterSpacing};
`;

const Subtitle = styled.p`
  font-size: ${typography.body.large.fontSize};
  font-weight: ${typography.body.large.fontWeight};
  font-family: ${typography.body.large.fontFamily};
  color: ${colors.onSurfaceVariant};
  line-height: ${typography.body.large.lineHeight};
  max-width: 672px;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const SortLabel = styled.span`
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  color: ${colors.outline};
`;

const LoadMoreTrigger = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${colors.surfaceContainer};
  border-top: 4px solid ${colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Home: React.FC = () => {
  const { pets, loading, error, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, clearSelection, selectAll } = useSelection();
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [isDownloading, setIsDownloading] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const PETS_PER_PAGE = 12;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const sortedPets = useMemo(() => {
    return sortPets(pets, sortOption);
  }, [pets, sortOption]);

  const displayedPets = useMemo(() => {
    return sortedPets.slice(0, displayedCount);
  }, [sortedPets, displayedCount]);

  const hasMore = displayedCount < sortedPets.length;


  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + PETS_PER_PAGE, sortedPets.length));
      setIsLoadingMore(false);
    }, 2000);
  }, [hasMore, isLoadingMore, sortedPets.length]);


  const handleSelectAll = () => {
    selectAll(sortedPets);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

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

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore, hasMore, isLoadingMore]);

  const content = (
    <>
      <PageHeader>
        <TitleSection>
          <Title>Premium Gallery</Title>
          <Subtitle>
            Explore your curated collection of high-resolution pet memories, organized by beauty and breed.
          </Subtitle>
        </TitleSection>
        <SortContainer>
          <SortLabel>Sort by:</SortLabel>
          <CustomDropdown
            options={[
              { value: 'name-asc', label: 'Name (A-Z)' },
              { value: 'name-desc', label: 'Name (Z-A)' },
              { value: 'date-newest', label: 'Newest' },
              { value: 'date-oldest', label: 'Oldest' },
            ]}
            value={sortOption}
            onChange={(value) => setSortOption(value as SortOption)}
          />
        </SortContainer>
      </PageHeader>

      <GalleryGrid
        pets={displayedPets}
        loading={loading}
        error={error}
        onToggleSelection={toggleSelection}
        selectedIds={selectedIds}
      />

      {hasMore && (
        <LoadMoreTrigger ref={loadMoreRef}>
          {isLoadingMore && <LoadingSpinner />}
        </LoadMoreTrigger>
      )}

      <SelectionControls
        selectedCount={selectedCount}
        totalFileSize={totalFileSize}
        onClearSelection={clearSelection}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        onSelectAll={handleSelectAll}
        totalItems={sortedPets.length}
      />
    </>
  );

  return (
    <Navigation searchValue={searchQuery} onSearchChange={handleSearchChange}>
      {content}
    </Navigation>
  );
};

export default Home;
