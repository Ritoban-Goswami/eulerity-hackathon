import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSelection } from '../contexts/SelectionContext';
import { GalleryGrid } from '../components/GalleryGrid';
import { SearchBar } from '../components/SearchBar';
import { SortOptions } from '../components/SortOptions';
import { SelectionControls } from '../components/SelectionControls';
import { Pagination } from '../components/Pagination';
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





const Home: React.FC = () => {
  const { pets, loading, error, refetch, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, selectAll, clearSelection } = useSelection();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PETS_PER_PAGE = 12;

  const filteredAndSortedPets = useMemo(() => {
    const filtered = filterPets(pets, searchTerm);
    const sorted = sortPets(filtered, sortOption);
    return sorted;
  }, [pets, searchTerm, sortOption]);

  const paginatedPets = useMemo(() => {
    const startIndex = (currentPage - 1) * PETS_PER_PAGE;
    const endIndex = startIndex + PETS_PER_PAGE;
    return filteredAndSortedPets.slice(startIndex, endIndex);
  }, [filteredAndSortedPets, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedPets.length / PETS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

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
        pets={paginatedPets}
        selectedIds={selectedIds}
        onToggleSelection={toggleSelection}
        loading={loading}
        error={error}
        onRetry={refetch}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
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
