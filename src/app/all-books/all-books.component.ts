import { BookService } from './book-service.service';
import { Component, OnInit, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { BookData } from './book-data';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.scss',
})
export class AllBooksComponent implements OnInit {
  bookService = inject(BookService);
  booksData: BookData[] | undefined;

  ngOnInit(): void {
    this.getBooksData();
  }

  getBooksData() {
    this.bookService.loadBooks().subscribe({
      next: (res) => {
        this.booksData = res.body;
        console.log(this.booksData);
      },
      error: () => {
        console.log('error in getting books');
      },
    });
  }

  addToCart(data: BookData) {}

  checkIsBookInCart(id: string): boolean {
    return false;
  }
}
