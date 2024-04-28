import { Injectable } from '@angular/core';
import { BookData } from '../all-books/book-data';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numberOfItemsInCart: number = 0;
  allBooksPrice: number = 0;
  shippingPrice: number = 20;
  constructor() {}

  saveToCart(books: BookData[]) {
    this.clearCart();
    localStorage.setItem('book_cart', JSON.stringify(books));
    this.numberOfItemsInCart = books.length;
    this.calcAllBooksPrice();
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

  calcAllBooksPrice() {
    let totalBooksPrice = 0;
    const books = this.getBooksInCart();
    if (!books) return;
    books.map((book) => (totalBooksPrice += book.price * book.orderedNumber));
    this.allBooksPrice = Number(totalBooksPrice.toFixed(2));
  }
}
