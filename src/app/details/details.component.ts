import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // Para leer la URL
import { HousingService } from '../housing.service'; // Para pedir datos
import { HousingLocation } from '../models/housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { WeatherService} from '../weather.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterViewInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  weatherService = inject(WeatherService);

  housingLocation: HousingLocation | undefined;
  weatherData: any;

  private map: any;

  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor() {
    // 1. Obtenemos el ID de la URL (ej: details/0 -> id=0)
    const housingLocationId = Number(this.route.snapshot.params['id']);

    // 2. Buscamos la casa en el servicio usando ese ID
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  //evento de ciclo de vida
  ngOnInit(): void {
    //comprobamos si hay algo que guardar en la librería
    const saveData = localStorage.getItem('applyForm');
    //Si no está vacío (el usuario ya ha estado en la aplicación antes)
    if (saveData) {
      //Convertimos el texto plano de nuevo en Object
      //Y setValue rellena de nuevo los campos inputs del formulario
      this.applyForm.setValue(JSON.parse(saveData));
    }
    //Comprobamos si la casa tiene coordenadas, si tiene cargamos el tiempo
    if(this.housingLocation){
      const lat = this.housingLocation.latitude;
      const long = this.housingLocation.longitude;

      this.weatherService.getWeather(lat, long).subscribe(data => {
        this.weatherData = data;
        console.log('Datos del tiempo', data);
      });
    }
  }
  //Iniciamos el mapa después de haber cargado la vista
  ngAfterViewInit(): void {
    if(this.housingLocation){
      this.initMap();
    }
  }

  private initMap(): void {
    const icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    })
    this.map = L.map('map').setView([this.housingLocation!.latitude, this.housingLocation!.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    L.marker([this.housingLocation!.latitude, this.housingLocation!.longitude], { icon: icon })
      .addTo(this.map)
      .bindPopup(this.housingLocation!.name) // Que salga el nombre al hacer clic
      .openPopup();
  }
  sumitApplication(){
    if(this.applyForm.valid){
      localStorage.setItem('applyForm', JSON.stringify(this.applyForm.value));

      console.log("Formulario guardado y enviado ",this.applyForm.value);
      alert(`Application received: ${this.applyForm.value.firstName}, we save your data.`);
    }else{
      alert(`Please fill all fields correctly`);
    }
  }

}



