import type { Pet, SortOption } from '../types/pet';

export const filterPets = (pets: Pet[], searchTerm: string): Pet[] => {
  if (!searchTerm.trim()) {
    return pets;
  }

  const normalizedSearch = searchTerm.toLowerCase();
  
  return pets.filter((pet) => {
    const titleMatch = pet.title.toLowerCase().includes(normalizedSearch);
    const descriptionMatch = pet.description.toLowerCase().includes(normalizedSearch);
    return titleMatch || descriptionMatch;
  });
};

export const sortPets = (pets: Pet[], sortOption: SortOption): Pet[] => {
  const sorted = [...pets];
  
  switch (sortOption) {
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    
    case 'date-newest':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.created).getTime();
        const dateB = new Date(b.created).getTime();
        return dateB - dateA;
      });
    
    case 'date-oldest':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.created).getTime();
        const dateB = new Date(b.created).getTime();
        return dateA - dateB;
      });
    
    default:
      return sorted;
  }
};
