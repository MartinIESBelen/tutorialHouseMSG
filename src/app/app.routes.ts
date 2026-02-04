import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { HousingLocationForm} from './housing-location-form/housing-location-form';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Details Page',
  },
  {
    path: 'add',
    component: HousingLocationForm,
    title: 'Add Location',
  }

];
