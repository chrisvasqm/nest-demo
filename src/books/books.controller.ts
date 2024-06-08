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
  Query
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateBookDto, UpdateBookDto } from './books.dto';
import { BooksService } from './books.service';

@ApiTags('Books')
@Controller('/api/books')
export class BooksController {
  constructor(private readonly service: BooksService) { }

  @Get()
  @ApiOperation({ summary: 'Get all Books' })
  @ApiQuery({ name: 'genre', required: false, description: 'Used to filter Books by their genre' })
  getAll(@Query('genre') genre?: string) {
    return this.service.getAll({ genre });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a given Book by their id' })
  find(@Param('id', ParseIntPipe) id: number) {
    return this.service.find(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates a new Book' })
  create(@Body() book: CreateBookDto) {
    return this.service.create(book);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a Book by their id' })
  update(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateBookDto) {
    return this.service.update(id, book);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Book by their id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
