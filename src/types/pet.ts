export interface Pet {
  id: string;
  url: string;
  title: string;
  description: string;
  created: string;
  fileSize?: number;
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
