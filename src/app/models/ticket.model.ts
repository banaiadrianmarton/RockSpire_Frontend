import { CartItem } from './cart.model';

export interface TicketModel extends CartItem {
  id: number;
  type: string;
  price: number;
  availability: number;
  description: string;
  days: { id: number; date: string }[];
  quantity: number;
}
