import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BooksModule} from './books/books.module';
import {MemberstackController} from './memberstack/memberstack.controller';
import {MemberstackService} from './memberstack/memberstack.service';

@Module({
  imports: [BooksModule],
  controllers: [AppController, MemberstackController],
  providers: [AppService, MemberstackService],
})
export class AppModule {}
