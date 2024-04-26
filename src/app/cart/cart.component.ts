import { BookData } from './../all-books/book-data';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
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
  allBooksPrice: number = 0;
  shippingPrice = 50;

  ngOnInit(): void {
    this.getCartBooks();
    this.calcAllBooksPrice();
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
    this.calcAllBooksPrice();
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
    this.calcAllBooksPrice();
  }

  removeBook(bookId: string) {
    this.cartService.removeFromCart(bookId);
    this.getCartBooks();
    this.calcAllBooksPrice();
  }

  calcAllBooksPrice() {
    let totalBooksPrice = 0;
    this.cartBooks?.map(
      (book) => (totalBooksPrice += book.price * book.orderedNumber)
    );
    this.allBooksPrice = totalBooksPrice;
  }
}
