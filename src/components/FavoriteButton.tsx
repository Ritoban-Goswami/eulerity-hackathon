import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { colors, spacing, borderRadius, transitions } from '../theme';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: (e?: React.MouseEvent) => void;
  ariaLabel: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'overlay' | 'inline';
}

const heartBeat = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const Button = styled.button<{ $isFavorite: boolean; $size: 'small' | 'medium' | 'large' }>`
  position: absolute;
  top: ${spacing.sm};
  left: ${spacing.sm};
  width: ${props => props.$size === 'small' ? '32px' : props.$size === 'medium' ? '40px' : '48px'};
  height: ${props => props.$size === 'small' ? '32px' : props.$size === 'medium' ? '40px' : '48px'};
  border-radius: ${borderRadius.full};
  background: transparent;
  border: none;
  color: ${props => props.$isFavorite ? colors.error : colors.onSurface};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.default};
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  span {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    font-variation-settings: ${props => props.$isFavorite ? "'FILL' 1" : "'FILL' 0"};
    font-size: ${props => props.$size === 'small' ? '18px' : props.$size === 'medium' ? '24px' : '28px'};
  }

  ${props => props.$isFavorite && css`
    span {
      transform: scale(1.2);
      animation: ${heartBeat} 0.5s ease-in-out;
    }
  `}
`;

const InlineButton = styled.button<{ $isFavorite: boolean }>`
  background: transparent;
  border: none;
  color: ${props => props.$isFavorite ? colors.error : colors.onSurface};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${transitions.default};
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  span {
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    font-variation-settings: ${props => props.$isFavorite ? "'FILL' 1" : "'FILL' 0"};
    font-size: 24px;
  }

  ${props => props.$isFavorite && css`
    span {
      transform: scale(1.2);
      animation: ${heartBeat} 0.5s ease-in-out;
    }
  `}
`;

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  ariaLabel,
  size = 'medium',
  variant = 'overlay'
}) => {
  if (variant === 'inline') {
    return (
      <InlineButton
        $isFavorite={isFavorite}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <span className="material-symbols-outlined">favorite</span>
      </InlineButton>
    );
  }

  return (
    <Button
      $isFavorite={isFavorite}
      $size={size}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className="material-symbols-outlined">favorite</span>
    </Button>
  );
};
