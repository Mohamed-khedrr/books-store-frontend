export interface BookData {
  id: string;
  title: string;
  author: string;
  coverPhoto: string;
  price: number;
  publisher: string;
  pages: number;
  orderedNumber: number;
  number_of_available_copies: number;
  category?: string;
  yearOfPublishing?: number;
}
