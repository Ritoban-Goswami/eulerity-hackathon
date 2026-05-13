import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors, typography, borderRadius, elevation, transitions, zIndex } from '../theme';

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 120px;
  
  @media (min-width: 768px) {
    width: 180px;
    min-width: 150px;
  }
`;

const DropdownButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 8px 12px;
  background: ${colors.surfaceContainer};
  border: 1px solid ${colors.outlineVariant};
  border-radius: ${borderRadius.lg};
  font-size: 13px;
  font-family: ${typography.label.medium.fontFamily};
  color: ${colors.onSurface};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: ${transitions.default};
  outline: none;
  min-height: 36px;
  
  @media (min-width: 768px) {
    padding: 8px 16px;
    font-size: ${typography.label.medium.fontSize};
    min-height: auto;
  }

  &:hover {
    background: ${colors.surfaceContainerHigh};
    border-color: ${colors.primary};
  }

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primary}40;
  }

  ${props => props.$isOpen && `
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primary}40;
  `}
`;

const DropdownIcon = styled.span<{ $isOpen: boolean }>`
  transition: transform 0.2s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: flex;
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${colors.surface};
  border: 1px solid ${colors.outlineVariant};
  border-radius: ${borderRadius.lg};
  box-shadow: ${elevation.level2};
  z-index: ${zIndex.modal};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-8px)'};
  transition: all 0.2s ease;
  max-height: 300px;
  overflow-y: auto;
  
  @media (max-width: 767px) {
    max-height: 250px;
  }
`;

const DropdownOption = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  padding: 10px 12px;
  background: ${props => props.$isSelected ? colors.primaryContainer : 'transparent'};
  color: ${props => props.$isSelected ? colors.onPrimaryContainer : colors.onSurface};
  border: none;
  text-align: left;
  font-size: 13px;
  font-family: ${typography.label.medium.fontFamily};
  cursor: pointer;
  transition: ${transitions.default};
  outline: none;
  min-height: 36px;
  
  @media (min-width: 768px) {
    padding: 10px 16px;
    font-size: ${typography.label.medium.fontSize};
    min-height: auto;
  }

  &:hover {
    background: ${props => props.$isSelected ? colors.primaryContainer : colors.surfaceContainerHigh};
  }

  &:focus {
    background: ${colors.surfaceContainerHigh};
  }

  &:first-child {
    border-radius: ${borderRadius.lg} ${borderRadius.lg} 0 0;
  }

  &:last-child {
    border-radius: 0 0 ${borderRadius.lg} ${borderRadius.lg};
  }
`;

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <DropdownContainer ref={containerRef} onKeyDown={handleKeyDown}>
      <DropdownButton
        $isOpen={isOpen}
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{selectedOption?.label || label || 'Select...'}</span>
        <DropdownIcon $isOpen={isOpen}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            expand_more
          </span>
        </DropdownIcon>
      </DropdownButton>
      <DropdownMenu $isOpen={isOpen} role="listbox">
        {options.map((option) => (
          <DropdownOption
            key={option.value}
            $isSelected={option.value === value}
            onClick={() => handleSelect(option.value)}
            role="option"
            aria-selected={option.value === value}
          >
            {option.label}
          </DropdownOption>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};
