import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './books.dto';
import { Book } from './books.entity';

interface BookQuery {
  genre?: string;
}

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repository: Repository<Book>) { }

  async getAll(query?: BookQuery) {
    if (query && query.genre)
      return await this.repository.find({ where: { genre: query.genre } });

    return await this.repository.find();
  }

  async find(id: number) {
    const book = await this.repository.findOne({ where: { id } });
    if (!book) throw new NotFoundException();

    return book;
  }

  async create(book: CreateBookDto) {
    const newBook = this.repository.create(book);

    return await this.repository.save(newBook);
  }

  async update(id: number, book: UpdateBookDto) {
    await this.find(id);
    await this.repository.update({ id }, book);

    return { id, ...book };
  }

  async delete(id: number) {
    const book = await this.find(id);
    await this.repository.delete({ id });

    return book;
  }
}
