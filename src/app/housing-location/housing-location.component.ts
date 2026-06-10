import { Component, Input , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../models/housinglocation';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css',
})

export class HousingLocationComponent implements OnInit {
  @Input() housingLocation!: HousingLocation;
  isFavorite: boolean = false;

  ngOnInit(): void {
    const savedFav = localStorage.getItem(`favorito_${this.housingLocation.id}`);

    if (savedFav === 'true') {
      this.isFavorite = true;
    }
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;

    localStorage.setItem(`favorito_${this.housingLocation.id}`, String(this.isFavorite));
  }
}
