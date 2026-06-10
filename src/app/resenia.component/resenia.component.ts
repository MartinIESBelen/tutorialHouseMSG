import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Resenia {
  nombre: string;
  fecha: string;
  estrellas: number;
  comentario: string;
}

@Component({
  selector: 'app-resenias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.css']
})
export class ReseniaComponent {
  @Input() listaResenias: Resenia[] = [];

  get mediaEstrellas(): number {
    if (!this.listaResenias || this.listaResenias.length === 0) return 0;
    const suma = this.listaResenias.reduce((acc, res) => acc + res.estrellas, 0);
    return suma / this.listaResenias.length;
  }

  get reseniasOrdenadas(): Resenia[] {
    if (!this.listaResenias) return [];

    return [...this.listaResenias].sort((a, b) => {
      const [diaA, mesA, anioA] = a.fecha.split('/').map(Number);
      const [diaB, mesB, anioB] = b.fecha.split('/').map(Number);

      const fechaA = new Date(anioA, mesA - 1, diaA);
      const fechaB = new Date(anioB, mesB - 1, diaB);

      return fechaB.getTime() - fechaA.getTime();
    });
  }
}
