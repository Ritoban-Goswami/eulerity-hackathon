import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation, transitions, aspectRatios } from '../theme';
import type { Pet } from '../types/pet';

interface PetCardProps {
  pet: Pet;
  isSelected: boolean;
  onToggleSelection: (pet: Pet) => void;
  link?: boolean;
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
  border: 2px solid transparent;

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
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.3);
  transition: ${transitions.default};
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:checked {
    background: ${colors.primary};
    border-color: ${colors.primary};
  }

  &:checked::after {
    content: '✓';
    color: ${colors.onPrimary};
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent, transparent);
  opacity: 0;
  transition: ${transitions.fadeIn};
  display: flex;
  align-items: flex-end;
  padding: ${spacing.md};
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const QuickViewButton = styled.button`
  color: ${colors.onPrimary};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  padding: ${spacing.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.primary};
`;

const BreedBadge = styled.span`
  background: ${colors.primary}10;
  color: ${colors.primary};
  font-size: 10px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: ${borderRadius.full};
  letter-spacing: 0.05em;
`;

const Description = styled.p`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  line-height: ${typography.body.medium.lineHeight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Metadata = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${typography.label.small.fontSize};
  font-weight: ${typography.label.small.fontWeight};
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.outline};
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

export const PetCard: React.FC<PetCardProps> = React.memo(({ pet, isSelected, onToggleSelection, link = false }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget && !(e.target as HTMLElement).classList.contains('card-content')) {
      return;
    }
    if (!link) {
      onToggleSelection(pet);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement quick view modal
    console.log('Quick view:', pet.id);
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
        <Overlay>
          <QuickViewButton onClick={handleQuickView}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
            Quick View
          </QuickViewButton>
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
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
            {formatDate(pet.created)}
          </MetadataItem>
          <MetadataItem>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>photo_camera</span>
            {fileSize}
          </MetadataItem>
        </Metadata>
      </Content>
    </>
  );

  if (link) {
    return (
      <Link to={`/pet/${pet.id}`} style={{ textDecoration: 'none' }}>
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
