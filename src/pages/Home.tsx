import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelection } from '../contexts/SelectionContext';
import { GalleryGrid } from '../components/GalleryGrid';
import { SelectionControls } from '../components/SelectionControls';
import { Navigation } from '../components/Layout/Navigation';
import { filterPets, sortPets } from '../utils/filterAndSort';
import { downloadSelectedImages } from '../utils/download';
import { colors, typography, spacing, borderRadius } from '../theme';
import { type FilterState } from '../components/FilterModal';
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

const SortSelect = styled.select`
  background: ${colors.surfaceContainer};
  border: 1px solid ${colors.outlineVariant};
  border-radius: ${borderRadius.lg};
  padding: 8px 16px;
  font-size: ${typography.label.medium.fontSize};
  font-family: ${typography.label.medium.fontFamily};
  color: ${colors.onSurface};
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primary}40;
  }
`;

const LoadMoreTrigger = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Home: React.FC = () => {
  const { pets, loading, error, refetch, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, selectAll, clearSelection } = useSelection();
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [isDownloading, setIsDownloading] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    petType: [],
    dateRange: 'all',
    hasSelection: false,
  });
  const PETS_PER_PAGE = 12;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredAndSortedPets = useMemo(() => {
    let filtered = filterPets(pets, '');

    // Apply additional filters
    if (filters.petType.length > 0) {
      filtered = filtered.filter(pet =>
        filters.petType.some(type =>
          pet.title.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    if (filters.hasSelection) {
      filtered = filtered.filter(pet => selectedIds.has(pet.id));
    }

    // TODO: Implement date range filtering based on filters.dateRange

    const sorted = sortPets(filtered, sortOption);
    return sorted;
  }, [pets, sortOption, filters, selectedIds]);

  const displayedPets = useMemo(() => {
    return filteredAndSortedPets.slice(0, displayedCount);
  }, [filteredAndSortedPets, displayedCount]);

  const hasMore = displayedCount < filteredAndSortedPets.length;

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(12);
  }, [sortOption, filters]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    // Brief delay for visual feedback
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + PETS_PER_PAGE, filteredAndSortedPets.length));
      setIsLoadingMore(false);
    }, 100);
  }, [hasMore, isLoadingMore, filteredAndSortedPets.length]);

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

  const handleSelectAll = () => {
    if (selectedCount === filteredAndSortedPets.length) {
      clearSelection();
    } else {
      selectAll(filteredAndSortedPets);
    }
  };

  const handleDownload = async () => {
    if (selectedCount === 0) return;

    setIsDownloading(true);
    try {
      await downloadSelectedImages(selectedPets);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Some downloads failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Always render the full layout, GalleryGrid will handle loading/error states

  return (
    <Navigation onFilterChange={handleFilterChange}>
      <PageHeader>
        <TitleSection>
          <Title>Premium Gallery</Title>
          <Subtitle>
            Explore your curated collection of high-resolution pet memories, organized by beauty and breed.
          </Subtitle>
        </TitleSection>
        <SortContainer>
          <SortLabel>Sort by:</SortLabel>
          <SortSelect value={sortOption} onChange={(e) => setSortOption(e.target.value as SortOption)}>
            <option value="name-asc">Alphabetical</option>
            <option value="date-desc">Recent</option>
            <option value="type">Type</option>
          </SortSelect>
        </SortContainer>
      </PageHeader>

      <GalleryGrid
        pets={displayedPets}
        selectedIds={selectedIds}
        onToggleSelection={toggleSelection}
        loading={loading}
        error={error}
        onRetry={refetch}
      />

      {hasMore && (
        <LoadMoreTrigger ref={loadMoreRef}>
          {isLoadingMore && <LoadingSpinner />}
        </LoadMoreTrigger>
      )}

      <SelectionControls
        selectedCount={selectedCount}
        totalFileSize={totalFileSize}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
        onDownload={handleDownload}
        hasPets={filteredAndSortedPets.length > 0}
        allSelected={selectedCount === filteredAndSortedPets.length && filteredAndSortedPets.length > 0}
        isDownloading={isDownloading}
      />
    </Navigation>
  );
};

export default Home;
