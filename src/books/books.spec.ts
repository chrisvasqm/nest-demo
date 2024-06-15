import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository, RepositoryNotTreeError } from 'typeorm';
import { Book } from './books.entity';
import { BooksModule } from './books.module';

describe('Books', () => {
  let app: INestApplication;
  let repository: Repository<Book>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'postgres',
          database: 'test-nest-demo',
          entities: [Book],
          synchronize: true
        }),
        BooksModule
      ]
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    repository = app.get<Repository<Book>>(getRepositoryToken(Book));
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await repository.query(`TRUNCATE TABLE "book" RESTART IDENTITY CASCADE;`);
  });

  describe('GET', () => {
    it('should return an empty list given no Books have been created', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/books');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should return multiple Books given they exist', async () => {
      await request(app.getHttpServer())
        .post('/api/books')
        .send({ name: 'book1', genre: 'genre1' });

      await request(app.getHttpServer())
        .post('/api/books')
        .send({ name: 'book2', genre: 'genre2' });

      const response = await request(app.getHttpServer())
        .get('/api/books');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
    });

    it('should return a single Book by their id given it exists', async () => {
      const book = { name: 'book', genre: 'genre' };
      await request(app.getHttpServer())
        .post('/api/books')
        .send(book);

      const response = await request(app.getHttpServer())
        .get('/api/books/1');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(book);
    });

    it('should return 404 Not Found if the given book does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/books/1');

      expect(response.status).toBe(404);
    });
  });

  describe('POST', () => {
    it('should create a new Book', async () => {
      const book = { name: 'book', genre: 'genre' };
      const response = await request(app.getHttpServer())
        .post('/api/books')
        .send(book);

      expect(response.status).toBe(201)
      expect(response.body).toMatchObject(book);
    });

    [
      { name: '', genre: 'genre' },
      { name: true, genre: 'genre' },
      { name: 'book', genre: '' },
      { name: 'book', genre: true },
    ].forEach(book => {
      it(`should return 400 Bad Request given an invalid name: ${book.name} or genre: ${book.genre}`, async () => {
        const response = await request(app.getHttpServer())
          .post('/api/books')
          .send(book);

        console.log(response);

        expect(response.status).toBe(400);
      });
    });

  });

  describe('PUT', () => {
    it('should return an updated Book', async () => {
      const book = { name: 'updated book', genre: 'updated genre' };
      await request(app.getHttpServer())
        .post('/api/books')
        .send({ name: 'book', genre: 'genre' });

      const response = await request(app.getHttpServer())
        .put('/api/books/1')
        .send(book);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(book);
    });

    [
      { name: '', genre: 'genre' },
      { name: true, genre: 'genre' },
      { name: 'book', genre: '' },
      { name: 'book', genre: true },
    ].forEach(book => {
      it(`should return a 400 Bad Request with invalid name: ${book.name} or genre: ${book.genre}`, async () => {
        await request(app.getHttpServer())
          .post('/api/books')
          .send({ name: 'book', genre: 'genre' });

        const response = await request(app.getHttpServer())
          .put('/api/books/1')
          .send(book);

        expect(response.status).toBe(400);
      });
    })
  });

  describe('DELETE', () => {
    it('should delete an existing Book', async () => {
      const book = { name: 'book', genre: 'genre' };
      await request(app.getHttpServer())
        .post('/api/books')
        .send(book);

      const response = await request(app.getHttpServer())
        .delete('/api/books/1');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(book);
    });
  })
});
