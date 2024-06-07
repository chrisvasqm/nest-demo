import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BooksModule} from './books/books.module';
import {MemberstackController} from './memberstack/memberstack.controller';
import {MemberstackService} from './memberstack/memberstack.service';
import {EmailController} from './email/email.controller';
import {EmailService} from './email/email.service';
import {EmailModule} from './email/email.module';

@Module({
  imports: [BooksModule, EmailModule],
  controllers: [AppController, MemberstackController, EmailController],
  providers: [AppService, MemberstackService, EmailService],
})
export class AppModule {}
