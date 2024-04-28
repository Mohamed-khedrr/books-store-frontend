import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderData } from './order-data';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http = inject(HttpClient);
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  saveOrder(order: OrderData): Observable<any> {
    const url = 'http://localhost:1601/order';
    return this.http.post(url, order, { headers: this.headers });
  }
}
