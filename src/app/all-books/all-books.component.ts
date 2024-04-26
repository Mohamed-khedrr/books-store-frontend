import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.scss',
})
export class AllBooksComponent {}
