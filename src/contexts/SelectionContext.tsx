import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Pet, SelectionState } from '../types/pet';
import { usePetData } from '../hooks/usePetData';

interface SelectionContextType {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refetch: () => void;
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
  | { type: 'UPDATE_FILE_SIZE'; payload: number };

const selectionReducer = (state: SelectionState, action: SelectionAction): SelectionState => {
  switch (action.type) {
    case 'SELECT_PET': {
      const newSelectedIds = new Set(state.selectedIds);
      newSelectedIds.add(action.payload.id);
      // Note: totalFileSize will be updated by useEffect
      return { selectedIds: newSelectedIds, totalFileSize: state.totalFileSize };
    }
    case 'DESELECT_PET': {
      const newSelectedIds = new Set(state.selectedIds);
      newSelectedIds.delete(action.payload);
      // Note: totalFileSize will be updated by useEffect
      return { selectedIds: newSelectedIds, totalFileSize: state.totalFileSize };
    }
    case 'TOGGLE_SELECTION': {
      const newSelectedIds = new Set(state.selectedIds);
      if (newSelectedIds.has(action.payload.id)) {
        newSelectedIds.delete(action.payload.id);
      } else {
        newSelectedIds.add(action.payload.id);
      }
      // Note: totalFileSize will be updated by useEffect
      return { selectedIds: newSelectedIds, totalFileSize: state.totalFileSize };
    }
    case 'SELECT_ALL': {
      const newSelectedIds = new Set(action.payload.map(pet => pet.id));
      // Note: totalFileSize will be updated by useEffect
      return { selectedIds: newSelectedIds, totalFileSize: state.totalFileSize };
    }
    case 'CLEAR_SELECTION': {
      return { selectedIds: new Set<string>(), totalFileSize: 0 };
    }
    case 'UPDATE_FILE_SIZE': {
      return { ...state, totalFileSize: action.payload };
    }
    default:
      return state;
  }
};

interface SelectionProviderProps {
  children: ReactNode;
}

export const SelectionProvider: React.FC<SelectionProviderProps> = ({ children }) => {
  const { pets, loading, error, isEmpty, refetch } = usePetData();

  const initializeState = (): SelectionState => {
    try {
      const savedSelection = localStorage.getItem('selectedPetIds');
      if (savedSelection) {
        const parsedIds: string[] = JSON.parse(savedSelection);
        return {
          selectedIds: new Set(parsedIds),
          totalFileSize: 0,
        };
      }
    } catch (error) {
      console.error('Failed to load selection from localStorage:', error);
    }
    return {
      selectedIds: new Set<string>(),
      totalFileSize: 0,
    };
  };

  const [state, dispatch] = useReducer(selectionReducer, undefined, initializeState);

  // Save to localStorage whenever selection changes
  useEffect(() => {
    localStorage.setItem('selectedPetIds', JSON.stringify(Array.from(state.selectedIds)));
  }, [state.selectedIds]);

  // Maintain a separate map for file sizes to avoid mutating pet objects
  const [fileSizeMap, setFileSizeMap] = useState<Map<string, number>>(new Map());

  // Fetch file sizes for pets that don't have them
  useEffect(() => {
    const petsWithoutSize = pets.filter(pet => !fileSizeMap.has(pet.id));
    if (petsWithoutSize.length === 0) return;

    const fetchSizes = async () => {
      const { fetchFileSizes } = await import('../utils/fileSize');
      const urls = petsWithoutSize.map(pet => pet.url);
      const sizes = await fetchFileSizes(urls);

      // Update file size map
      setFileSizeMap(prevMap => {
        const newFileSizeMap = new Map(prevMap);
        petsWithoutSize.forEach((pet, index) => {
          newFileSizeMap.set(pet.id, sizes[index]);
        });
        return newFileSizeMap;
      });
    };

    fetchSizes();
  }, [pets, fileSizeMap]);

  // Recalculate total file size when selection or file sizes change
  useEffect(() => {
    if (pets.length === 0) return;

    const totalFileSize = Array.from(state.selectedIds)
      .reduce((sum, id) => {
        const size = fileSizeMap.get(id) || 0;
        return sum + size;
      }, 0);

    if (totalFileSize !== state.totalFileSize) {
      dispatch({ type: 'UPDATE_FILE_SIZE', payload: totalFileSize });
    }
  }, [pets, state.selectedIds, fileSizeMap]);

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

  const selectedPets = pets.filter(pet => state.selectedIds.has(pet.id));

  const value: SelectionContextType = {
    pets,
    loading,
    error,
    isEmpty,
    refetch,
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
