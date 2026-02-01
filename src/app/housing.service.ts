import { Injectable } from '@angular/core';
import { HousingLocation } from './models/housinglocation'; // Asegura que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  // Lista protegida de casas (con los datos del ejercicio)
  protected housingLocationList: HousingLocation[] = [
    {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',      availableUnits: 4,
      wifi: true,
      laundry: true,
      latitude: 41.8781,
      longitude: -87.6298,
      price: 2500,
      available: true
    },
    {
      id: 1,
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
      photo: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',      availableUnits: 0,
      wifi: false,
      laundry: true,
      latitude: 34.0195,
      longitude: -118.4912,
      price: 3200,
      available: false
    },
    {
      id: 2,
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
      photo: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',      availableUnits: 1,
      wifi: false,
      laundry: false,
      latitude: 58.3019,
      longitude: -134.4197,
      price: 1500,
      available: true
    }
  ];

  // Método para obtener todas las casas
  getAllHousingLocations(): HousingLocation[] {
    return this.housingLocationList;
  }

  // Método para obtener una casa por su ID (lo usaremos luego en Detalles)
  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find(housingLocation => housingLocation.id === id);
  }
}
