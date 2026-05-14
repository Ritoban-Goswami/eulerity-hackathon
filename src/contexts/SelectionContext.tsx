import React, { createContext, useContext, useReducer, useEffect, useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Pet, SelectionState } from '../types/pet';
import { usePetData } from '../hooks/usePetData';
import { getItem, createDebouncedSetter } from '../utils/localStorage';

interface SelectionContextType {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  colorAnalysisLoading: boolean;
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
  const { pets, loading, error, isEmpty, colorAnalysisLoading, refetch } = usePetData();

  const initializeState = (): SelectionState => {
    const savedIds = getItem<string[]>('selectedPetIds', []);
    return {
      selectedIds: new Set(savedIds),
      totalFileSize: 0,
    };
  };

  const [state, dispatch] = useReducer(selectionReducer, undefined, initializeState);

  // Debounced localStorage save to avoid frequent writes
  const debouncedSave = createDebouncedSetter('selectedPetIds', 500);
  useEffect(() => {
    debouncedSave(Array.from(state.selectedIds));
  }, [state.selectedIds, debouncedSave]);

  // Maintain a separate map for file sizes to avoid mutating pet objects
  const [fileSizeMap, setFileSizeMap] = useState<Map<string, number>>(new Map());

  // Only fetch file sizes for selected pets to avoid excessive network requests
  useEffect(() => {
    const selectedPetsWithoutSize = pets.filter(pet =>
      state.selectedIds.has(pet.id) && !fileSizeMap.has(pet.id)
    );
    if (selectedPetsWithoutSize.length === 0) return;

    const fetchSizes = async () => {
      const { fetchFileSizes } = await import('../utils/fileSize');
      const urls = selectedPetsWithoutSize.map(pet => pet.url);
      const sizes = await fetchFileSizes(urls);

      // Update file size map
      setFileSizeMap(prevMap => {
        const newFileSizeMap = new Map(prevMap);
        selectedPetsWithoutSize.forEach((pet, index) => {
          newFileSizeMap.set(pet.id, sizes[index]);
        });
        return newFileSizeMap;
      });
    };

    fetchSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedIds, pets]);

  // Recalculate total file size when selection or file sizes change
  useEffect(() => {
    if (pets.length === 0 || fileSizeMap.size === 0) return;

    let totalFileSize = 0;
    for (const id of state.selectedIds) {
      totalFileSize += fileSizeMap.get(id) || 0;
    }

    if (totalFileSize !== state.totalFileSize) {
      dispatch({ type: 'UPDATE_FILE_SIZE', payload: totalFileSize });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedIds, fileSizeMap, state.totalFileSize]);

  const selectedPets = useMemo(() => {
    return pets.filter(pet => state.selectedIds.has(pet.id));
  }, [pets, state.selectedIds]);

  const selectPet = useCallback((pet: Pet) => {
    dispatch({ type: 'SELECT_PET', payload: pet });
  }, []);

  const deselectPet = useCallback((petId: string) => {
    dispatch({ type: 'DESELECT_PET', payload: petId });
  }, []);

  const toggleSelection = useCallback((pet: Pet) => {
    dispatch({ type: 'TOGGLE_SELECTION', payload: pet });
  }, []);

  const selectAll = useCallback((pets: Pet[]) => {
    dispatch({ type: 'SELECT_ALL', payload: pets });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, []);

  const isPetSelected = useCallback((petId: string) => {
    return state.selectedIds.has(petId);
  }, [state.selectedIds]);

  const value: SelectionContextType = useMemo(() => ({
    pets,
    loading,
    error,
    isEmpty,
    colorAnalysisLoading,
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
  }), [
    pets,
    loading,
    error,
    isEmpty,
    colorAnalysisLoading,
    refetch,
    state.selectedIds,
    state.totalFileSize,
    selectedPets,
    selectPet,
    deselectPet,
    toggleSelection,
    selectAll,
    clearSelection,
    isPetSelected,
  ]);

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSelection = (): SelectionContextType => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
