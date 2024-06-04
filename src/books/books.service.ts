import {Injectable} from '@nestjs/common';
import Book from './books.model';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [
    {id: 1, name: 'Clean Code'},
    {id: 1, name: 'Art of War'},
    {id: 1, name: 'Pragmatic Programmer'},
  ];

  getAll() {
    return this.books;
  }

  find(id: number) {
    return this.books.find((book) => book.id === id);
  }
}
