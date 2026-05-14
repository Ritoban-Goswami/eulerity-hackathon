import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation, transitions, gradients } from '../theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'download';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

const StyledButton = styled.button<{ $variant: ButtonProps['variant']; $size: ButtonProps['size']; $fullWidth: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.xs};
  border: none;
  border-radius: ${props => {
    switch (props.$variant) {
      case 'download': return borderRadius.xl;
      default: return borderRadius.lg;
    }
  }};
  cursor: pointer;
  transition: ${transitions.default};
  font-family: ${typography.label.medium.fontFamily};
  white-space: nowrap;
  ${props => props.$fullWidth && 'width: 100%; flex: 1;'}
  
  // Size variants
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          min-height: 28px;
        `;
      case 'md':
        return `
          padding: 6px 12px;
          font-size: ${typography.label.small.fontSize};
          font-weight: 500;
          min-height: 36px;
        `;
      case 'lg':
        return `
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          min-height: 40px;
        `;
      default:
        return '';
    }
  }}
  
  @media (min-width: 768px) {
    ${props => {
    switch (props.$size) {
      case 'lg':
        return `
            padding: ${spacing.sm} ${spacing.md};
            font-size: ${typography.label.medium.fontSize};
            font-weight: ${typography.label.medium.fontWeight};
            min-height: 44px;
          `;
      default:
        return '';
    }
  }}
  }
  
  // Variant styles
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: ${gradients.primary};
          color: ${colors.onPrimary};
        `;
      case 'secondary':
        return `
          background: transparent;
          color: ${colors.primary};
          border: 2px solid ${colors.primary};
        `;
      case 'ghost':
        return `
          background: none;
          color: ${props.$size === 'lg' ? colors.primary : colors.onPrimaryContainer};
        `;
      case 'download':
        return `
          background: ${gradients.primary};
          color: ${colors.onPrimary};
          font-weight: 800;
          box-shadow: ${elevation.level1};
        `;
      default:
        return `
          background: ${colors.surfaceContainerHigh};
          color: ${colors.onSurface};
        `;
    }
  }}
  
  &:hover {
    ${props => {
    switch (props.$variant) {
      case 'primary':
      case 'download':
        return `
            transform: translateY(-2px);
            box-shadow: ${elevation.level2};
          `;
      case 'secondary':
        return `
            background: ${colors.primary}10;
            transform: translateY(-1px);
            box-shadow: ${elevation.level1};
          `;
      case 'ghost':
        return `
            background: ${colors.surfaceVariant};
          `;
      default:
        return `
            background: ${colors.surfaceContainerHover};
          `;
    }
  }}
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
  
  @media (max-width: 479px) {
    ${props => props.$size === 'md' && `
      padding: 4px 8px;
      gap: 2px;
      font-size: 11px;
      
      & span:first-child {
        font-size: 14px;
      }
      
      & span:last-child {
        display: none;
      }
    `}
    
    ${props => props.$variant === 'download' && `
      padding: 6px 10px;
      gap: 2px;
      
      & span:first-child {
        font-size: 16px;
      }
      
      & span:last-child {
        display: none;
      }
    `}
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {icon}
      {children}
    </StyledButton>
  );
};
