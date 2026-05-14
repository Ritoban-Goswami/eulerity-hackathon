import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { colors, typography, spacing, borderRadius } from '../theme';

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div<{ $hasBackground?: boolean }>`
  text-align: center;
  padding: ${props => props.$hasBackground ? `${spacing.lg} ${spacing.md}` : '60px 20px'};
  ${props => props.$hasBackground && `
    background: ${colors.surfaceContainer};
    border-radius: ${borderRadius.xl};
    border: 1px solid ${colors.outlineVariant}20;
  `}
  
  @media (min-width: 768px) {
    padding: ${props => props.$hasBackground ? `${spacing.xl} ${spacing.lg}` : '60px 20px'};
  }
`;

const Icon = styled.div<{ $animate?: boolean }>`
  font-size: 40px;
  margin-bottom: ${spacing.sm};
  color: ${colors.primary};
  ${props => props.$animate && css`
    animation: ${float} 3s ease-in-out infinite;
  `}
  
  @media (min-width: 768px) {
    font-size: 64px;
    margin-bottom: ${spacing.lg};
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0 0 ${spacing.sm} 0;
  
  @media (min-width: 768px) {
    font-size: ${typography.headline.large.fontSize};
    font-weight: ${typography.headline.large.fontWeight};
  }
`;

const Message = styled.p`
  font-size: 13px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 768px) {
    font-size: ${typography.body.large.fontSize};
    font-weight: ${typography.body.large.fontWeight};
  }
`;

const ActionButton = styled.button`
  margin-top: 24px;
  padding: 12px 24px;
  background: ${colors.primary};
  color: ${colors.onPrimary};
  border: none;
  border-radius: 8px;
  font-size: ${typography.body.medium.fontSize};
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${colors.primaryContainer};
  }
`;

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  hasBackground?: boolean;
  animateIcon?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  action,
  hasBackground = false,
  animateIcon = false
}) => {
  return (
    <Container $hasBackground={hasBackground}>
      {icon && (
        <Icon $animate={animateIcon}>
          {icon}
        </Icon>
      )}
      <Title>{title}</Title>
      <Message>{message}</Message>
      {action && (
        <ActionButton onClick={action.onClick}>
          {action.label}
        </ActionButton>
      )}
    </Container>
  );
};
