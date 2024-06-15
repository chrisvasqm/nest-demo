import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
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
});
