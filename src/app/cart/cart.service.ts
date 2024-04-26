import { Injectable } from '@angular/core';
import { BookData } from '../all-books/book-data';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  saveToCart(books: BookData[]) {
    this.clearCart();
    localStorage.setItem('book_cart', JSON.stringify(books));
  }

  removeFromCart(bookId: string) {
    const books = this.getBooksInCart();
    if (!books) return;
    const newBooks = books.filter((book: BookData) => book.id !== bookId);
    this.clearCart();
    this.saveToCart(newBooks);
  }

  clearCart() {
    localStorage.removeItem('book_cart');
  }

  getBooksInCart(): BookData[] | null {
    const booksData = localStorage.getItem('book_cart');
    if (!booksData) return null;
    else return JSON.parse(booksData) as BookData[];
  }
}
