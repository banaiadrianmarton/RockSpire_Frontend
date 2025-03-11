import { TicketModel } from './ticket.model';

export interface TicketOrderModel {
  id: number;
  user_id: number;
  ticket_id: number;
  quantity: number;
  total_price: number;
  tickets: TicketModel[];
}
