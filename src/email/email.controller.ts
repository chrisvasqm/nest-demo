import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('/api/email')
export class EmailController {
  constructor(private readonly service: EmailService) { }

  @Post()
  @ApiOperation({ summary: 'Sends a test email' })
  send() {
    this.service.send();
  }
}
