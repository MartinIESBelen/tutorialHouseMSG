import { HousingLocation } from './models/housinglocation';

export interface HousingProvider {
  getAllHousingLocations(): Promise<HousingLocation[]>;
  getHousingLocationById(id: number): Promise<HousingLocation | undefined>;
}
