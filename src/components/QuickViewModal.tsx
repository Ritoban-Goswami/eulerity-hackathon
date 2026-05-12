import React, { useEffect } from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation, transitions, zIndex } from '../theme';
import type { Pet } from '../types/pet';

interface QuickViewModalProps {
  pet: Pet;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: ${colors.inverseSurface}80;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: ${zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.md};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: ${transitions.fadeIn};

  @media (min-width: 768px) {
    padding: ${spacing.xl};
  }
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  background: ${colors.surface};
  border-radius: ${borderRadius.xl};
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${elevation.level3};
  transform: ${props => props.$isOpen ? 'scale(1)' : 'scale(0.9)'};
  transition: transform 0.3s ease, opacity 0.3s ease;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    overflow: hidden;
  }
`;

const ImageSection = styled.div`
  background: ${colors.surfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;

  @media (min-width: 768px) {
    min-height: auto;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${borderRadius.lg};
`;

const ContentSection = styled.div`
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${spacing.md};
  right: ${spacing.md};
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.full};
  background: ${colors.surfaceContainerHigh};
  border: none;
  color: ${colors.onSurface};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.default};
  z-index: 1;

  &:hover {
    background: ${colors.surfaceContainerHover};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Title = styled.h2`
  font-size: ${typography.headline.large.fontSize};
  font-weight: ${typography.headline.large.fontWeight};
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.primary};
  margin: 0;
  line-height: 1.2;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: ${spacing.xs} ${spacing.sm};
  background: ${colors.primaryContainer};
  color: ${colors.onPrimaryContainer};
  border-radius: ${borderRadius.full};
  font-size: ${typography.label.small.fontSize};
  font-weight: ${typography.label.small.fontWeight};
  font-family: ${typography.label.small.fontFamily};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Description = styled.p`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.6;
  margin: 0;
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  padding: ${spacing.md};
  background: ${colors.surfaceContainer};
  border-radius: ${borderRadius.lg};
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

const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing.sm};
  margin-top: auto;
  padding-top: ${spacing.md};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
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
  justify-content: center;
  gap: ${spacing.xs};

  background: ${props => props.variant === 'primary' ? colors.primary : colors.surfaceContainerHigh};
  color: ${props => props.variant === 'primary' ? colors.onPrimary : colors.onSurface};

  &:hover {
    background: ${props => props.variant === 'primary' ? colors.primaryContainer : colors.surfaceContainerHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const extractBreed = (title: string) => {
  const breeds = ['Golden Retriever', 'Tabby', 'Bulldog', 'Persian', 'Siamese', 'Poodle', 'Labrador', 'Beagle'];
  const found = breeds.find(breed => title.toLowerCase().includes(breed.toLowerCase()));
  return found || 'Mixed Breed';
};

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ pet, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const breed = extractBreed(pet.title);
  const petType = pet.title.toLowerCase().includes('cat') ? 'Cat' : 'Dog';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pet.url;
    link.download = `${pet.title.replace(/[^a-z0-9]/gi, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleBackdropClick}>
      <ModalContainer $isOpen={isOpen}>
        <CloseButton onClick={onClose} aria-label="Close modal">
          <span className="material-symbols-outlined">close</span>
        </CloseButton>

        <ImageSection>
          <ModalImage src={pet.originalUrl || pet.url} alt={pet.title} />
        </ImageSection>

        <ContentSection>
          <div>
            <BadgeContainer style={{ marginBottom: spacing.sm }}>
              <Badge>{petType}</Badge>
              <Badge>{breed}</Badge>
            </BadgeContainer>
            <Title>{pet.title}</Title>
          </div>

          <Description>{pet.description}</Description>

          <MetadataGrid>
            <MetadataItem>
              <MetadataLabel>Date Added</MetadataLabel>
              <MetadataValue>{formatDate(pet.created)}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Type</MetadataLabel>
              <MetadataValue>{petType}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>Breed</MetadataLabel>
              <MetadataValue>{breed}</MetadataValue>
            </MetadataItem>
            <MetadataItem>
              <MetadataLabel>ID</MetadataLabel>
              <MetadataValue>{pet.id}</MetadataValue>
            </MetadataItem>
          </MetadataGrid>

          <ActionButtons>
            <ActionButton variant="primary" onClick={handleDownload}>
              <span className="material-symbols-outlined">download</span>
              Download
            </ActionButton>
            <ActionButton variant="secondary" onClick={onClose}>
              <span className="material-symbols-outlined">close</span>
              Close
            </ActionButton>
          </ActionButtons>
        </ContentSection>
      </ModalContainer>
    </ModalOverlay>
  );
};
