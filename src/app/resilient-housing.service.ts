import { Injectable } from '@angular/core';
import {HousingProvider} from './housing.service';
import { HousingLocation } from './models/housinglocation';

@Injectable({
  providedIn: 'root'
})
export class ResilientHousingService implements HousingProvider {
  private readonly apiUrl = 'http://127.0.0.1:3000/locations';
  private readonly localUrl = '/db.json';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error('API inaccesible');
      return await response.json() ?? [];

    } catch (error) {
      console.warn(' Fallo en API, activando datos locales de emergencia');
      const fallback = await fetch(this.localUrl);
      const data = await fallback.json();
      return data.locations || data;
    }
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const allLocations = await this.getAllHousingLocations();
    return allLocations.find((item: HousingLocation) => item.id == id);
  }

  async deleteHousingLocation(id: number): Promise<void> {
    const url = `${this.apiUrl}/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`No se pudo borrar la casa con id ${id}`);
      }
      console.log(`Casa ${id} borrada correctamente`);
    } catch (error) {
      console.error('Error al intentar borrar:', error);
      throw error;
    }
  }
}
