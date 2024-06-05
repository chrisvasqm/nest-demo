import {Injectable} from '@nestjs/common';
import Book from './books.model';

interface BookQuery {
  genre: string;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    {id: 1, name: 'Clean Code', genre: 'Software'},
    {id: 2, name: 'Art of War', genre: 'Philosophy'},
    {id: 3, name: 'Pragmatic Programmer', genre: 'Software'},
  ];

  getAll(query?: BookQuery) {
    const {genre} = query;

    if (genre)
      return this.books.filter((book) =>
        book.genre.toLowerCase().includes(genre.toLowerCase()),
      );

    return this.books;
  }

  find(id: number) {
    return this.books.find((book) => book.id === id);
  }

  create(book: Book) {
    this.books.push({id: this.books.length + 1, ...book});
  }
}
