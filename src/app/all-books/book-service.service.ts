import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookData } from './book-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  http = inject(HttpClient);

  constructor() {}

  loadBooks(): Observable<any> {
    const url = 'http://localhost:1601/book/all';
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Credentials': 'true',
      }),
    });
  }
}
