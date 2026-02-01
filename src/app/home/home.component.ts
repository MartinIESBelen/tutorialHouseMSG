import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../models/housinglocation';
import {HousingService} from '../housing.service';
import {inject} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent], // <--- Importamos el componente hijo
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Creamos una casa de prueba para ver si funciona
  housingLocationList: HousingLocation[] = [];

  filteredLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  constructor(){
    this.housingLocationList = new HousingService().getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string){
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(l => l?.city.toLowerCase().includes(text.toLowerCase()));

  }
}

