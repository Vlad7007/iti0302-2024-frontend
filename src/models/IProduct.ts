export interface IProduct {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  categoryIds: number[];
  supplierId: number;
}
