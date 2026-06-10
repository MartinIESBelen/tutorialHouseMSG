import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  styleUrls: ['./app.css'],
  template: `
    <main>
      <header class="brand-name" style="display: flex; justify-content: space-between; align-items: center; padding-right: 30px;">

        <a [routerLink]="['/']">
          <img class="brand-logo" src="/casa.png" alt="logo" aria-hidden="true">
        </a>

        <a [routerLink]="['/favoritos']" style="text-decoration: none; color: var(--primary-color); font-weight: bold; font-size: 18px;">
          ⭐ Mis Favoritos
        </a>

      </header>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,

})
export class App {
  title = 'Homes';
}
