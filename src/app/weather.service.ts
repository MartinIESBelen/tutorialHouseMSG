import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private  apiKey = "d5c5dbcffeb844fd802124534260801";
  private apiUrl = "https://api.weatherapi.com/v1/current.json";

  getWeather(lat: number, long: number): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${lat},${long}`;
    return this.http.get(url);
  }
}
