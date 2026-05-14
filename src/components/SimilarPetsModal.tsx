import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation, transitions } from '../theme';
import { PetCard } from './PetCard';
import type { Pet } from '../types/pet';

interface SimilarPetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPet: Pet;
  similarPets: Array<{ pet: Pet; similarity: number }>;
  onToggleSelection: (pet: Pet) => void;
  selectedIds: Set<string>;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${colors.inverseSurface}80;
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.md};
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @media (max-width: 767px) {
    padding: 0;
    align-items: flex-end;
  }
`;

const ModalContent = styled.div`
  background: ${colors.surface};
  border-radius: ${borderRadius.xl};
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${elevation.level3};
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @media (min-width: 768px) {
    padding: ${spacing.lg};
  }
  
  @media (max-width: 767px) {
    padding: ${spacing.md};
    padding-bottom: calc(${spacing.md} + env(safe-area-inset-bottom));
    max-height: 92vh;
    border-radius: ${borderRadius.xl} ${borderRadius.xl} 0 0;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  }
  
  @media (max-width: 480px) {
    padding: ${spacing.sm};
    padding-bottom: calc(${spacing.sm} + env(safe-area-inset-bottom));
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.sm};
  border-bottom: 1px solid ${colors.outlineVariant};
  
  @media (max-width: 767px) {
    margin-bottom: ${spacing.sm};
    padding-bottom: ${spacing.xs};
    padding-top: ${spacing.xs};
  }
`;

const TitleSection = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: ${typography.headline.large.fontSize};
    font-weight: ${typography.headline.large.fontWeight};
  }
  
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
  }
  
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.onSurfaceVariant};
  cursor: pointer;
  padding: ${spacing.sm};
  border-radius: ${borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.default};
  min-width: 44px;
  min-height: 44px;
  
  &:hover {
    background: ${colors.surfaceContainerHigh};
    color: ${colors.onSurface};
  }
  
  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
  
  @media (max-width: 767px) {
    padding: ${spacing.xs};
  }
`;

const TargetPetSection = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-bottom: ${spacing.xl};
  align-items: center;

  @media (min-width: 768px) {
    gap: ${spacing.lg};
  }

  @media (max-width: 767px) {
    flex-direction: column;
    text-align: center;
    gap: ${spacing.sm};
    margin-bottom: ${spacing.lg};
  }
`;

const TargetPetImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${borderRadius.lg};
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
  }
  
  @media (max-width: 767px) {
    width: 80px;
    height: 80px;
  }
`;

const TargetPetInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TargetPetTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.xs} 0;
  
  @media (min-width: 768px) {
    font-size: ${typography.headline.medium.fontSize};
    font-weight: ${typography.headline.medium.fontWeight};
  }
  
  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

const TargetPetDescription = styled.p`
  font-size: 13px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
  }
  
  @media (max-width: 767px) {
    font-size: 12px;
    max-width: 280px;
    margin: 0 auto;
  }
`;

const ColorPalette = styled.div`
  display: flex;
  gap: 6px;
  margin-top: ${spacing.xs};
  align-items: center;
  
  @media (max-width: 767px) {
    justify-content: center;
  }
`;

const ColorSwatch = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: ${borderRadius.full};
  background: ${props => props.$color};
  border: 2px solid ${colors.outlineVariant};
  box-shadow: ${elevation.level1};
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    width: 28px;
    height: 28px;
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
`;

const SimilarityScore = styled.div<{ $score: number }>`
  position: absolute;
  bottom: calc(33% + ${spacing.sm});
  left: ${spacing.sm};
  background: ${colors.surface}90;
  backdrop-filter: blur(4px);
  padding: 4px 8px;
  border-radius: ${borderRadius.full};
  font-size: 10px;
  font-weight: 600;
  font-family: ${typography.label.small.fontFamily};
  color: ${colors.onSurface};
  z-index: 10;
  
  @media (max-width: 767px) {
    padding: 3px 6px;
    font-size: 9px;
    bottom: calc(33% + ${spacing.xs});
    left: ${spacing.xs};
  }
`;


const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.xl} ${spacing.md};
  color: ${colors.onSurfaceVariant};
  
  @media (max-width: 767px) {
    padding: ${spacing.lg} ${spacing.sm};
  }
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${spacing.sm};
  opacity: 0.3;
  color: ${colors.onSurfaceVariant};
  
  @media (max-width: 767px) {
    font-size: 40px;
  }
`;

const EmptyTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.xs} 0;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const EmptyMessage = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-family: ${typography.body.small.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
  
  @media (max-width: 767px) {
    font-size: 13px;
    padding: 0 ${spacing.xs};
  }
`;

export const SimilarPetsModal: React.FC<SimilarPetsModalProps> = ({
  isOpen,
  onClose,
  targetPet,
  similarPets,
  onToggleSelection,
  selectedIds,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <TitleSection>
            <Title>Visually Similar Pets</Title>
            <Subtitle>Found {similarPets.length} pets with similar color palettes</Subtitle>
          </TitleSection>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>close</span>
          </CloseButton>
        </ModalHeader>

        <TargetPetSection>
          <TargetPetImage src={targetPet.url} alt={targetPet.title} />
          <TargetPetInfo>
            <TargetPetTitle>{targetPet.title}</TargetPetTitle>
            <TargetPetDescription>{targetPet.description}</TargetPetDescription>
            {targetPet.colorSignature && (
              <ColorPalette>
                {targetPet.colorSignature.palette.slice(0, 5).map((color, index) => (
                  <ColorSwatch
                    key={index}
                    $color={color}
                    title={color}
                  />
                ))}
              </ColorPalette>
            )}
          </TargetPetInfo>
        </TargetPetSection>

        {similarPets.length > 0 ? (
          <SimilarGrid>
            {similarPets.map(({ pet, similarity }) => (
              <div key={pet.id} style={{ position: 'relative' }}>
                <SimilarityScore $score={similarity}>
                  {Math.round((1 - similarity) * 100)}%
                </SimilarityScore>
                <PetCard
                  pet={pet}
                  isSelected={selectedIds.has(pet.id)}
                  onToggleSelection={onToggleSelection}
                  link={true}
                />
              </div>
            ))}
          </SimilarGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>
              <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>search_off</span>
            </EmptyIcon>
            <EmptyTitle>No Similar Pets Found</EmptyTitle>
            <EmptyMessage>
              We couldn't find any pets with a similar color palette.
            </EmptyMessage>
          </EmptyState>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};
