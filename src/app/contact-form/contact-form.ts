import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {

  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    fecha: new FormControl('', ),
    comentario: new FormControl(''),
    politicaCheck: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    const saveData = localStorage.getItem('applyForm');
    if (saveData) {
      this.applyForm.setValue(JSON.parse(saveData));
    }
  }
  sumitApplication(){

    localStorage.setItem('applyForm', JSON.stringify(this.applyForm.value));

    console.log("Formulario guardado y enviado ",this.applyForm.value);
    alert(`Application received: ${this.applyForm.value.firstName}, we save your data.`);
  }

  protected readonly localStorage = localStorage;
}
