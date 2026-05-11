import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation, transitions, zIndex, gradients } from '../theme';

interface SelectionControlsProps {
  selectedCount: number;
  totalFileSize: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDownload: () => void;
  hasPets: boolean;
  allSelected: boolean;
  isDownloading?: boolean;
}

const Container = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.sticky};
  padding: ${spacing.md};
  pointer-events: none;
  display: flex;
  justify-content: center;
  
  @media (min-width: 768px) {
    padding: ${spacing.gutter};
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
  background: ${colors.inverseSurface};
  color: ${colors.inverseOnSurface};
  border-radius: ${borderRadius.full};
  padding: ${spacing.md} ${spacing.md};
  box-shadow: ${elevation.level3};
  display: inline-flex;
  align-items: center;
  gap: ${spacing.lg};
  border: 1px solid ${colors.outlineVariant}20;
`;

const SelectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding-right: ${spacing.lg};
  border-right: 1px solid ${colors.outline}30;
`;

const CountIndicator = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${borderRadius.full};
  background: ${gradients.tealGradient};
  color: ${colors.onPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: ${typography.label.medium.fontSize};
  font-family: ${typography.label.medium.fontFamily};
`;

const SelectionText = styled.span`
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  flex: 1;
`;

const DownloadButton = styled.button`
  background: ${colors.primaryFixed};
  color: ${colors.onPrimaryFixed};
  font-weight: 700;
  padding: 8px 24px;
  border-radius: ${borderRadius.full};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  border: none;
  cursor: pointer;
  transition: ${transitions.default};
  font-size: ${typography.label.medium.fontSize};
  font-family: ${typography.label.medium.fontFamily};
  
  &:hover {
    transform: scale(0.95);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  background: none;
  color: ${colors.onPrimaryContainer};
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CloseButton = styled.button`
  margin-left: ${spacing.sm};
  padding: 4px;
  border-radius: ${borderRadius.full};
  background: none;
  border: none;
  color: ${colors.inverseOnSurface};
  cursor: pointer;
  transition: ${transitions.default};
  
  &:hover {
    background: ${colors.surfaceVariant}20;
  }
`;

export const SelectionControls: React.FC<SelectionControlsProps> = ({
  selectedCount,
  totalFileSize,
  onClearSelection,
  onDownload,
  isDownloading = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelectAll,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasPets,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allSelected,
}) => {
  const isVisible = selectedCount > 0;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
  };

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
          <DownloadButton
            onClick={onDownload}
            disabled={isDownloading}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
            Download Selected
          </DownloadButton>

          <ClearButton onClick={onClearSelection}>
            Clear Selection
          </ClearButton>
        </Actions>

        <CloseButton onClick={onClearSelection} aria-label="Close selection">
          <span className="material-symbols-outlined">close</span>
        </CloseButton>
      </Pill>
    </Container>
  );
};
