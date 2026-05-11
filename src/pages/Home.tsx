import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelection } from '../contexts/SelectionContext';
import { GalleryGrid } from '../components/GalleryGrid';
import { SearchBar } from '../components/SearchBar';
import { SortOptions } from '../components/SortOptions';
import { SelectionControls } from '../components/SelectionControls';
import { filterPets, sortPets } from '../utils/filterAndSort';
import { downloadSelectedImages } from '../utils/download';
import type { SortOption } from '../types/pet';

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;

const Header = styled.header`
  background: white;
  padding: 20px 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    padding: 20px 32px;
  }
  
  @media (min-width: 1024px) {
    padding: 20px 40px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 24px;
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
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Home: React.FC = () => {
  const { pets, loading, error, refetch, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, selectAll, clearSelection } = useSelection();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [isDownloading, setIsDownloading] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const PETS_PER_PAGE = 12;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredAndSortedPets = useMemo(() => {
    const filtered = filterPets(pets, searchTerm);
    const sorted = sortPets(filtered, sortOption);
    return sorted;
  }, [pets, searchTerm, sortOption]);

  const displayedPets = useMemo(() => {
    return filteredAndSortedPets.slice(0, displayedCount);
  }, [filteredAndSortedPets, displayedCount]);

  const hasMore = displayedCount < filteredAndSortedPets.length;

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(12);
  }, [searchTerm, sortOption]);

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
    <Container>
      <Header>
        <HeaderContent>
          <TitleSection>
            <Title>Pet Gallery</Title>
          </TitleSection>
          <Controls>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <SortOptions value={sortOption} onChange={setSortOption} />
          </Controls>
        </HeaderContent>
      </Header>
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
    </Container>
  );
};

export default Home;
