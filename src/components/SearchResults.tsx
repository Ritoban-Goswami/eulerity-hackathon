import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation } from '../theme';

interface SearchResultsProps {
  query: string;
  totalResults: number;
  children: React.ReactNode;
  onExport?: () => void;
  onShare?: () => void;
  onRecentSearchClick?: (term: string) => void;
  recentSearches?: Array<{ term: string; primary?: boolean }>;
}

const ResultsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.md};
  border-bottom: 1px solid ${colors.outlineVariant};
  
  @media (max-width: 479px) {
    gap: ${spacing.sm};
    margin-bottom: ${spacing.sm};
    padding-bottom: ${spacing.sm};
  }
  
  @media (min-width: 768px) {
    margin-bottom: ${spacing.lg};
  }
`;

const ResultsTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  width: 100%;
  
  @media (max-width: 479px) {
    gap: ${spacing.xs};
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  width: 100%;
  
  @media (max-width: 479px) {
    gap: 4px;
  }
  
  @media (min-width: 768px) {
    gap: ${spacing.sm};
  }
`;

const ResultsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0;
  line-height: 1.3;
  
  @media (max-width: 479px) {
    font-size: 18px;
  }
  
  @media (min-width: 768px) {
    font-size: ${typography.headline.large.fontSize};
    font-weight: ${typography.headline.large.fontWeight};
  }
`;

const ResultsCount = styled.p`
  font-size: 13px;
  font-weight: 400;
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
  line-height: 1.4;
  
  @media (max-width: 479px) {
    font-size: 12px;
  }
  
  @media (min-width: 768px) {
    font-size: ${typography.body.medium.fontSize};
    font-weight: ${typography.body.medium.fontWeight};
    margin-top: ${spacing.xs};
  }
`;

const BulkActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: 6px;
  background: ${colors.surfaceContainerHigh};
  border-radius: ${borderRadius.lg};
  box-shadow: ${elevation.level1};
  border: 1px solid ${colors.outlineVariant}20;
  width: auto;
  align-self: flex-end;
  
  @media (max-width: 479px) {
    padding: 4px;
    gap: 2px;
  }
  
  @media (min-width: 768px) {
    padding: 8px;
  }
`;

const ActionsLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 0 6px;
  color: ${colors.outline};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  
  @media (max-width: 479px) {
    font-size: 9px;
    padding: 0 4px;
  }
  
  @media (min-width: 768px) {
    font-size: ${typography.label.small.fontSize};
    padding: 0 8px;
  }
`;

const ActionDivider = styled.div`
  height: 16px;
  width: 1px;
  background: ${colors.outlineVariant};
  
  @media (max-width: 479px) {
    height: 12px;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: ${borderRadius.md};
  border: none;
  background: none;
  color: ${props => props.variant === 'primary' ? colors.primary : colors.secondary};
  font-size: 12px;
  font-weight: 500;
  font-family: ${typography.label.medium.fontFamily};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  @media (max-width: 479px) {
    padding: 4px 8px;
    gap: 2px;
    font-size: 11px;
    
    & span:first-child {
      font-size: 14px;
    }
    
    & span:last-child {
      display: none;
    }
  }
  
  @media (min-width: 768px) {
    gap: ${spacing.xs};
    padding: 6px 12px;
    font-size: ${typography.label.medium.fontSize};
    font-weight: ${typography.label.medium.fontWeight};
  }
  
  &:hover {
    background: ${colors.surfaceVariant};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const RecentSearchesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.sm};
  margin-top: ${spacing.sm};
  
  @media (max-width: 479px) {
    gap: ${spacing.xs};
    margin-top: ${spacing.xs};
  }
  
  @media (min-width: 768px) {
    margin-top: ${spacing.md};
  }
`;

const RecentSearchesLabel = styled.span`
  font-size: 10px;
  color: ${colors.outline};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  white-space: nowrap;
  
  @media (max-width: 479px) {
    font-size: 9px;
  }
  
  @media (min-width: 768px) {
    font-size: ${typography.label.small.fontSize};
  }
`;

const RecentSearchesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  
  @media (max-width: 479px) {
    gap: 4px;
  }
  
  @media (min-width: 768px) {
    gap: ${spacing.xs};
  }
`;

const RecentSearchChip = styled.button<{ primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: ${borderRadius.full};
  border: 1px solid ${props => props.primary ? `${colors.primary}10` : colors.outlineVariant};
  background: ${props => props.primary ? `${colors.primaryFixedDim}30` : colors.surfaceContainerHigh};
  color: ${props => props.primary ? colors.onPrimaryFixedVariant : colors.onSurfaceVariant};
  font-size: 12px;
  font-weight: 500;
  font-family: ${typography.label.medium.fontFamily};
  cursor: pointer;
  transition: all 0.2s ease;
  
  @media (max-width: 479px) {
    padding: 4px 8px;
    gap: 2px;
    font-size: 11px;
    
    & span:first-child {
      font-size: 12px;
    }
  }
  
  @media (min-width: 768px) {
    gap: ${spacing.xs};
    padding: 8px 16px;
    font-size: ${typography.label.medium.fontSize};
    font-weight: ${typography.label.medium.fontWeight};
  }
  
  &:hover {
    background: ${props => props.primary ? `${colors.primaryFixedDim}50` : colors.surfaceVariant};
  }
`;

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  totalResults,
  children,
  onExport,
  onShare,
  onRecentSearchClick,
  recentSearches = []
}) => {
  const handleRecentSearchClick = (term: string) => {
    onRecentSearchClick?.(term);
  };

  return (
    <>
      <ResultsHeader>
        <ResultsTopSection>
          <ResultsInfo>
            <ResultsTitle>Results for "{query}"</ResultsTitle>
            <ResultsCount>{totalResults} results</ResultsCount>
          </ResultsInfo>

          <BulkActionBar>
            <ActionsLabel>Actions</ActionsLabel>
            <ActionDivider />
            <ActionButton variant="primary" onClick={onExport}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
              <span>Export</span>
            </ActionButton>
            <ActionButton variant="secondary" onClick={onShare}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>share</span>
              <span>Share</span>
            </ActionButton>
          </BulkActionBar>
        </ResultsTopSection>

        <RecentSearchesSection>
          <RecentSearchesLabel>Recent Searches</RecentSearchesLabel>
          <RecentSearchesList>
            {recentSearches.map((search, index) => (
              <RecentSearchChip
                key={index}
                primary={search.primary}
                onClick={() => handleRecentSearchClick(search.term)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>history</span>
                {search.term}
              </RecentSearchChip>
            ))}
          </RecentSearchesList>
        </RecentSearchesSection>
      </ResultsHeader>

      {children}
    </>
  );
};
