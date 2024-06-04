import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';

@Controller('/api/cats')
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  find(@Param('id') id: string, @Res() response: Response) {
    const catId = parseInt(id);
    if (isNaN(catId)) return response.status(400).send('Cat not found');

    const cat = this.service.find(catId);
    if (!cat) return response.status(400).send('Cat not found');

    response.send(cat);
  }
}
