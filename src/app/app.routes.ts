import { Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', component: AllBooksComponent },
  { path: 'cart', component: CartComponent },
];
