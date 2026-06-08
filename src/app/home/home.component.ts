import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../models/housinglocation';
import { ResilientHousingService } from '../resilient-housing.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  housingService = inject(ResilientHousingService);
  cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.housingService.getAllHousingLocations().then((dataList: HousingLocation[]) => {
      this.housingLocationList = dataList;
      this.filteredLocationList = dataList;
      this.cd.detectChanges();
    });
  }

  filterResults(text: string, disponible: boolean, orden: string) {
    let result = this.housingLocationList;

    if (text) {
      result = result.filter(l => l.city.toLowerCase().includes(text.toLowerCase()));
    }

    if (disponible) {
      result = result.filter(l => l.available);
    }

    if (orden === "desc") {
      result = result.sort((a, b) => b.city.localeCompare(a.city));
    } else {
      result = result.sort((a, b) => a.city.localeCompare(b.city));
    }

    if (result.length === 0) {
      window.alert("No se encontraron viviendas que coincidan con los filtros");
    }

    this.filteredLocationList = result;
  }
}
