export interface CreateOrderDto {
  userId: number;
  products: ProductDTO[];
}
interface ProductDTO {
  id: number;
  quantity: number
}