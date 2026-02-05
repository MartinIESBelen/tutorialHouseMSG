import { Injectable } from '@angular/core';
import {HousingProvider} from './housing.service';
import { HousingLocation } from './models/housinglocation';

@Injectable({
  providedIn: 'root'
})
export class ResilientHousingService implements HousingProvider {
  // URLs de los datos
  private readonly apiUrl = 'http://localhost:3000/locations'; // API Real
  private readonly localUrl = '/db.json'; // Fallback local

  // Implementación con try/catch para la resiliencia
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      //  Infraestructura Externa (API)
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error('API inaccesible');
      return await response.json() ?? [];

    } catch (error) {
      //  Fallback (Datos locales)
      console.warn(' Fallo en API, activando datos locales de emergencia');
      const fallback = await fetch(this.localUrl);
      const data = await fallback.json();
      // Dependiendo del db.json, esto puede ser 'data' o 'data.locations'
      return data.locations || data;
    }
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    // Reutilizamos la lógica resiliente: traemos todo y buscamos el ID
    const allLocations = await this.getAllHousingLocations();
    return allLocations.find((item: HousingLocation) => item.id == id);
  }

  async deleteHousingLocation(id: number): Promise<void> {
    // URL específica para borrar ese ID: http://localhost:3000/locations/10
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
