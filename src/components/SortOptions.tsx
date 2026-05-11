import React from 'react';
import styled from 'styled-components';
import type { SortOption } from '../types/pet';

interface SortOptionsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Label = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 10px 14px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #3498db;
  }
`;

export const SortOptions: React.FC<SortOptionsProps> = ({ value, onChange }) => {
  return (
    <Container>
      <Label>Sort by:</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value as SortOption)}>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="date-newest">Date (Newest First)</option>
        <option value="date-oldest">Date (Oldest First)</option>
      </Select>
    </Container>
  );
};
