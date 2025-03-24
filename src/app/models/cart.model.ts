export interface CartItem {
  id: number;
  type: string;
  name: string;
  quantity: number;
  price: number;
  cartCategory: 'ticket' | 'camping';
}
