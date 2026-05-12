import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, typography, spacing, borderRadius, elevation, transitions, zIndex } from '../theme';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
}

export interface FilterState {
  petType: string[];
  dateRange: string;
  hasSelection: boolean;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.inverseSurface}80;
  z-index: ${zIndex.modal};
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${props => props.isOpen ? 'fadeIn 0.2s ease-out' : 'none'};
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${colors.surface};
  border-radius: ${borderRadius.xl};
  box-shadow: ${elevation.level3};
  padding: ${spacing.xl};
  min-width: 400px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  z-index: ${zIndex.modal + 1};
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${props => props.isOpen ? 'slideUp 0.3s ease-out' : 'none'};
  
  @keyframes slideUp {
    from {
      transform: translate(-50%, -40%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};
`;

const Title = styled.h2`
  font-size: ${typography.headline.medium.fontSize};
  font-weight: ${typography.headline.medium.fontWeight};
  font-family: ${typography.headline.medium.fontFamily};
  color: ${colors.onSurface};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.onSurfaceVariant};
  cursor: pointer;
  padding: ${spacing.xs};
  border-radius: ${borderRadius.full};
  transition: ${transitions.default};
  
  &:hover {
    background: ${colors.surfaceContainerHigh};
  }
`;

const Section = styled.div`
  margin-bottom: ${spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  color: ${colors.onSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${spacing.md};
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  cursor: pointer;
  font-size: ${typography.body.medium.fontSize};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${colors.primary};
  cursor: pointer;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  background: ${colors.surfaceContainer};
  border: 1px solid ${colors.outlineVariant};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.body.medium.fontSize};
  font-family: ${typography.body.medium.fontFamily};
  color: ${colors.onSurface};
  cursor: pointer;
  outline: none;
  transition: ${transitions.default};
  
  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primary}40;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  justify-content: flex-end;
  margin-top: ${spacing.xl};
  padding-top: ${spacing.lg};
  border-top: 1px solid ${colors.outlineVariant};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: ${borderRadius.lg};
  font-size: ${typography.label.medium.fontSize};
  font-weight: ${typography.label.medium.fontWeight};
  font-family: ${typography.label.medium.fontFamily};
  cursor: pointer;
  transition: ${transitions.default};
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background: ${colors.primary};
    color: ${colors.onPrimary};
    
    &:hover {
      background: ${colors.primaryContainer};
    }
  ` : `
    background: ${colors.surfaceContainer};
    color: ${colors.onSurface};
    
    &:hover {
      background: ${colors.surfaceContainerHigh};
    }
  `}
`;

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  const petTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const dateRanges = [
    { value: 'all', label: 'All time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'month', label: 'This month' },
    { value: 'year', label: 'This year' },
  ];

  const handlePetTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      petType: checked
        ? [...prev.petType, type]
        : prev.petType.filter(t => t !== type)
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      petType: [],
      dateRange: 'all',
      hasSelection: false,
    });
  };

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <Modal isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Filter Gallery</Title>
          <CloseButton onClick={onClose} aria-label="Close filters">
            <span className="material-symbols-outlined">close</span>
          </CloseButton>
        </Header>

        <Section>
          <SectionTitle>Pet Type</SectionTitle>
          <CheckboxGroup>
            {petTypes.map(type => (
              <CheckboxLabel key={type}>
                <Checkbox
                  type="checkbox"
                  checked={filters.petType.includes(type)}
                  onChange={(e) => handlePetTypeChange(type, e.target.checked)}
                />
                {type}
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </Section>

        <Section>
          <SectionTitle>Date Added</SectionTitle>
          <Select
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </Select>
        </Section>

        <Section>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              checked={filters.hasSelection}
              onChange={(e) => setFilters(prev => ({ ...prev, hasSelection: e.target.checked }))}
            />
            Show only selected items
          </CheckboxLabel>
        </Section>

        <ButtonGroup>
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply Filters
          </Button>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
};
