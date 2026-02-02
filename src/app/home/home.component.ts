import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../models/housinglocation';
import {inject} from '@angular/core';
import {ResilientHousingService} from '../resilient-housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent], // <--- Importamos el componente hijo
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Creamos una casa de prueba para ver si funciona
  housingLocationList: HousingLocation[] = [];

  filteredLocationList: HousingLocation[] = [];

  housingService= inject(ResilientHousingService);

  constructor(){}

  //Usamos ngOnInit para cargar los datos
  ngOnInit() {
    this.housingService.getAllHousingLocations().then((dataList: HousingLocation[]) => {
      this.housingLocationList = dataList;
      this.filteredLocationList = dataList;

      console.log('Datos recibidos en home:', dataList);
    });
  }

  filterResults(text: string){
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(l => l?.city.toLowerCase().includes(text.toLowerCase()));

  }
}

