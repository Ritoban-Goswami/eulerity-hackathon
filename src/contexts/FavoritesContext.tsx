import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

interface FavoritesState {
  favoriteIds: string[];
}

type FavoritesAction =
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'SET_FAVORITES'; payload: string[] };

const FavoritesContext = createContext<{
  favoriteIds: Set<string>;
  toggleFavorite: (id: string) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
  favoriteCount: number;
} | undefined>(undefined);

const STORAGE_KEY = 'pawshots_favorites';

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      if (state.favoriteIds.includes(action.payload)) {
        return { favoriteIds: state.favoriteIds.filter(id => id !== action.payload) };
      } else {
        return { favoriteIds: [...state.favoriteIds, action.payload] };
      }
    }
    case 'ADD_FAVORITE': {
      if (state.favoriteIds.includes(action.payload)) {
        return state;
      }
      return { favoriteIds: [...state.favoriteIds, action.payload] };
    }
    case 'REMOVE_FAVORITE': {
      return { favoriteIds: state.favoriteIds.filter(id => id !== action.payload) };
    }
    case 'CLEAR_FAVORITES': {
      return { favoriteIds: [] };
    }
    case 'SET_FAVORITES': {
      return { favoriteIds: action.payload };
    }
    default:
      return state;
  }
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favoriteIds: [] });
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log('Loading favorites from localStorage:', stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('Parsed favorites:', parsed);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'SET_FAVORITES', payload: parsed });
        }
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      console.log('Saving favorites to localStorage:', state.favoriteIds);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favoriteIds));
      console.log('Saved successfully');
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [state.favoriteIds, isLoaded]);

  const toggleFavorite = (id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  const addFavorite = (id: string) => {
    dispatch({ type: 'ADD_FAVORITE', payload: id });
  };

  const removeFavorite = (id: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  const isFavorite = (id: string) => {
    return state.favoriteIds.includes(id);
  };

  const favoriteCount = state.favoriteIds.length;

  const favoriteIdsSet = new Set(state.favoriteIds);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds: favoriteIdsSet,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
        favoriteCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
