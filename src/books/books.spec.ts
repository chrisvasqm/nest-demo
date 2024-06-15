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
    it('should return an empty list given no Books have been created', () => {
      return request(app.getHttpServer())
        .get('/api/books')
        .expect(200)
        .expect(response => {
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body.length).toBe(0);
        });
    });
  });
});
