import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation, transitions, breakpoints } from '../theme';
import { Navigation } from '../components/Layout/Navigation';
import { PetCard } from '../components/PetCard';
import { FavoriteButton } from '../components/FavoriteButton';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { Button } from '../components/Button';
import { SelectionControls } from '../components/SelectionControls';
import { useSelection } from '../contexts/SelectionContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useDownload } from '../hooks/useDownload';
import { downloadPetImage } from '../utils/download';
import { getColorCategory } from '../utils/imageAnalysis';
import { fetchFileSize, formatFileSize } from '../utils/fileSize';
import { formatDate } from '../utils/date';
import { shareContent } from '../utils/share';
import type { Pet } from '../types/pet';

// Styled Components
const PetDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.lg};
  padding: ${spacing.sm};
  
  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 8fr 4fr;
    gap: ${spacing.lg};
    padding: ${spacing.lg};
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
  
  @media (max-width: ${breakpoints.tablet}) {
    aspect-ratio: 1/1;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  
  @media (min-width: ${breakpoints.tablet}) {
    grid-column: 2;
    gap: ${spacing.lg};
  }
`;

const PetName = styled.h1`
  font-size: 26px;
  font-weight: 700;
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.2;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.headline.large.fontSize};
    font-weight: ${typography.headline.large.fontWeight};
  }
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
  
  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.md};
    padding: ${spacing.md};
  }
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MetadataLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.onSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.label.small.fontSize};
    font-weight: ${typography.label.small.fontWeight};
  }
`;

const MetadataValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
  }
`;

const StorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  
  @media (min-width: ${breakpoints.tablet}) {
    gap: ${spacing.sm};
  }
`;

const StoryTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.onSurface};
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.headline.medium.fontSize};
    font-weight: ${typography.headline.medium.fontWeight};
  }
`;

const StoryText = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.5;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
    line-height: 1.6;
  }
`;

const ActionButtons = styled.div`
  display: none;
  flex-direction: row;
  justify-content: space-between;
  gap: ${spacing.sm};
  
  @media (min-width: ${breakpoints.tablet}) {
    display: flex;
  }
`;

const MobileActionButtons = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-top: ${spacing.md};
  justify-content: space-between;
  
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const CollectionSection = styled.div`
  margin-top: ${spacing.lg};
  padding: ${spacing.sm};
  
  @media (min-width: ${breakpoints.tablet}) {
    margin-top: ${spacing.xl};
    padding: 0;
  }
`;

const CollectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
  
  @media (min-width: ${breakpoints.tablet}) {
    align-items: flex-end;
    margin-bottom: ${spacing.lg};
  }
`;

const CollectionTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  width: 100%;
  
  @media (min-width: ${breakpoints.tablet}) {
    width: auto;
  }
`;

const CollectionSubtitle = styled.p`
  font-size: 13px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
  }
`;

const CollectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.onSurface};
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.headline.medium.fontSize};
    font-weight: ${typography.headline.medium.fontWeight};
  }
`;

const ViewAllLink = styled.a`
  color: ${colors.primary};
  font-size: 13px;
  font-weight: 500;
  font-family: ${typography.body.medium.fontFamily};
  text-decoration: none;
  white-space: nowrap;
  
  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const SimilarColorsButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md};
  background: ${colors.surfaceContainerLow};
  border: 1px solid ${colors.outlineVariant};
  border-radius: ${borderRadius.lg};
  cursor: pointer;
  transition: ${transitions.default};
  width: 100%;
  margin-top: ${spacing.md};

  &:hover {
    background: ${colors.surfaceContainerHover};
    border-color: ${colors.outline};
    transform: translateY(-1px);
    box-shadow: ${elevation.level1};
  }

  &:active {
    transform: translateY(0);
  }
`;

const SimilarColorsIcon = styled.div<{ $color?: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.md};
  background: ${props => props.$color ? `linear-gradient(135deg, ${props.$color}80, ${props.$color}40)` : colors.surfaceContainerHigh};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SimilarColorsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const SimilarColorsTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 2px 0;
`;

const SimilarColorsSubtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  font-family: ${typography.body.small.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
`;

const SimilarColorsArrow = styled.span`
  color: ${colors.onSurfaceVariant};
  font-size: 20px;
  display: flex
`;

const RelatedGrid = styled.div`
  display: grid;
  gap: ${spacing.sm};
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
const getExtendedPetData = (pet: Pet) => {
  // Generate some sample metadata based on the pet
  const metadata = {
    dateAdded: formatDate(pet.created),
    camera: 'Sony a7R IV',
    story: `${pet.title} is a wonderful pet with a unique personality. This adorable companion brings joy and happiness to everyone around. With their charming antics and loving nature, they've become an integral part of the family. Whether it's playtime in the park or cozy evenings at home, this pet knows how to make every moment special. Their favorite activities include playing with toys, exploring the outdoors, and spending quality time with their loved ones.`
  };


  return {
    ...pet,
    ...metadata
  };
};

const PetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pets, loading, selectedIds, selectedPets, selectedCount, totalFileSize, toggleSelection, clearSelection, selectAll } = useSelection();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isDownloading, handleDownload } = useDownload();
  const [resolution, setResolution] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');

  const pet = useMemo(() => {
    const foundPet = pets.find(p => p.id === id);
    return foundPet ? getExtendedPetData(foundPet) : null;
  }, [pets, id]);

  useEffect(() => {
    if (!pet) return;

    const imageUrl = pet.originalUrl || pet.url;

    // Load image to get resolution
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setResolution(`${img.naturalWidth} x ${img.naturalHeight} px`);
    };
    img.src = imageUrl;

    // Fetch file size using existing utility
    fetchFileSize(imageUrl).then(bytes => {
      setFileSize(formatFileSize(bytes));
    });
  }, [pet]);

  const relatedPets = useMemo(() => {
    if (!pet || pets.length <= 1) return [];

    const others = pets.filter(p => p.id !== pet.id);
    // eslint-disable-next-line react-hooks/purity
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [pet, pets]);

  const handleDownloadSelected = () => {
    handleDownload(selectedPets);
  };

  const handleSelectAllRelated = () => {
    selectAll(relatedPets);
  };

  const handleDownloadSingle = async () => {
    if (!pet) return;
    await downloadPetImage(pet);
  };

  const handleFavorite = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (pet) {
      toggleFavorite(pet.id);
    }
  };

  const handleShare = async () => {
    await shareContent({
      title: pet?.title,
      text: pet?.description
    });
  };

  const handleViewSimilarColors = () => {
    if (pet?.colorSignature) {
      const category = getColorCategory(pet.colorSignature.dominantColor);
      navigate(`/collections/${category.toLowerCase()}-tones`);
    } else {
      navigate(`/collections/neutral-tones`);
    }
  };

  if (loading) {
    return (
      <Navigation>
        <div>
          <LoadingSkeleton variant="petDetail" />
        </div>
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
            <Button variant="secondary" size="lg" icon={<span className="material-symbols-outlined" style={{ fontSize: '20px' }}>share</span>} onClick={handleShare} fullWidth>
              Share
            </Button>
            <Button variant="primary" size="lg" icon={<span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>} onClick={handleDownloadSingle} fullWidth>
              Download
            </Button>
          </MobileActionButtons>
        </ImageSection>

        <InfoSection>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm }}>
            <PetName>{pet.title}</PetName>
            <div
              onClick={handleFavorite}
              style={{
                background: colors.surfaceContainer,
                borderRadius: borderRadius.full,
                padding: spacing.sm,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FavoriteButton
                isFavorite={isFavorite(pet.id)}
                onClick={handleFavorite}
                ariaLabel={isFavorite(pet.id) ? 'Remove from favorites' : 'Add to favorites'}
                variant="inline"
              />
            </div>
          </div>

          <MetadataGrid>
            <MetadataItem>
              <MetadataLabel>Date Added</MetadataLabel>
              <MetadataValue>{pet.dateAdded}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Resolution</MetadataLabel>
              <MetadataValue>{resolution || 'Loading...'}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>File Size</MetadataLabel>
              <MetadataValue>{fileSize || 'Loading...'}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Camera</MetadataLabel>
              <MetadataValue>{pet.camera}</MetadataValue>
            </MetadataItem>
          </MetadataGrid>

          <StorySection>
            <StoryTitle>About</StoryTitle>
            <StoryText>{pet.story}</StoryText>
          </StorySection>

          <SimilarColorsButton onClick={handleViewSimilarColors}>
            <SimilarColorsIcon $color={pet.colorSignature?.dominantColor}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: colors.onSurface }}>
                auto_awesome
              </span>
            </SimilarColorsIcon>
            <SimilarColorsContent>
              <SimilarColorsTitle>Discover Similar Pets</SimilarColorsTitle>
              <SimilarColorsSubtitle>
                If you love {pet.title}, you'll adore these pets too
              </SimilarColorsSubtitle>
            </SimilarColorsContent>
            <SimilarColorsArrow>
              <span className="material-symbols-outlined">arrow_forward</span>
            </SimilarColorsArrow>
          </SimilarColorsButton>

          <ActionButtons>
            <Button variant="secondary" size="lg" icon={<span className="material-symbols-outlined" style={{ fontSize: '24px' }}>share</span>} onClick={handleShare}>
              Share
            </Button>
            <Button variant="primary" size="lg" icon={<span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>} onClick={handleDownloadSingle}>
              Download
            </Button>
          </ActionButtons>
        </InfoSection>
      </PetDetailContainer>

      {relatedPets.length > 0 && (
        <CollectionSection>
          <CollectionHeader>
            <CollectionTitleSection>
              <CollectionTitle>Check out these beautiful souls too</CollectionTitle>
              <CollectionSubtitle>More adorable pets waiting to meet you</CollectionSubtitle>
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

      <SelectionControls
        selectedCount={selectedCount}
        totalFileSize={totalFileSize}
        onClearSelection={clearSelection}
        onDownload={handleDownloadSelected}
        isDownloading={isDownloading}
        onSelectAll={handleSelectAllRelated}
        totalItems={relatedPets.length}
      />
    </Navigation>
  );
};

export default PetDetail;
