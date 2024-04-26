import { Injectable } from '@angular/core';
import { BookData } from '../all-books/book-data';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numberOfItemsInCart: number = 0;

  constructor() {}

  saveToCart(books: BookData[]) {
    this.clearCart();
    localStorage.setItem('book_cart', JSON.stringify(books));
    this.numberOfItemsInCart = books.length;
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
    this.numberOfItemsInCart = 0;
  }

  getBooksInCart(): BookData[] | null {
    const booksData = localStorage.getItem('book_cart');
    if (!booksData) return null;
    const books = JSON.parse(booksData) as BookData[];
    this.numberOfItemsInCart = books.length;
    return books;
  }
}
