import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {CreateBookDto, UpdateBookDto} from './books.dto';
import {BooksService} from './books.service';
@Controller('/api/books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  async getAll(@Query('genre') genre?: string) {
    return this.service.getAll({genre});
  }

  @Get(':id')
  find(@Param('id') id: string) {
    const bookId = parseInt(id);
    if (isNaN(bookId)) throw new NotFoundException();

    const book = this.service.find(bookId);
    if (!book) throw new NotFoundException();

    return book;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBookDto: CreateBookDto) {
    this.service.create(createBookDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const bookId = parseInt(id);
    if (isNaN(bookId)) throw new NotFoundException();

    const existingBook = this.service.find(bookId);
    if (!existingBook) throw new NotFoundException();

    return this.service.update(bookId, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const bookId = parseInt(id);
    if (isNaN(bookId)) throw new NotFoundException();

    const book = this.service.find(bookId);
    if (!book) throw new NotFoundException();

    return this.service.delete(bookId);
  }
}
