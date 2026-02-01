import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 1. Importamos esto para la navegación

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // 2. Solo necesitamos RouterModule aquí
  // 3. Borramos 'templateUrl' para usar solo el template de abajo
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
        </header>
      </a>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  // Si tienes estilos en app.css úsalos, si no, puedes ponerlos aquí inline como en el tutorial
  styles: [`
    :host {
      --content-padding: 10px;
    }
    header {
      display: block;
      height: 60px;
      padding: var(--content-padding);
      box-shadow: 0px 5px 25px var(--shadow-color);
    }
    .content {
      padding: var(--content-padding);
    }
  `]
})
export class App {
  title = 'Homes';
}
