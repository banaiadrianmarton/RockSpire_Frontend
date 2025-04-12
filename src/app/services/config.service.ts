import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiUrl = 'https://bgs.jedlik.eu/fb/backend';
  constructor() {}
}
