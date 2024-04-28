import { OrderData } from './order-data';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { BookData } from '../all-books/book-data';
import { OrderService } from './order.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  formBuilder = inject(FormBuilder);
  cartService = inject(CartService);
  orderService = inject(OrderService);

  orderForm = this.formBuilder.group({
    userName: ['', Validators.required],
    userAddress: ['', Validators.required],
    userPhoneNumber: ['', Validators.required],
  });

  get userName() {
    return this.orderForm.controls.userName;
  }

  get userAddress() {
    return this.orderForm.controls.userAddress;
  }

  get userPhoneNumber() {
    return this?.orderForm?.controls?.userPhoneNumber;
  }

  saveOrder() {
    const orderData: OrderData = this.handleOrderData() as OrderData;
    if (!orderData) return;
    this.orderService.saveOrder(orderData).subscribe({
      next: (res) => {
        console.log('Order Saved ', res);
      },
      error: (err) => {
        console.log('Error in saving Order', err);
      },
    });
  }

  handleOrderData(): OrderData | undefined {
    const booksListData = this.handleItemsList();
    if (!booksListData) return;
    const orderData: OrderData = {
      customerAddress: this.userAddress.value as string,
      customerName: this.userName.value as string,
      orderDate: new Date(),
      totalAmount: 1,
      items: booksListData,
    };
    console.log(orderData);
    return orderData;
  }

  handleItemsList(): { item: BookData; numberOfCopies: number }[] | undefined {
    const booksList = this.cartService.getBooksInCart();
    const newFormatedBooksList = booksList?.map((book) => ({
      item: book,
      numberOfCopies: book.orderedNumber,
    }));

    return newFormatedBooksList;
  }
}
