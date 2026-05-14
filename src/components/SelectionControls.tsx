import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, glass, gradients, zIndex, elevation } from '../theme';
import { formatFileSize } from '../utils/fileSize';
import { Button } from './Button';

interface SelectionControlsProps {
  selectedCount: number;
  totalFileSize: number;
  onClearSelection: () => void;
  onDownload: () => void;
  isDownloading?: boolean;
  onSelectAll?: () => void;
  totalItems?: number;
}

const Container = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.sticky};
  padding: ${spacing.md};
  padding-bottom: calc(${spacing.md} + 60px);
  pointer-events: none;
  display: flex;
  justify-content: center;
  
  @media (min-width: 768px) and (max-width: 1023px) {
    bottom: 72px;
  }
  
  @media (min-width: 768px) {
    padding: ${spacing.gutter};
    padding-bottom: ${spacing.gutter};
  }
  
  ${props => props.isVisible && `
    animation: slideUp 0.3s ease-out;
  `}
  
  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Pill = styled.div`
  pointer-events: auto;
  background: ${glass.selection};
  backdrop-filter: blur(${glass.blurHeavy});
  -webkit-backdrop-filter: blur(${glass.blurHeavy});
  color: ${colors.inverseOnSurface};
  border-radius: ${borderRadius.xl};
  padding: ${spacing.sm};
  box-shadow: ${elevation.level3};
  display: inline-flex;
  align-items: center;
  gap: ${spacing.sm};
  border: 1px solid ${colors.outlineVariant}20;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  
  @media (min-width: 480px) {
    padding: 12px;
    gap: ${spacing.md};
    width: auto;
  }
  
  @media (min-width: 768px) {
    padding: 14px;
    gap: ${spacing.lg};
  }
`;

const SelectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding-right: ${spacing.lg};
  border-right: 1px solid ${colors.outline}30;
  flex-shrink: 0;
  
  @media (max-width: 479px) {
    padding-right: ${spacing.sm};
    gap: ${spacing.xs};
  }
`;

const CountIndicator = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${borderRadius.full};
  background: ${gradients.primary};
  color: ${colors.onPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${typography.label.medium.fontSize};
  font-family: ${typography.label.medium.fontFamily};
  
  @media (max-width: 479px) {
    width: 28px;
    height: 28px;
    font-size: ${typography.label.small.fontSize};
  }
`;

const SelectionText = styled.span`
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  
  @media (max-width: 479px) {
    font-size: ${typography.label.small.fontSize};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${spacing.sm};
  flex: 1;
  min-width: 0;
  
  @media (min-width: 768px) {
    gap: ${spacing.md};
  }
  
  @media (max-width: 479px) {
    gap: 4px;
  }
`;

export const SelectionControls: React.FC<SelectionControlsProps> = ({
  selectedCount,
  totalFileSize,
  onClearSelection,
  onDownload,
  isDownloading = false,
  onSelectAll,
  totalItems,
}) => {
  const isVisible = selectedCount > 0;

  if (!isVisible) return null;

  return (
    <Container isVisible={isVisible}>
      <Pill>
        <SelectionInfo>
          <CountIndicator>{selectedCount}</CountIndicator>
          <SelectionText>
            {selectedCount === 1 ? 'Item selected' : 'Items selected'}
            {totalFileSize > 0 && ` • ${formatFileSize(totalFileSize)}`}
          </SelectionText>
        </SelectionInfo>

        <Actions>
          {onSelectAll && totalItems && selectedCount < totalItems && (
            <Button variant="ghost" size="sm" icon={<span className="material-symbols-outlined" style={{ fontSize: '18px' }}>select_all</span>} onClick={onSelectAll}>
              All
            </Button>
          )}

          <Button
            variant="download"
            size="md"
            icon={<span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>}
            onClick={onDownload}
            disabled={isDownloading}
          >
            Download
          </Button>

          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            Clear
          </Button>
        </Actions>

        <Button variant="ghost" size="sm" icon={<span className="material-symbols-outlined">close</span>} onClick={onClearSelection} aria-label="Close selection" style={{ padding: '4px', marginLeft: spacing.sm }} />
      </Pill>
    </Container>
  );
};
