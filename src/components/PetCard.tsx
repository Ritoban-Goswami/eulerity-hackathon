import React from 'react';
import styled from 'styled-components';
import type { Pet } from '../types/pet';

interface PetCardProps {
  pet: Pet;
  isSelected: boolean;
  onToggleSelection: (pet: Pet) => void;
}

const Card = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 75%;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Checkbox = styled.input`
  position: absolute;
  top: 12px;
  left: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 2;
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const Description = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DateText = styled.span`
  font-size: 12px;
  color: #999;
`;

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const PetCard: React.FC<PetCardProps> = ({ pet, isSelected, onToggleSelection }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget && !(e.target as HTMLElement).classList.contains('card-content')) {
      return;
    }
    onToggleSelection(pet);
  };

  return (
    <Card onClick={handleCardClick}>
      <ImageContainer>
        <Image src={pet.url} alt={pet.title} loading="lazy" />
        <Checkbox
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggleSelection(pet);
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </ImageContainer>
      <Content className="card-content">
        <Title>{pet.title}</Title>
        <Description>{pet.description}</Description>
        <DateText>{formatDate(pet.created)}</DateText>
      </Content>
    </Card>
  );
};
