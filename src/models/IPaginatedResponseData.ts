export interface IPaginatedResponseData<TItemType> {
  errors?: string[];
  content: TItemType;
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
