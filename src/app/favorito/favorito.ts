import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../models/housinglocation';
import { ResilientHousingService } from '../resilient-housing.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './favorito.html',
  styleUrls: ['./favorito.css']
})
export class FavoritosComponent implements OnInit {
  filteredLocationList: HousingLocation[] = [];

  totalFavoritos: number = 0;

  housingService = inject(ResilientHousingService);
  cd = inject(ChangeDetectorRef);

  ngOnInit() {
    this.housingService.getAllHousingLocations().then((dataList: HousingLocation[]) => {

      this.filteredLocationList = dataList.filter(house => {
        const isFav = localStorage.getItem(`favorito_${house.id}`);
        return isFav === 'true';
      });

      this.totalFavoritos = this.filteredLocationList.length;
      this.cd.detectChanges();
    });
  }
}
