import { CampingModel } from './camping.mode';

export interface CampingOrderModel {
  id: number;
  user_id: number;
  campings: CampingModel[];
}
