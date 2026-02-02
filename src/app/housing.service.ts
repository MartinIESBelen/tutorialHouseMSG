import { HousingLocation } from './models/housinglocation';

// Según el PDF[cite: 37, 38], definimos aquí la interfaz
export interface HousingProvider {
  getAllHousingLocations(): Promise<HousingLocation[]>;
  getHousingLocationById(id: number): Promise<HousingLocation | undefined>;
}
