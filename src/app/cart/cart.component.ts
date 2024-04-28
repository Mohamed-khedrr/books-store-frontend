import { BookData } from './../all-books/book-data';
import { Component, OnInit, inject } from '@angular/core';
import { CartService } from './cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  cartBooks!: BookData[] | null;

  ngOnInit(): void {
    this.getCartBooks();
    this.cartService.calcAllBooksPrice();
  }

  getCartBooks() {
    this.cartBooks = this.cartService.getBooksInCart();
  }

  stepUp(bookId: string) {
    const cartBooks = this.cartBooks;

    if (!cartBooks) return;

    cartBooks.forEach((book: BookData) => {
      if (book.id === bookId) book.orderedNumber++;
    });

    this.cartService.saveToCart(cartBooks);
  }

  stepDown(bookId: string) {
    const cartBooks = this.cartBooks;
    if (!cartBooks) return;

    cartBooks.forEach((book: BookData) => {
      if (book.id === bookId) {
        if (book.orderedNumber > 0) book.orderedNumber--;
        else book.orderedNumber = 0;
      }
    });
    this.cartService.saveToCart(cartBooks);
  }

  removeBook(bookId: string) {
    this.cartService.removeFromCart(bookId);
    this.getCartBooks();
  }
}
