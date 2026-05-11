import React from 'react';
import styled from 'styled-components';

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

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: white;
  border-top: 1px solid #e0e0e0;
  flex-wrap: wrap;
  position: sticky;
  bottom: 0;
  z-index: 50;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 768px) {
    padding: 16px 32px;
  }
  
  @media (min-width: 1024px) {
    padding: 16px 40px;
  }
`;

const SelectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
  flex: 1;
  min-width: 200px;
`;

const Count = styled.span`
  font-weight: 600;
`;

const FileSize = styled.span`
  color: #666;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;

  ${props => props.variant === 'primary' ? `
    background: #3498db;
    color: white;

    &:hover:not(:disabled) {
      background: #2980b9;
    }

    &:focus-visible {
      outline: 2px solid #3498db;
      outline-offset: 2px;
    }
  ` : `
    background: #f0f0f0;
    color: #333;

    &:hover:not(:disabled) {
      background: #e0e0e0;
    }

    &:focus-visible {
      outline: 2px solid #666;
      outline-offset: 2px;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 KB';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
};

export const SelectionControls: React.FC<SelectionControlsProps> = ({
  selectedCount,
  totalFileSize,
  onSelectAll,
  onClearSelection,
  onDownload,
  hasPets,
  allSelected,
  isDownloading = false,
}) => {
  return (
    <Container>
      <SelectionInfo>
        {selectedCount > 0 ? (
          <>
            <Count>{selectedCount} selected</Count>
            <FileSize>• {formatFileSize(totalFileSize)}</FileSize>
          </>
        ) : (
          <span>No items selected</span>
        )}
      </SelectionInfo>

      <Button
        variant="secondary"
        onClick={allSelected ? onClearSelection : onSelectAll}
        disabled={!hasPets}
      >
        {allSelected ? 'Clear Selection' : 'Select All'}
      </Button>

      <Button
        variant="secondary"
        onClick={onClearSelection}
        disabled={selectedCount === 0}
      >
        Clear
      </Button>

      <Button
        variant="primary"
        onClick={onDownload}
        disabled={selectedCount === 0 || isDownloading}
      >
        {isDownloading ? 'Downloading...' : `Download (${selectedCount})`}
      </Button>
    </Container>
  );
};
