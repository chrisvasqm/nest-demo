import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './books.dto';
import { Book } from './books.entity';

interface BookQuery {
  genre?: string;
}

@Injectable()
export class BooksService {
  constructor(@InjectEntityManager() private manager: EntityManager) { }

  async getAll(query?: BookQuery) {
    if (query && query.genre)
      return await this.manager.find(Book, { where: { genre: query.genre } });

    return await this.manager.find(Book);
  }

  async find(id: number) {
    const book = await this.manager.findOne(Book, { where: { id } });
    if (!book) throw new NotFoundException();
    return book;
  }

  async create(book: CreateBookDto) {
    const newBook = this.manager.create(Book, book);
    return await this.manager.save(newBook);
  }

  async update(id: number, book: UpdateBookDto) {
    await this.manager.update(Book, { id }, book);
    return await this.find(id);
  }

  async delete(id: number) {
    await this.manager.delete(Book, { id });
  }
}
