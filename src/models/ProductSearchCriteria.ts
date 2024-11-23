export interface ProductSearchCriteria {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}
