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
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookDto, UpdateBookDto } from './books.dto';
import { Book } from './books.entity';
import { BooksService } from './books.service';

@ApiTags('Books')
@Controller('/api/books')
export class BooksController {
  constructor(private readonly service: BooksService) { }

  @Get()
  @ApiOperation({ summary: 'Get all Books' })
  @ApiQuery({ name: 'genre', required: false, description: 'Used to filter Books by their genre' })
  @ApiResponse({ status: 200, type: Book, isArray: true })
  getAll(@Query('genre') genre?: string) {
    return this.service.getAll({ genre });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a given Book by their id' })
  @ApiResponse({ status: 200, type: Book })
  @ApiResponse({ status: 404, description: 'Not found' })
  find(@Param('id', ParseIntPipe) id: number) {
    return this.service.find(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates a new Book' })
  @ApiResponse({ status: 201, type: Book })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() book: CreateBookDto) {
    return this.service.create(book);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a Book by their id' })
  @ApiResponse({ status: 200, type: Book })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateBookDto) {
    return this.service.update(id, book);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Book by their id' })
  @ApiResponse({ status: 200, type: Book })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
