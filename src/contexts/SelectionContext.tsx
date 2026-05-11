import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Pet, SelectionState } from '../types/pet';

interface SelectionContextType {
  selectedIds: Set<string>;
  selectedPets: Pet[];
  totalFileSize: number;
  selectedCount: number;
  selectPet: (pet: Pet) => void;
  deselectPet: (petId: string) => void;
  toggleSelection: (pet: Pet) => void;
  selectAll: (pets: Pet[]) => void;
  clearSelection: () => void;
  isPetSelected: (petId: string) => boolean;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

type SelectionAction =
  | { type: 'SELECT_PET'; payload: Pet }
  | { type: 'DESELECT_PET'; payload: string }
  | { type: 'TOGGLE_SELECTION'; payload: Pet }
  | { type: 'SELECT_ALL'; payload: Pet[] }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'LOAD_FROM_STORAGE'; payload: string[] };

const selectionReducer = (state: SelectionState, action: SelectionAction): SelectionState => {
  switch (action.type) {
    case 'SELECT_PET': {
      const newSelectedIds = new Set(state.selectedIds);
      newSelectedIds.add(action.payload.id);
      const totalFileSize = state.totalFileSize + (action.payload.fileSize || 0);
      return { selectedIds: newSelectedIds, totalFileSize };
    }
    case 'DESELECT_PET': {
      const newSelectedIds = new Set(state.selectedIds);
      newSelectedIds.delete(action.payload);
      return { selectedIds: newSelectedIds, totalFileSize: state.totalFileSize };
    }
    case 'TOGGLE_SELECTION': {
      const newSelectedIds = new Set(state.selectedIds);
      let totalFileSize = state.totalFileSize;

      if (newSelectedIds.has(action.payload.id)) {
        newSelectedIds.delete(action.payload.id);
        totalFileSize -= action.payload.fileSize || 0;
      } else {
        newSelectedIds.add(action.payload.id);
        totalFileSize += action.payload.fileSize || 0;
      }

      return { selectedIds: newSelectedIds, totalFileSize };
    }
    case 'SELECT_ALL': {
      const newSelectedIds = new Set(action.payload.map(pet => pet.id));
      const totalFileSize = action.payload.reduce((sum, pet) => sum + (pet.fileSize || 0), 0);
      return { selectedIds: newSelectedIds, totalFileSize };
    }
    case 'CLEAR_SELECTION': {
      return { selectedIds: new Set<string>(), totalFileSize: 0 };
    }
    case 'LOAD_FROM_STORAGE': {
      return { selectedIds: new Set(action.payload), totalFileSize: 0 };
    }
    default:
      return state;
  }
};

interface SelectionProviderProps {
  children: ReactNode;
  allPets: Pet[];
}

export const SelectionProvider: React.FC<SelectionProviderProps> = ({ children, allPets }) => {
  const initialState: SelectionState = {
    selectedIds: new Set<string>(),
    totalFileSize: 0,
  };

  const [state, dispatch] = useReducer(selectionReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedSelection = localStorage.getItem('selectedPetIds');
    if (savedSelection) {
      try {
        const parsedIds: string[] = JSON.parse(savedSelection);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedIds });
      } catch (error) {
        console.error('Failed to load selection from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever selection changes
  useEffect(() => {
    localStorage.setItem('selectedPetIds', JSON.stringify(Array.from(state.selectedIds)));
  }, [state.selectedIds]);

  // Recalculate total file size when allPets change (for cases where file sizes become available)
  useEffect(() => {
    const totalFileSize = Array.from(state.selectedIds)
      .reduce<number>((sum, id) => {
        const pet = allPets.find(p => p.id === id);
        return sum + (pet?.fileSize || 0);
      }, 0);

    if (totalFileSize !== state.totalFileSize) {
      // Clear and reselect to recalculate file sizes
      const selectedPets = allPets.filter(pet => state.selectedIds.has(pet.id));
      dispatch({ type: 'CLEAR_SELECTION' });
      if (selectedPets.length > 0) {
        dispatch({ type: 'SELECT_ALL', payload: selectedPets });
      }
    }
  }, [allPets, state.selectedIds, state.totalFileSize]);

  const selectPet = (pet: Pet) => {
    dispatch({ type: 'SELECT_PET', payload: pet });
  };

  const deselectPet = (petId: string) => {
    dispatch({ type: 'DESELECT_PET', payload: petId });
  };

  const toggleSelection = (pet: Pet) => {
    dispatch({ type: 'TOGGLE_SELECTION', payload: pet });
  };

  const selectAll = (pets: Pet[]) => {
    dispatch({ type: 'SELECT_ALL', payload: pets });
  };

  const clearSelection = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
  };

  const isPetSelected = (petId: string) => {
    return state.selectedIds.has(petId);
  };

  const selectedPets = allPets.filter(pet => state.selectedIds.has(pet.id));

  const value: SelectionContextType = {
    selectedIds: state.selectedIds,
    selectedPets,
    totalFileSize: state.totalFileSize,
    selectedCount: state.selectedIds.size,
    selectPet,
    deselectPet,
    toggleSelection,
    selectAll,
    clearSelection,
    isPetSelected,
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = (): SelectionContextType => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
