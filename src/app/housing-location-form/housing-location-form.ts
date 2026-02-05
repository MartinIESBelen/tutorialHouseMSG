import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-housing-location-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './housing-location-form.html',
  styleUrl: './housing-location-form.css'
})
export class HousingLocationForm {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  // definición del formulario
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', Validators.required],
    state: ['', Validators.required],
    availableUnits: [1, [Validators.required, Validators.min(1)]],
    price: [null, [Validators.required, Validators.min(10000)]],
    wifi: [false],
    laundry: [false],
    available: [true] // Default true
  });

  submitting = false;
  successMsg = '';
  errorMsg = '';

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.http.get<any[]>('http://localhost:3000/locations').subscribe({
      next: (houses) => {

        //Calcular ID numérico de forma segura (ignorando los que tengan letras)
        const numericIds = houses
          .map(h => Number(h.id))
          .filter(id => !isNaN(id)); // Filtra los "NaN"

        const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
        const nextId = maxId + 1;

        //Preparar el objeto con la estructura CORRECTA (sin 'coordinates' anidado)
        const newHouse = {
          id: nextId,
          ...this.form.getRawValue(),
          photo: 'https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg',
          latitude: 0,   // Propiedades planas, como pide tu interfaz
          longitude: 0,
        };

        // Guardar la nueva casa
        this.http.post('http://localhost:3000/locations', newHouse).subscribe({
          next: (created: any) => {
            // Uso de comillas invertidas ` ` para que funcionen las variables ${...}
            this.successMsg = `Vivienda "${created.name}" creada con éxito (ID: ${created.id})`;

            this.form.reset({
              availableUnits: 1,
              price: 10000,
              wifi: false,
              laundry: false,
              available: true,
            });
            this.submitting = false;

            setTimeout(() => this.router.navigate(['/']), 3000);
          },
          error: () => {
            this.errorMsg = 'Error al guardar. Verifica que json-server esté corriendo.';
            this.submitting = false;
          },
        });
      },
      error: (err) => {
        console.error('Error al obtener IDs:', err);
        this.errorMsg = 'Error de conexión al calcular el ID.';
        this.submitting = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
