import React from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation } from '../theme';

interface SearchResultsProps {
  query: string;
  totalResults: number;
  children: React.ReactNode;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  onExport?: () => void;
  onShare?: () => void;
}

const ResultsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
  padding-bottom: ${spacing.md};
  border-bottom: 1px solid ${colors.outlineVariant};
`;

const ResultsTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const ResultsTitle = styled.h2`
  font-size: ${typography.headline.large.fontSize};
  font-weight: ${typography.headline.large.fontWeight};
  font-family: ${typography.headline.large.fontFamily};
  color: ${colors.onSurface};
  margin: 0;
`;

const ResultsCount = styled.p`
  font-size: ${typography.body.medium.fontSize};
  font-weight: ${typography.body.medium.fontWeight};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  margin: 0;
  margin-top: ${spacing.xs};
`;

const BulkActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: 8px;
  background: ${colors.surfaceContainerHigh};
  border-radius: ${borderRadius.lg};
  box-shadow: ${elevation.level1};
  border: 1px solid ${colors.outlineVariant}20;
`;

const ActionsLabel = styled.span`
  font-size: ${typography.label.small.fontSize};
  font-weight: 600;
  padding: 0 8px;
  color: ${colors.outline};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ActionDivider = styled.div`
  height: 16px;
  width: 1px;
  background: ${colors.outlineVariant};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: 6px 12px;
  border-radius: ${borderRadius.md};
  border: none;
  background: none;
  color: ${props => props.variant === 'primary' ? colors.primary : colors.secondary};
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  cursor: pointer;
  transition: all 0.2s ease;
  
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
  margin-top: ${spacing.md};
`;

const RecentSearchesLabel = styled.span`
  font-size: ${typography.label.small.fontSize};
  color: ${colors.outline};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`;

const RecentSearchesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.xs};
`;

const RecentSearchChip = styled.button<{ primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: 8px 16px;
  border-radius: ${borderRadius.full};
  border: 1px solid ${props => props.primary ? `${colors.primary}10` : colors.outlineVariant};
  background: ${props => props.primary ? `${colors.primaryFixedDim}30` : colors.surfaceContainerHigh};
  color: ${props => props.primary ? colors.onPrimaryFixedVariant : colors.onSurfaceVariant};
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.primary ? `${colors.primaryFixedDim}50` : colors.surfaceVariant};
  }
`;

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  
  @media (max-width: 767px) {
    margin-top: ${spacing.sm};
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background: ${colors.surfaceContainer};
  border-radius: ${borderRadius.lg};
  padding: 4px;
`;

const ViewButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.md};
  background: ${props => props.active ? colors.surface : 'transparent'};
  border: none;
  color: ${props => props.active ? colors.primary : colors.onSurfaceVariant};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? colors.surface : `${colors.surfaceVariant}50`};
  }
`;

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  totalResults,
  children,
  viewMode = 'grid',
  onViewModeChange,
  onExport,
  onShare
}) => {
  const recentSearches = [
    { term: 'Puppy Training', primary: true },
    { term: 'Beagle Mix', primary: false },
    { term: 'Pet Bed DIY', primary: false }
  ];

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    onViewModeChange?.(mode);
  };

  const handleRecentSearchClick = (_term: string) => {
    // This would typically update the search query
  };

  return (
    <>
      <ResultsHeader>
        <ResultsTopSection>
          <ResultsInfo>
            <ResultsTitle>Results for "{query}"</ResultsTitle>
            <ResultsCount>{totalResults} high-resolution images found in your gallery.</ResultsCount>
          </ResultsInfo>

          <BulkActionBar>
            <ActionsLabel>Actions</ActionsLabel>
            <ActionDivider />
            <ActionButton variant="primary" onClick={onExport}>
              <span className="material-symbols-outlined" style={{ fontSize: typography.label.medium.fontSize }}>download</span>
              Export
            </ActionButton>
            <ActionButton variant="secondary" onClick={onShare}>
              <span className="material-symbols-outlined" style={{ fontSize: typography.label.medium.fontSize }}>share</span>
              Share
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
                <span className="material-symbols-outlined" style={{ fontSize: typography.label.small.fontSize }}>history</span>
                {search.term}
              </RecentSearchChip>
            ))}
          </RecentSearchesList>
        </RecentSearchesSection>

        <ViewControls>
          <ViewToggle>
            <ViewButton
              active={viewMode === 'grid'}
              onClick={() => handleViewModeChange('grid')}
              aria-label="Grid view"
            >
              <span className="material-symbols-outlined">grid_view</span>
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              onClick={() => handleViewModeChange('list')}
              aria-label="List view"
            >
              <span className="material-symbols-outlined">view_list</span>
            </ViewButton>
          </ViewToggle>
        </ViewControls>
      </ResultsHeader>

      {children}
    </>
  );
};
