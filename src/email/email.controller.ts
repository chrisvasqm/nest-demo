import {Controller, Post} from '@nestjs/common';
import {EmailService} from './email.service';

@Controller('/api/email')
export class EmailController {
  constructor(private readonly service: EmailService) {}

  @Post()
  send() {
    this.service.send();
  }
}
