import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation, transitions, aspectRatios } from '../theme';
import type { Pet } from '../types/pet';
import { FavoriteButton } from './FavoriteButton';
import { useFavorites } from '../contexts/FavoritesContext';
import { getColorCategory } from '../utils/imageAnalysis';

interface PetCardProps {
  pet: Pet;
  isSelected: boolean;
  onToggleSelection: (pet: Pet) => void;
  link?: boolean;
  colorAnalysisLoading?: boolean;
}

const Card = styled.article<{ $isSelected?: boolean }>`
  position: relative;
  background: ${colors.surfaceContainerLowest};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  box-shadow: ${elevation.level1};
  transition: ${transitions.hover};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid ${colors.outlineVariant};

  ${props => props.$isSelected && `
    border-color: ${colors.primary};
    box-shadow: 0 0 0 4px ${colors.primary}20;
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${elevation.level2};
  }

  &:focus-within {
    outline: none;
  }

  @media (max-width: 767px) {
    &:hover {
      transform: none;
      box-shadow: ${elevation.level1};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: ${aspectRatios.petCard};
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${transitions.imageZoom};
  
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Checkbox = styled.input`
  position: absolute;
  top: ${spacing.sm};
  right: ${spacing.sm};
  width: 28px;
  height: 28px;
  cursor: pointer;
  z-index: 10;
  border-radius: ${borderRadius.full};
  border: 2px solid ${colors.surfaceContainerLowest}80;
  background: ${colors.inverseSurface}4D;
  transition: ${transitions.default};
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 768px) {
    width: 28px;
    height: 28px;
  }

  &:checked {
    background: ${colors.primary};
    border-color: ${colors.primary};
  }

  &:checked::after {
    content: '✓';
    color: ${colors.onPrimary};
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media (min-width: 768px) {
      font-size: 18px;
    }
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, ${colors.inverseSurface}99, transparent, transparent);
  opacity: 0;
  transition: ${transitions.fadeIn};
  display: flex;
  align-items: flex-end;
  padding: ${spacing.sm};
  pointer-events: none;

  @media (min-width: 768px) {
    padding: ${spacing.md};
  }

  ${Card}:hover & {
    opacity: 1;
  }

  @media (max-width: 767px) {
    opacity: 0;
  }

  @media (hover: none) {
    opacity: 0;
  }
`;

const ColorIndicator = styled.div<{ $color: string; $loading?: boolean }>`
  position: absolute;
  bottom: ${spacing.sm};
  right: ${spacing.sm};
  width: 24px;
  height: 24px;
  border-radius: ${borderRadius.full};
  background: ${props => props.$color}70;
  border: 2px solid ${props => props.$color}80;
  box-shadow: ${elevation.level1};
  z-index: 5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.default};
  pointer-events: auto;

  ${props => props.$loading && `
    &::before {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: ${borderRadius.full};
      border: 2px solid transparent;
      border-top-color: ${colors.primary};
      animation: spin 1s linear infinite;
    }
  `}

  &:hover {
    transform: scale(1.1);
    box-shadow: ${elevation.level2};
  }

  @media (min-width: 768px) {
    width: 28px;
    height: 28px;
    bottom: ${spacing.md};
    right: ${spacing.md};
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ColorIcon = styled.span`
  color: ${colors.surfaceContainerLowest};
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing.md};
  align-items: center;
`;


const Content = styled.div`
  padding: ${spacing.sm};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
  @media (min-width: 768px) {
    padding: ${spacing.sm};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.primary};
  line-height: 1.3;
  
  @media (min-width: 768px) {
    font-size: ${typography.headline.medium.fontSize};
    font-weight: ${typography.headline.medium.fontWeight};
  }
`;

const BreedBadge = styled.span`
  background: ${colors.primary}10;
  color: ${colors.primary};
  font-size: 9px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: ${borderRadius.full};
  letter-spacing: 0.05em;
  white-space: nowrap;
  
  @media (min-width: 768px) {
    font-size: 10px;
    padding: 2px 8px;
  }
`;

const Description = styled.p`
  font-size: 13px;
  font-weight: 400;
  font-family: ${typography.body.small.fontFamily};
  color: ${colors.onSurfaceVariant};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.small.fontSize};
    font-weight: ${typography.body.small.fontWeight};
    line-height: ${typography.body.small.lineHeight};
  }
`;

const Metadata = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.outline};
  margin-top: 8px;
  
  @media (min-width: 768px) {
    font-size: ${typography.label.small.fontSize};
    font-weight: ${typography.label.small.fontWeight};
    margin-top: 8px;
  }
`;

const MetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const extractBreed = (title: string) => {
  // Simple breed extraction - in real app, this would come from the data
  const breeds = ['Golden Retriever', 'Tabby', 'Bulldog', 'Persian', 'Siamese', 'Poodle', 'Labrador'];
  const found = breeds.find(breed => title.toLowerCase().includes(breed.toLowerCase()));
  return found || 'Unknown';
};

const formatFileSize = (petId: string) => {
  // Mock file size - in real app, this would come from the data
  // Use petId to generate consistent "random" size
  const sizes = ['20MP', '24MP', '42MP', '61MP'];
  const hash = petId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return sizes[Math.abs(hash) % sizes.length];
};

export const PetCard: React.FC<PetCardProps> = React.memo(({ pet, isSelected, onToggleSelection, link = false, colorAnalysisLoading = false }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCardClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget && !(e.target as HTMLElement).classList.contains('card-content')) {
      return;
    }
    if (!link) {
      onToggleSelection(pet);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(pet.id);
  };

  const handleFindSimilar = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (pet.colorSignature) {
      const category = getColorCategory(pet.colorSignature.dominantColor);
      navigate(`/collections/${category.toLowerCase()}-tones`);
    } else {
      navigate(`/collections/neutral-tones`);
    }
  };

  const breed = extractBreed(pet.title);
  const fileSize = formatFileSize(pet.id);

  const cardContent = (
    <>
      <ImageContainer>
        <Image
          src={pet.url}
          alt={pet.description}
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
        />
        <FavoriteButton
          isFavorite={isFavorite(pet.id)}
          onClick={handleFavorite}
          ariaLabel={isFavorite(pet.id) ? `Remove ${pet.title} from favorites` : `Add ${pet.title} to favorites`}
        />
        <Checkbox
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelection(pet);
          }}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Select ${pet.title}`}
          aria-checked={isSelected}
        />
        <ColorIndicator
          $color={pet.colorSignature?.dominantColor || '#808080'}
          $loading={colorAnalysisLoading && !pet.colorSignature}
          onClick={handleFindSimilar}
          title={pet.colorSignature ? "Find Similar" : "Analyzing colors..."}
        >
          <ColorIcon className="material-symbols-outlined">auto_awesome</ColorIcon>
        </ColorIndicator>
        <Overlay>
          <ActionButtons>
          </ActionButtons>
        </Overlay>
      </ImageContainer>
      <Content className="card-content">
        <Header>
          <Title>{pet.title}</Title>
          <BreedBadge>{breed.replace(' ', '')}</BreedBadge>
        </Header>
        <Description>{pet.description}</Description>
        <Metadata>
          <MetadataItem>
            <span className="material-symbols-outlined" style={{ fontSize: typography.label.small.fontSize }}>calendar_today</span>
            {formatDate(pet.created)}
          </MetadataItem>
          <MetadataItem>
            <span className="material-symbols-outlined" style={{ fontSize: typography.label.small.fontSize }}>photo_camera</span>
            {fileSize}
          </MetadataItem>
        </Metadata>
      </Content>
    </>
  );

  if (link) {
    return (
      <Link to={`/pet/${pet.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <Card onClick={handleCardClick} $isSelected={isSelected}>
          {cardContent}
        </Card>
      </Link>
    );
  }

  return (
    <Card onClick={handleCardClick} $isSelected={isSelected}>
      {cardContent}
    </Card>
  );
});
