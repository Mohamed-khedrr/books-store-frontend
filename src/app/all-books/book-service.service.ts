import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookData } from './book-data';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor() {}
  private booksData: BookData[] = [
    {
      id: '1',
      title: 'Leave the World Behind: A Read with Jenna Pick',
      author: 'Rumaan Alam',
      price: 100,
      cover_photo:
        'https://cherryblossom-books.com/wp-content/uploads/2024/01/9780062667649_b8b25d6d-e760-45cd-8bb3-e4cb397623e1.jpg',
    },
    {
      id: '2',
      title: 'Leave the World Behind: A Read with Jenna Pick',
      author: 'Rumaan Alam',
      price: 50,
      cover_photo:
        'https://cherryblossom-books.com/wp-content/uploads/2024/01/lf6-1.jpeg',
    },
  ];

  loadBooks(): Observable<any> {
    return new Observable<any>((observer) => {
      setTimeout(() => {
        observer.next({ body: this.booksData });
      }, 500);
    });
  }
}
