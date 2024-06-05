import {Body, Controller, Get, Param, Post, Query, Res} from '@nestjs/common';
import {BooksService} from './books.service';
import {Response} from 'express';
import Book from './books.model';

@Controller('/api/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  getAll(@Res() response: Response, @Query('genre') genre?: string) {
    response.send(this.service.getAll({genre}));
  }

  @Get(':id')
  find(@Res() response: Response, @Param('id') id: string) {
    const bookId = parseInt(id);
    if (isNaN(bookId)) return response.status(404).send('Book not found');

    const book = this.service.find(bookId);
    if (!book) return response.status(404).send('Book not found');

    response.send(book);
  }

  @Post()
  create(@Body() book: Book, @Res() response: Response) {
    this.service.create(book);

    response.status(201).send(book);
  }
}
