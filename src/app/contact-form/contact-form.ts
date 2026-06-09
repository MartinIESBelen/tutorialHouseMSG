import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { futureDateValidator } from '../utils/validators';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {

  @Input() housingLocationId!: number;

  lastSavedDate: string | null = null;

  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    fecha: new FormControl('', [Validators.required, futureDateValidator()]),
    comentario: new FormControl(''),
    politicaCheck: new FormControl(false, [Validators.requiredTrue]),
  });

  get storageKey(): string {
    return `applyForm_${this.housingLocationId}`;
  }

  ngOnInit(): void {
    const saveData = localStorage.getItem(this.storageKey);
    if (saveData) {
      const parsedData = JSON.parse(saveData);
      this.applyForm.patchValue(parsedData);
      this.lastSavedDate = parsedData.fecha || null;

      this.applyForm.disable();
    }
  }

  sumitApplication() {
    if (this.lastSavedDate) {
      alert("Ya has contactado con nosotros para esta vivienda. Por favor, espere una respuesta.");
      return;
    }

    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.applyForm.value));
    this.lastSavedDate = this.applyForm.value.fecha || null;

    this.applyForm.disable();

    console.log("Formulario guardado y enviado ", this.applyForm.value);
    alert(`Solicitud recibida: ${this.applyForm.value.firstName}, hemos guardado tus datos para esta vivienda.`);
  }
}
