export interface CartItem {
  id: number;
  type: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
  cartCategory: 'ticket' | 'camping';
}
