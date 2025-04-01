import { CampingModel } from './camping.model';

export interface CampingOrderModel {
  id: number;
  user_id: number;
  campings: CampingModel[];
}
