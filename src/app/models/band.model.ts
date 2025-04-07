import { DayModel } from './day.model';

export interface BandModel {
  id?: number;
  name: string;
  image_url: string;
  logo_url: string;
  description: string;
  day_id: number;
  start_time: string;
  end_time: string;
  days?: DayModel;
}
