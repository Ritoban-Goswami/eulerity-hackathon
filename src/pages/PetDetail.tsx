import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  colors,
  typography,
  spacing,
  borderRadius,
  elevation,
  transitions,
  breakpoints
} from '../theme';
import { Navigation } from '../components/Layout/Navigation';
import { PetCard } from '../components/PetCard';
import { useSelection } from '../contexts/SelectionContext';

// Styled Components
const PetDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  padding-top: ${spacing.lg};
  
  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 8fr 4fr;
  }
`;

const ImageSection = styled.div`
  @media (min-width: ${breakpoints.tablet}) {
    grid-column: 1;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: ${borderRadius.lg};
  box-shadow: ${elevation.level2};
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  
  @media (min-width: ${breakpoints.tablet}) {
    grid-column: 2;
  }
`;

const PetName = styled.h1`
  font-size: ${typography.headline.large.fontSize};
  font-weight: ${typography.headline.large.fontWeight};
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
`;

const TagContainer = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: ${spacing.xs} ${spacing.sm};
  background: ${colors.primaryContainer};
  color: ${colors.onPrimaryContainer};
  border-radius: ${borderRadius.full};
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: ${colors.surfaceContainer};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.outlineVariant}20;
  box-shadow: ${elevation.level1};
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MetadataLabel = styled.span`
  font-size: ${typography.label.small.fontSize};
  font-weight: ${typography.label.small.fontWeight};
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.onSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const MetadataValue = styled.span`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
`;

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  font-size: ${typography.label.small.fontSize};
  font-weight: ${typography.label.small.fontWeight};
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin-bottom: ${spacing.sm};
`;

const BreadcrumbLink = styled.a`
  color: ${colors.onSurfaceVariant};
  text-decoration: none;
  
  &:hover {
    color: ${colors.primary};
  }
`;

const BreadcrumbSeparator = styled.span`
  color: ${colors.onSurfaceVariant};
  font-size: 14px;
`;

const BreadcrumbCurrent = styled.span`
  color: ${colors.primary};
  font-weight: ${typography.label.small.fontWeight};
`;

const StorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const StoryTitle = styled.h2`
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.onSurface};
`;

const StoryText = styled.p`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: none;
  flex-direction: column;
  gap: ${spacing.sm};
  
  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
  }
`;

const MobileActionButtons = styled.div`
  display: flex;
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
  
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.lg};
  border: none;
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  cursor: pointer;
  transition: ${transitions.default};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  
  background: ${props => props.variant === 'primary' ? colors.primary : colors.surfaceContainerHigh};
  color: ${props => props.variant === 'primary' ? colors.onPrimary : colors.onSurface};
  
  &:hover {
    background: ${props => props.variant === 'primary' ? colors.primary : colors.surfaceContainerHover};
    transform: translateY(-1px);
    box-shadow: ${elevation.level1};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CollectionSection = styled.div`
  margin-top: ${spacing.xl};
`;

const CollectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${spacing.lg};
`;

const CollectionTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const CollectionSubtitle = styled.p`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
`;

const CollectionTitle = styled.h2`
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.onSurface};
`;

const ViewAllLink = styled.a`
  color: ${colors.primary};
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RelatedGrid = styled.div`
  display: grid;
  gap: ${spacing.md};
  align-items: stretch;

  /* Mobile: 1 column */
  grid-template-columns: 1fr;

  /* Tablet: 2 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.md};
  }

  /* Desktop: 3 columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacing.md};
  }

  /* Large desktop: 4 columns */
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// Sample extended pet data - in real app, this would come from API
const getExtendedPetData = (pet: any) => {
  // Generate some sample metadata based on the pet
  const metadata = {
    dateAdded: new Date(pet.created).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    resolution: '4000 x 5000 px',
    fileSize: '4.8 MB',
    camera: 'Sony a7R IV',
    story: `${pet.title} is a wonderful pet with a unique personality. This adorable companion brings joy and happiness to everyone around. With their charming antics and loving nature, they've become an integral part of the family. Whether it's playtime in the park or cozy evenings at home, this pet knows how to make every moment special. Their favorite activities include playing with toys, exploring the outdoors, and spending quality time with their loved ones.`
  };

  // Extract breed from description or use a default
  const breedGuess = pet.description.includes('Golden') ? 'Golden Retriever' :
    pet.description.includes('Lab') ? 'Labrador' :
      pet.description.includes('Cat') ? 'Persian' :
        pet.description.includes('Beagle') ? 'Beagle' : 'Mixed Breed';

  return {
    ...pet,
    breed: breedGuess,
    type: pet.title.toLowerCase().includes('cat') ? 'Cat' : 'Dog',
    ...metadata
  };
};

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pets, loading, selectedIds, toggleSelection } = useSelection();
  const [isFavorited, setIsFavorited] = useState(false);

  const pet = useMemo(() => {
    const foundPet = pets.find(p => p.id === id);
    return foundPet ? getExtendedPetData(foundPet) : null;
  }, [pets, id]);

  const relatedPets = useMemo(() => {
    if (!pet || pets.length <= 1) return [];

    const others = pets.filter(p => p.id !== pet.id);
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [pet, pets]);

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading original image...');
    const link = document.createElement('a');
    link.href = pet?.url || '';
    link.download = `${pet?.title || 'pet'}-original.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pet?.title,
          text: pet?.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Navigation>
        <div style={{ padding: spacing.xl }}>Loading...</div>
      </Navigation>
    );
  }

  if (!pet) {
    return (
      <Navigation>
        <div style={{ padding: spacing.xl }}>Pet not found</div>
      </Navigation>
    );
  }


  return (
    <Navigation>
      <PetDetailContainer>
        <ImageSection>
          <MainImage src={pet.originalUrl || pet.url} alt={pet.title} />
          <MobileActionButtons>
            <ActionButton variant="primary" onClick={handleDownload} style={{ flex: 1 }}>
              <span className="material-symbols-outlined">download</span>
              Download
            </ActionButton>
            <ActionButton variant="secondary" onClick={handleFavorite} style={{ flex: 1 }}>
              <span className="material-symbols-outlined">
                {isFavorited ? 'favorite' : 'favorite_border'}
              </span>
              Favorite
            </ActionButton>
            <ActionButton variant="secondary" onClick={handleShare} style={{ width: '48px' }}>
              <span className="material-symbols-outlined">share</span>
            </ActionButton>
          </MobileActionButtons>
        </ImageSection>

        <InfoSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
            <BreadcrumbNav>
              <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Gallery</BreadcrumbLink>
              <BreadcrumbSeparator className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</BreadcrumbSeparator>
              <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); }}>{pet.type}s</BreadcrumbLink>
              <BreadcrumbSeparator className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</BreadcrumbSeparator>
              <BreadcrumbCurrent>{pet.breed}</BreadcrumbCurrent>
            </BreadcrumbNav>
            <PetName>{pet.title}</PetName>
            <TagContainer>
              <Tag>{pet.type}</Tag>
              <Tag>{pet.breed}</Tag>
            </TagContainer>
          </div>

          <MetadataGrid>
            <MetadataItem>
              <MetadataLabel>Date Added</MetadataLabel>
              <MetadataValue>{pet.dateAdded}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Resolution</MetadataLabel>
              <MetadataValue>{pet.resolution}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>File Size</MetadataLabel>
              <MetadataValue>{pet.fileSize}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Camera</MetadataLabel>
              <MetadataValue>{pet.camera}</MetadataValue>
            </MetadataItem>
          </MetadataGrid>

          <StorySection>
            <StoryTitle>Story</StoryTitle>
            <StoryText>{pet.story}</StoryText>
          </StorySection>

          <ActionButtons>
            <ActionButton variant="primary" onClick={handleDownload}>
              <span className="material-symbols-outlined">download</span>
              Download Original
            </ActionButton>
            <div style={{ display: 'flex', gap: spacing.sm }}>
              <ActionButton variant="secondary" onClick={handleFavorite} style={{ flex: 1 }}>
                <span className="material-symbols-outlined">
                  {isFavorited ? 'favorite' : 'favorite_border'}
                </span>
                {isFavorited ? 'Favorited' : 'Favorite'}
              </ActionButton>
              <ActionButton variant="secondary" onClick={handleShare} style={{ flex: 1 }}>
                <span className="material-symbols-outlined">share</span>
                Share
              </ActionButton>
            </div>
          </ActionButtons>
        </InfoSection>
      </PetDetailContainer>

      {relatedPets.length > 0 && (
        <CollectionSection>
          <CollectionHeader>
            <CollectionTitleSection>
              <CollectionTitle>More from this Collection</CollectionTitle>
              <CollectionSubtitle>Explore the full Golden Hour series.</CollectionSubtitle>
            </CollectionTitleSection>
            <ViewAllLink href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              View All
            </ViewAllLink>
          </CollectionHeader>
          <RelatedGrid>
            {relatedPets.map((relatedPet) => (
              <PetCard
                key={relatedPet.id}
                pet={relatedPet}
                isSelected={selectedIds.has(relatedPet.id)}
                onToggleSelection={toggleSelection}
                link={true}
              />
            ))}
          </RelatedGrid>
        </CollectionSection>
      )}
    </Navigation>
  );
};

export default PetDetail;
