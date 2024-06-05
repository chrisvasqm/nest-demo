import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
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
  find(@Param('id', ParseIntPipe) id: number) {
    return this.service.find(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBookDto: CreateBookDto) {
    this.service.create(createBookDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.service.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
