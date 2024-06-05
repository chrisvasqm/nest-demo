import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateBookDto, UpdateBookDto} from './books.dto';
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
    const book = this.books.find((b) => b.id === id);
    if (!book) throw new NotFoundException();

    return book;
  }

  create(book: CreateBookDto) {
    return this.books.push({id: this.books.length + 1, ...book});
  }

  update(id: number, book: UpdateBookDto) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) throw new NotFoundException();

    this.books[index] = {...this.books[index], ...book};

    return this.books[index];
  }

  delete(id: number) {
    const deletedBook = this.find(id);
    this.books = this.books.filter((book) => book.id !== deletedBook.id);

    return deletedBook;
  }
}
