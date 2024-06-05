import {Controller, Get, Param, Res} from '@nestjs/common';
import {BooksService} from './books.service';
import {Response} from 'express';

@Controller('/api/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  getAll(@Res() response: Response) {
    response.send(this.service.getAll());
  }

  @Get(':id')
  find(@Res() response: Response, @Param('id') id: string) {
    const bookId = parseInt(id);
    if (isNaN(bookId)) return response.status(404).send('Book not found');

    const book = this.service.find(bookId);
    if (!book) return response.status(404).send('Book not found');

    response.send(book);
  }
}
