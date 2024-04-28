import { BookData } from '../all-books/book-data';

export interface OrderData {
  customerName: string;
  customerAddress: string;
  orderDate: string;
  totalAmount: number;
  items: {
    item: BookData;
    numberOfCopies: number;
  }[];
}
