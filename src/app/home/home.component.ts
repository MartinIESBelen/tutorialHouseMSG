import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../models/housinglocation';
import {inject} from '@angular/core';
import {ResilientHousingService} from '../resilient-housing.service';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, RouterLink, ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Creamos una casa de prueba para ver si funciona
  housingLocationList: HousingLocation[] = [];

  filteredLocationList: HousingLocation[] = [];

  housingService= inject(ResilientHousingService);

  cd = inject(ChangeDetectorRef);



  constructor(){}

  //Usamos ngOnInit para cargar los datos
  ngOnInit() {
    this.housingService.getAllHousingLocations().then((dataList: HousingLocation[]) => {
      this.housingLocationList = dataList;
      this.filteredLocationList = dataList;
      this.cd.detectChanges();
      console.log('Datos recibidos en home:', dataList);
    });

  }

  filterResults(text: string, disponible: boolean, orden:String){
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      window.alert("No se encontraron viviendas que coincidan con los filtros")
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter(l => l?.city.toLowerCase().includes(text.toLowerCase()));
    if("asc" === orden.toLowerCase()){
      this.filteredLocationList = this.filteredLocationList.sort((a,b) => a.city.localeCompare(b.city));
    }else {
      this.filteredLocationList = this.filteredLocationList.sort((a,b) => a.city.localeCompare(b.city));
    }

    if(disponible){
      this.filteredLocationList = this.filteredLocationList.filter(l => l.available);
    }else {
      this.filteredLocationList = this.filteredLocationList.filter(l => l.available!);
    }

  }


}

