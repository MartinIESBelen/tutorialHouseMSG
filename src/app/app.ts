import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  styleUrls: ['./app.css'],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/casa.png" alt="logo" aria-hidden="true">
        </header>
      </a>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,

})
export class App {
  title = 'Homes';
}
