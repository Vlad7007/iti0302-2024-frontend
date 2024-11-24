export interface ProductSearchCriteria {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
  sortBy?: string;
  sortDirection?: string;
}
