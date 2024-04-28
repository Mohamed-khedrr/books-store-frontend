import { BookService } from './book-service.service';
import { Component, OnInit, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { BookData } from './book-data';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.scss',
})
export class AllBooksComponent implements OnInit {
  bookService = inject(BookService);
  cartService = inject(CartService);
  booksData: BookData[] | undefined;
  cartBooks!: BookData[] | null;

  ngOnInit(): void {
    this.getBooksData();
    this.cartBooks = this.cartService.getBooksInCart();
  }

  getBooksData() {
    this.bookService.loadBooks().subscribe({
      next: (res) => {
        this.booksData = res;
      },
      error: () => {
        console.log('error in getting books');
      },
    });
  }

  addToCart(data: BookData) {
    if (!this.cartBooks) this.cartBooks = [];
    data.orderedNumber = 1;
    this.cartBooks.push(data);
    this.cartService.saveToCart(this.cartBooks);
  }

  removeFromCart(bookId: string) {
    this.cartService.removeFromCart(bookId);
    this.cartBooks = this.cartService.getBooksInCart();
  }

  checkIsBookInCart(id: string): boolean {
    if (!this.cartBooks) return false;

    return this.cartBooks.some((book: BookData) => book.id === id);
  }
}
