import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelection } from '../contexts/SelectionContext';
import { GalleryGrid } from '../components/GalleryGrid';
import { SelectionControls } from '../components/SelectionControls';
import { Navigation } from '../components/Layout/Navigation';
import { SearchResults } from '../components/SearchResults';
import { filterPets } from '../utils/filterAndSort';
import { downloadSelectedImages } from '../utils/download';
import { colors } from '../theme';

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

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pets, loading, error, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, clearSelection, selectAll } = useSelection();
  const [isDownloading, setIsDownloading] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(() => searchParams.get('q') || '');
  const [recentSearches, setRecentSearches] = useState<Array<{ term: string; primary?: boolean }>>(() => {
    try {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const PETS_PER_PAGE = 12;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredPets = useMemo(() => {
    const filtered = filterPets(pets, debouncedSearchQuery);
    return filtered;
  }, [pets, debouncedSearchQuery]);

  const displayedPets = useMemo(() => {
    return filteredPets.slice(0, displayedCount);
  }, [filteredPets, displayedCount]);

  const hasMore = displayedCount < filteredPets.length;

  // Debounce search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setDisplayedCount(12);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addToRecentSearches = (query: string) => {
    if (!query || !query.trim()) return;

    setRecentSearches(prev => {
      const exists = prev.some(s => s.term.toLowerCase() === query.toLowerCase());
      if (exists) return prev;

      const newSearch = { term: query, primary: false };
      const updated = [newSearch, ...prev].slice(0, 5);
      return updated.map((s, i) => ({ ...s, primary: i === 0 }));
    });
  };

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + PETS_PER_PAGE, filteredPets.length));
      setIsLoadingMore(false);
    }, 2000);
  }, [hasMore, isLoadingMore, filteredPets.length]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setSearchQuery(searchTerm);
    setSearchParams({ q: searchTerm });
  };

  const handleSearchSubmit = (query: string) => {
    addToRecentSearches(query);
    setSearchQuery(query);
    setDebouncedSearchQuery(query);
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

  const handleSelectAll = () => {
    selectAll(filteredPets);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PawShots Search Results',
          text: `Check out these ${filteredPets.length} pets`,
          url: shareUrl
        });
      } catch (err) {
        // Error sharing - fallback to clipboard copy
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  const handleExport = () => {
    if (selectedCount > 0) {
      handleDownload();
    } else {
      // Export all filtered results if nothing is selected
      setIsDownloading(true);
      downloadSelectedImages(filteredPets).catch(error => {
        console.error('Export failed:', error);
      }).finally(() => {
        setIsDownloading(false);
      });
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
      <SearchResults
        query={debouncedSearchQuery}
        totalResults={filteredPets.length}
        onRecentSearchClick={handleRecentSearchClick}
        recentSearches={recentSearches}
        onShare={handleShare}
        onExport={handleExport}
      >
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
      </SearchResults>

      <SelectionControls
        selectedCount={selectedCount}
        totalFileSize={totalFileSize}
        onClearSelection={clearSelection}
        onDownload={handleDownload}
        isDownloading={isDownloading}
        onSelectAll={handleSelectAll}
        totalItems={filteredPets.length}
      />
    </>
  );

  return (
    <Navigation onSearchChange={handleSearchChange} searchValue={searchQuery} onSearchSubmit={handleSearchSubmit}>
      {content}
    </Navigation>
  );
};

export default Search;
