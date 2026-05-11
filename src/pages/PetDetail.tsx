import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { usePetData } from '../hooks/usePetData';
import { useSelection } from '../contexts/SelectionContext';
import { PetCard } from '../components/PetCard';

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40px 24px;
  
  @media (min-width: 768px) {
    padding: 60px 32px;
  }
  
  @media (min-width: 1024px) {
    padding: 80px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-bottom: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 60px;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const ImageContainer = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  
  @media (min-width: 1024px) {
    max-width: 600px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Info = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: 32px;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

const Description = styled.p`
  margin: 0 0 24px 0;
  font-size: 18px;
  line-height: 1.6;
  color: #666;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
`;

const DateText = styled.span`
  font-size: 14px;
  color: #999;
`;

const SelectionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const RelatedSection = styled.div`
  flex: 0 0 350px;
  
  @media (max-width: 1023px) {
    flex: 1;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 24px;
  color: #333;
`;

const RelatedGrid = styled.div`
  display: grid;
  gap: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pets, loading } = usePetData();
  const { selectedIds, toggleSelection } = useSelection();

  const pet = useMemo(() => {
    return pets.find(p => p.id === id);
  }, [pets, id]);

  const relatedPets = useMemo(() => {
    if (!pet || pets.length <= 1) return [];

    const others = pets.filter(p => p.id !== pet.id);
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [pet, pets]);

  if (loading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  if (!pet) {
    return (
      <Container>
        <div>Pet not found</div>
      </Container>
    );
  }

  const isSelected = selectedIds.has(pet.id);

  return (
    <Container>
      <BackButton to="/">
        ← Back to Gallery
      </BackButton>

      <Content>
        <MainContent>
          <ImageContainer>
            <Image src={pet.url} alt={pet.title} />
          </ImageContainer>

          <Info>
            <Title>{pet.title}</Title>
            <Description>{pet.description}</Description>

            <Meta>
              <DateText>Added on {formatDate(pet.created)}</DateText>
              <SelectionLabel>
                <Checkbox
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelection(pet)}
                />
                Select this pet
              </SelectionLabel>
            </Meta>
          </Info>
        </MainContent>

        {relatedPets.length > 0 && (
          <RelatedSection>
            <SectionTitle>Related Pets</SectionTitle>
            <RelatedGrid>
              {relatedPets.map(relatedPet => (
                <PetCard
                  key={relatedPet.id}
                  pet={relatedPet}
                  isSelected={selectedIds.has(relatedPet.id)}
                  onToggleSelection={toggleSelection}
                  link={true}
                />
              ))}
            </RelatedGrid>
          </RelatedSection>
        )}
      </Content>
    </Container>
  );
};

export default PetDetail;
