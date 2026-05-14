import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelection } from '../contexts/SelectionContext';
import { GalleryGrid } from '../components/GalleryGrid';
import { SelectionControls } from '../components/SelectionControls';
import { Navigation } from '../components/Layout/Navigation';
import { CustomDropdown } from '../components/CustomDropdown';
import { SearchResults } from '../components/SearchResults';
import { sortPets, filterPets } from '../utils/filterAndSort';
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
    align-items: flex-end;
    justify-content: space-between;
  }
`;


const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  font-family: ${typography.display.fontFamily};
  color: ${colors.primary};
  line-height: 1.2;
  letter-spacing: -0.5px;
  
  @media (min-width: 768px) {
    font-size: ${typography.display.fontSize};
    font-weight: ${typography.display.fontWeight};
    line-height: ${typography.display.lineHeight};
    letter-spacing: ${typography.display.letterSpacing};
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: ${typography.body.large.fontFamily};
  color: ${colors.onSurfaceVariant};
  line-height: 1.5;
  max-width: 100%;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.large.fontSize};
    font-weight: ${typography.body.large.fontWeight};
    line-height: ${typography.body.large.lineHeight};
    max-width: 672px;
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-left: auto;
  flex-shrink: 0;
`;

const SortLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  font-family: ${typography.label.medium.fontFamily};
  color: ${colors.outline};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
  
  @media (min-width: 768px) {
    font-size: ${typography.label.medium.fontSize};
  }
`;

const LoadMoreTrigger = styled.div`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
`;

const LoadingSpinner = styled.svg`
  width: 80px;
  height: 20px;
  
  path {
    fill: none;
    stroke: ${colors.primary};
    stroke-width: 2;
    stroke-linecap: round;
    animation: wave 1.5s linear infinite;
  }
  
  @keyframes wave {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-40px);
    }
  }
`;

const Home: React.FC = () => {
  const location = useLocation();
  const { pets, loading, error, colorAnalysisLoading, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, clearSelection, selectAll } = useSelection();
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [isDownloading, setIsDownloading] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
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
    return filterPets(pets, debouncedSearchQuery);
  }, [pets, debouncedSearchQuery]);

  const sortedPets = useMemo(() => {
    return sortPets(filteredPets, sortOption);
  }, [filteredPets, sortOption]);

  const displayedPets = useMemo(() => {
    return sortedPets.slice(0, displayedCount);
  }, [sortedPets, displayedCount]);

  const hasMore = displayedCount < sortedPets.length;

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

  // Add to recent searches when search query changes
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      addToRecentSearches(debouncedSearchQuery);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [debouncedSearchQuery]);

  // Clear search when navigating to home
  useEffect(() => {
    if (location.pathname === '/') {
      setSearchQuery('');
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [location.pathname]);


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

  const handleRecentSearchClick = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PawShots Search Results',
          text: `Check out these ${sortedPets.length} pets`,
          url: shareUrl
        });
      } catch {
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
      downloadSelectedImages(sortedPets).catch(error => {
        console.error('Export failed:', error);
      }).finally(() => {
        setIsDownloading(false);
      });
    }
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
      {debouncedSearchQuery ? (
        <SearchResults
          query={debouncedSearchQuery}
          totalResults={sortedPets.length}
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
            allPets={sortedPets}
            colorAnalysisLoading={colorAnalysisLoading}
          />

          {hasMore && (
            <LoadMoreTrigger ref={loadMoreRef}>
              {isLoadingMore && (
                <LoadingSpinner viewBox="0 0 80 20">
                  <path d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10 T120,10" />
                </LoadingSpinner>
              )}
            </LoadMoreTrigger>
          )}
        </SearchResults>
      ) : (
        <>
          <PageHeader>
            <TitleSection>
              <Title>Premium Gallery</Title>
              <Subtitle>
                Explore your curated collection of high-resolution pet memories, organized by beauty and breed.
              </Subtitle>
            </TitleSection>
            <SortContainer>
              <SortLabel>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>sort</span>
                Sort
              </SortLabel>
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
            allPets={sortedPets}
            colorAnalysisLoading={colorAnalysisLoading}
          />

          {hasMore && (
            <LoadMoreTrigger ref={loadMoreRef}>
              {isLoadingMore && (
                <LoadingSpinner viewBox="0 0 80 20">
                  <path d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,10 T100,10 T120,10" />
                </LoadingSpinner>
              )}
            </LoadMoreTrigger>
          )}
        </>
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
    <Navigation showSearch={true} searchValue={searchQuery} onSearchChange={handleSearchChange}>
      {content}
    </Navigation>
  );
};

export default Home;
