import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './shared/cart/cart.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'cart', component: CartComponent }
];
