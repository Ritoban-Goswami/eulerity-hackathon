import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { colors, typography, spacing, borderRadius, elevation, transitions } from '../theme';
import { Navigation } from '../components/Layout/Navigation';
import { useSelection } from '../contexts/SelectionContext';
import { groupPetsByColor } from '../utils/imageAnalysis';
import { PetCard } from '../components/PetCard';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { usePetData } from '../hooks/usePetData';

const CollectionsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${spacing.sm};
  padding-top: calc(${spacing.sm} + env(safe-area-inset-top));
  
  @media (min-width: 768px) {
    padding: ${spacing.xl};
    padding-top: ${spacing.xl};
  }
  
  @media (max-width: 480px) {
    padding: ${spacing.xs};
    padding-top: calc(${spacing.xs} + env(safe-area-inset-top));
  }
`;

const Header = styled.div`
  margin-bottom: ${spacing.xl};
  
  @media (min-width: 768px) {
    margin-bottom: ${spacing.xl};
  }
  
  @media (max-width: 767px) {
    margin-bottom: ${spacing.lg};
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  font-family: ${typography.display.fontFamily};
  color: ${colors.primary};
  margin: 0 0 ${spacing.sm} 0;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: ${typography.display.fontSize};
    font-weight: ${typography.display.fontWeight};
    margin: 0 0 ${spacing.md} 0;
  }
  
  @media (max-width: 767px) {
    font-size: 24px;
  }
  
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: ${typography.body.large.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.large.fontSize};
    font-weight: ${typography.body.large.fontWeight};
  }
  
  @media (max-width: 767px) {
    font-size: 13px;
    line-height: 1.4;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};
  
  @media (min-width: 768px) {
    gap: ${spacing.xl};
  }
  
  @media (max-width: 767px) {
    gap: ${spacing.lg};
  }
  
  @media (max-width: 480px) {
    gap: ${spacing.md};
  }
`;

const CollectionCard = styled.div`
  background: ${colors.surfaceContainerLow};
  border-radius: ${borderRadius.xl};
  overflow: hidden;
  box-shadow: ${elevation.level1};
  transition: ${transitions.hover};
  
  &:hover {
    box-shadow: ${elevation.level2};
    transform: translateY(-4px);
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover {
      transform: none;
    }
  }
  
  @media (max-width: 767px) {
    border-radius: ${borderRadius.lg};
  }
`;

const CollectionHeader = styled.div<{ $color: string }>`
  padding: ${spacing.md};
  background: linear-gradient(135deg, ${props => props.$color}40, ${props => props.$color}20);
  border-bottom: 1px solid ${colors.outlineVariant}20;
  
  @media (min-width: 768px) {
    padding: ${spacing.lg};
  }
  
  @media (max-width: 767px) {
    padding: ${spacing.sm};
  }
`;

const CollectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.xs} 0;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-wrap: wrap;
  
  @media (min-width: 768px) {
    font-size: ${typography.headline.large.fontSize};
    font-weight: ${typography.headline.large.fontWeight};
    margin: 0 0 ${spacing.sm} 0;
  }
  
  @media (max-width: 767px) {
    font-size: 16px;
    gap: ${spacing.xs};
  }
  
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const ColorDot = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: ${borderRadius.full};
  background: ${props => props.$color};
  border: 2px solid ${colors.surfaceContainerLowest};
  box-shadow: ${elevation.level1};
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: 767px) {
    width: 20px;
    height: 20px;
  }
`;

const CollectionCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  font-family: ${typography.label.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  background: ${colors.surfaceContainerHigh};
  padding: 4px 12px;
  border-radius: ${borderRadius.full};
  
  @media (min-width: 768px) {
    font-size: ${typography.label.medium.fontSize};
    font-weight: ${typography.label.medium.fontWeight};
  }
  
  @media (max-width: 767px) {
    font-size: 11px;
    padding: 3px 8px;
  }
`;

const CollectionContent = styled.div`
  padding: ${spacing.md};
  
  @media (min-width: 768px) {
    padding: ${spacing.lg};
  }
  
  @media (max-width: 767px) {
    padding: ${spacing.sm};
  }
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${spacing.md};
  }
  
  @media (max-width: 767px) {
    gap: ${spacing.xs};
  }
`;

const CollectionImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${borderRadius.md};
  transition: ${transitions.imageZoom};
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 767px) {
    border-radius: ${borderRadius.sm};
  }
  
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const SimilarGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacing.lg};
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 767px) {
    gap: ${spacing.sm};
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.md};
  }
`;

const COLLECTION_COLORS: Record<string, string> = {
  'Red': '#FF5252',
  'Orange': '#FF9800',
  'Yellow': '#FFEB3B',
  'Green': '#4CAF50',
  'Cyan': '#00BCD4',
  'Blue': '#2196F3',
  'Purple': '#9C27B0',
  'Pink': '#E91E63',
  'Warm': '#FF7043',
  'Cool': '#42A5F5',
  'Bright': '#FFEB3B',
  'Dark': '#424242',
  'Neutral': '#9E9E9E',
};

const COLLECTION_ORDER = ['Red', 'Orange', 'Yellow', 'Green', 'Cyan', 'Blue', 'Purple', 'Pink', 'Warm', 'Cool', 'Bright', 'Dark', 'Neutral'];

export const VisualCollections: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { toggleSelection } = useSelection();
  const { pets } = usePetData();

  const colorGroups = useMemo(() => {
    return groupPetsByColor(pets);
  }, [pets]);

  const sortedCollections = useMemo(() => {
    return COLLECTION_ORDER
      .filter(category => colorGroups[category] && colorGroups[category].length > 0)
      .map(category => ({
        category,
        pets: colorGroups[category],
        color: COLLECTION_COLORS[category] || '#9E9E9E',
      }));
  }, [colorGroups]);

  const selectedCategory = useMemo(() => {
    if (!category) return null;
    // Convert URL param (e.g., "neutral-tones") to category name (e.g., "Neutral")
    const categoryName = category.replace('-tones', '').replace(/\b\w/g, l => l.toUpperCase());
    return COLLECTION_ORDER.includes(categoryName) ? categoryName : null;
  }, [category]);

  if (pets.length === 0) {
    return (
      <Navigation>
        <CollectionsContainer>
          <EmptyState
            icon={<span className="material-symbols-outlined" style={{ fontSize: '48px' }}>palette</span>}
            title="Loading Collections"
            message="We're analyzing the colors in the pet images to create beautiful collections for you."
          />
        </CollectionsContainer>
      </Navigation>
    );
  }

  if (selectedCategory) {
    const categoryPets = colorGroups[selectedCategory] || [];

    return (
      <Navigation>
        <CollectionsContainer>
          <Button
            variant="surface"
            size="md"
            icon={<span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>}
            onClick={() => navigate('/collections')}
            style={{ marginBottom: '16px' }}
          >
            Back to All Collections
          </Button>

          <Header>
            <Title>Pets with {selectedCategory} Tones</Title>
            <Subtitle>
              {categoryPets.length} adorable pets waiting to meet you
            </Subtitle>
          </Header>

          {categoryPets.length > 0 ? (
            <SimilarGrid>
              {categoryPets.map(pet => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  isSelected={false}
                  onToggleSelection={toggleSelection}
                  link={true}
                />
              ))}
            </SimilarGrid>
          ) : (
            <EmptyState
              icon={<span className="material-symbols-outlined" style={{ fontSize: '48px' }}>palette</span>}
              title="No Pets in This Collection"
              message={`There are no pets with ${selectedCategory.toLowerCase()} tones yet.`}
            />
          )}
        </CollectionsContainer>
      </Navigation>
    );
  }

  return (
    <Navigation>
      <CollectionsContainer>
        <Header>
          <Title>Visual Collections</Title>
          <Subtitle>
            Discover pets grouped by their beautiful colors
          </Subtitle>
        </Header>

        {sortedCollections.length > 0 ? (
          <CollectionsGrid>
            {sortedCollections.map(({ category, pets: collectionPets, color }) => (
              <CollectionCard key={category}>
                <CollectionHeader $color={color}>
                  <CollectionTitle>
                    <ColorDot $color={color} />
                    {category} Tones
                    <CollectionCount>{collectionPets.length} pets</CollectionCount>
                  </CollectionTitle>
                </CollectionHeader>
                <CollectionContent>
                  <CollectionGrid>
                    {collectionPets.slice(0, 8).map(pet => (
                      <CollectionImage
                        key={pet.id}
                        src={pet.url}
                        alt={pet.title}
                        loading="lazy"
                      />
                    ))}
                  </CollectionGrid>
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<span className="material-symbols-outlined" style={{ fontSize: '18px' }}>visibility</span>}
                    onClick={() => navigate(`/collections/${category.toLowerCase()}-tones`)}
                  >
                    Meet all {category} pets
                  </Button>
                </CollectionContent>
              </CollectionCard>
            ))}
          </CollectionsGrid>
        ) : (
          <EmptyState
            icon={<span className="material-symbols-outlined" style={{ fontSize: '48px' }}>palette</span>}
            title="No Collections Yet"
            message="We're still analyzing the colors in the pet images. Check back soon!"
          />
        )}
      </CollectionsContainer>
    </Navigation>
  );
};

export default VisualCollections;
