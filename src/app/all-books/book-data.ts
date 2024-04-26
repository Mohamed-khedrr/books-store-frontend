export interface BookData {
  id: string;
  title: string;
  author: string;
  cover_photo: string;
  price: number;

  category?: string;
  number_of_available_copies?: string;
  pages?: number;
  publisher?: string;
  year_of_publishing?: string;
}
