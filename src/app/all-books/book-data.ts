export interface BookData {
  id: string;
  title: string;
  author: string;
  cover_photo: string;
  price: number;
  publisher: string;
  pages: number;
  orderedNumber: number;
  number_of_available_copies: number;
  category?: string;
  year_of_publishing?: number;
}
