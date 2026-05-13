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
  align-items: flex-end;
  justify-content: center;
  padding: ${spacing.sm};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: ${transitions.fadeIn};

  @media (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    align-items: center;
    padding: ${spacing.lg};
  }

  @media (min-width: 1024px) {
    align-items: center;
    padding: ${spacing.xl};
  }
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  background: ${colors.surface};
  border-radius: ${borderRadius.xl} ${borderRadius.xl} 0 0;
  max-width: 900px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: ${elevation.level3};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.3s ease, opacity 0.3s ease;

  @media (min-width: 768px) and (max-width: 1023px) {
    border-radius: ${borderRadius.xl};
    max-width: 700px;
    max-height: 85vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    overflow: hidden;
    transform: ${props => props.$isOpen ? 'scale(1)' : 'scale(0.95)'};
  }

  @media (min-width: 1024px) {
    border-radius: ${borderRadius.xl};
    max-height: 90vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    overflow: hidden;
    transform: ${props => props.$isOpen ? 'scale(1)' : 'scale(0.9)'};
  }
`;

const ImageSection = styled.div`
  background: ${colors.surfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  max-height: 300px;
  overflow: hidden;

  @media (min-width: 768px) {
    min-height: auto;
    max-height: none;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${borderRadius.lg} 0 0 ${borderRadius.lg};
`;

const ContentSection = styled.div`
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: ${spacing.md};
    gap: ${spacing.md};
  }

  @media (min-width: 1024px) {
    padding: ${spacing.lg};
    gap: ${spacing.md};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${spacing.sm};
  right: ${spacing.sm};
  width: 36px;
  height: 36px;
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

  @media (min-width: 768px) and (max-width: 1023px) {
    top: ${spacing.md};
    right: ${spacing.md};
    width: 38px;
    height: 38px;
  }

  @media (min-width: 1024px) {
    top: ${spacing.md};
    right: ${spacing.md};
    width: 40px;
    height: 40px;
  }

  &:hover {
    background: ${colors.surfaceContainerHover};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.primary};
  margin: 0;
  line-height: 1.2;
  
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 22px;
  }

  @media (min-width: 1024px) {
    font-size: ${typography.headline.large.fontSize};
    font-weight: ${typography.headline.large.fontWeight};
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: ${spacing.sm};
  flex-wrap: wrap;
`;

const Badge = styled.span`
  padding: 4px 10px;
  background: ${colors.primaryContainer};
  color: ${colors.onPrimaryContainer};
  border-radius: ${borderRadius.full};
  font-size: 11px;
  font-weight: 600;
  font-family: ${typography.label.small.fontFamily};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 4px 12px;
    font-size: 11px;
  }

  @media (min-width: 1024px) {
    padding: ${spacing.xs} ${spacing.sm};
    font-size: ${typography.label.small.fontSize};
    font-weight: ${typography.label.small.fontWeight};
  }
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  line-height: 1.5;
  margin: 0;
  
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
    line-height: 1.5;
  }

  @media (min-width: 1024px) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
    line-height: 1.6;
  }
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.sm};
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.surfaceContainer};
  border-radius: ${borderRadius.lg};
  
  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 768px) and (max-width: 1023px) {
    gap: ${spacing.sm};
    padding: ${spacing.sm} ${spacing.md};
  }

  @media (min-width: 1024px) {
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
  font-size: 10px;
  font-weight: 600;
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.onSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 10px;
  }

  @media (min-width: 1024px) {
    font-size: ${typography.label.small.fontSize};
    font-weight: ${typography.label.small.fontWeight};
  }
`;

const MetadataValue = styled.span`
  font-size: 13px;
  font-weight: 500;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 13px;
  }

  @media (min-width: 1024px) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing.sm};
  margin-top: auto;
  padding-top: ${spacing.md};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 10px 16px;
  border-radius: ${borderRadius.lg};
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: ${typography.label.medium.fontFamily};
  cursor: pointer;
  transition: ${transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs};
  min-height: 44px;

  background: ${props => props.variant === 'primary' ? colors.primary : colors.surfaceContainerHigh};
  color: ${props => props.variant === 'primary' ? colors.onPrimary : colors.onSurface};

  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 10px 16px;
    font-size: 14px;
  }

  @media (min-width: 1024px) {
    padding: ${spacing.sm} ${spacing.md};
    font-size: ${typography.label.medium.fontSize};
    font-weight: ${typography.label.medium.fontWeight};
  }

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
