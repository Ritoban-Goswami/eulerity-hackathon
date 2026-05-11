import React from 'react';
import styled from 'styled-components';
import { usePetData } from '../hooks/usePetData';
import { useSelection } from '../contexts/SelectionContext';
import { GalleryGrid } from '../components/GalleryGrid';

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

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 18px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 20px;
  text-align: center;
`;

const ErrorMessage = styled.h2`
  color: #e74c3c;
  margin-bottom: 12px;
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #2980b9;
  }
`;

const Home: React.FC = () => {
  const { pets, loading, error, refetch } = usePetData();
  const { selectedIds, toggleSelection } = useSelection();

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Pet Gallery</Title>
        </Header>
        <LoadingContainer>Loading pets...</LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>Pet Gallery</Title>
        </Header>
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton onClick={refetch}>Try Again</RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Pet Gallery</Title>
      </Header>
      <GalleryGrid
        pets={pets}
        selectedIds={selectedIds}
        onToggleSelection={toggleSelection}
      />
    </Container>
  );
};

export default Home;
