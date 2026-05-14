export interface ColorSignature {
  dominantColor: string;
  palette: string[];
  quantizedColors: string[];
}

export interface Pet {
  id: string;
  url: string;
  originalUrl?: string;
  title: string;
  description: string;
  created: string;
  colorSignature?: ColorSignature;
}

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "date-newest"
  | "date-oldest";

export interface SelectionState {
  selectedIds: Set<string>;
  totalFileSize: number;
}
