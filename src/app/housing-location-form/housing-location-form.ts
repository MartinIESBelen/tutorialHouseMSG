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
    // validar
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    // preparar objeto
    const newHouse = {
      ...this.form.value,
      photo: "",
      latitude: 0,
      longitude: 0,
    };

    //  enviar
    this.http.post('http://localhost:3000/locations', newHouse).subscribe({
      next: (res: any) => {
        this.successMsg = `¡Vivienda "${res.name}" creada con éxito!`;
        this.submitting = false;

        // esperar y volver al inicio
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Error al guardar. Asegúrate de que json-server está corriendo.';
        this.submitting = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
