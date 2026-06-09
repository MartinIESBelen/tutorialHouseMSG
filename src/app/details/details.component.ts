import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingLocation } from '../models/housinglocation';
import { WeatherService } from '../weather.service';
import * as L from 'leaflet';
import { ResilientHousingService } from '../resilient-housing.service';
import { ContactForm } from '../contact-form/contact-form';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ContactForm, NgOptimizedImage],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  weatherService = inject(WeatherService);
  housingService = inject(ResilientHousingService);
  private router = inject(Router);
  housingLocationId: number = 0;

  housingLocation: HousingLocation | undefined;
  weatherData: any;
  private map: any;

  cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.housingLocationId = Number(this.route.snapshot.params['id']);

    this.housingService.getHousingLocationById(this.housingLocationId).then(locations => {
      this.housingLocation = locations;
      if(this.housingLocation){
        this.loadWeather();
        this.initMap();
      }
      this.cd.detectChanges();
    });
  }

  loadWeather(){
    const lat = this.housingLocation!.latitude;
    const long = this.housingLocation!.longitude;

    this.weatherService.getWeather(lat, long).subscribe(data => {
      this.weatherData = data;
      console.log('Datos del tiempo', data);
      this.cd.detectChanges();
    });
  }

  private initMap(): void {
    if(!this.housingLocation) return;

    const icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    if(this.map){
      this.map.remove();
    }

    this.map = L.map('map').setView([this.housingLocation!.latitude, this.housingLocation!.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    L.marker([this.housingLocation!.latitude, this.housingLocation!.longitude], { icon: icon })
      .addTo(this.map)
      .bindPopup(this.housingLocation!.name)
      .openPopup();
  }

  deleteLocation() {
    if (!this.housingLocation) return;

    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar "${this.housingLocation.name}"?`);

    if (confirmDelete) {
      this.housingService.deleteHousingLocation(this.housingLocation.id)
        .then(() => {
          alert('Vivienda eliminada correctamente.');
          this.router.navigate(['/']);
        })
        .catch(err => {
          console.error(err);
          alert('No se pudo borrar. Asegúrate de que json-server esté corriendo.');
        });
    }
  }
}
