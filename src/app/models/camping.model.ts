import { CartItem } from './cart.model';

export interface CampingModel extends CartItem {
  id: number;
  type: string;
  price: number;
  availability: number;
  description: string;
  quantity: number;
}
