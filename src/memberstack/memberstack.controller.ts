import {Body, Controller, Get, Param, Post, Res} from '@nestjs/common';
import {Response} from 'express';
import {CreateMemberDto} from './memberstack.dto';
import {MemberstackService} from './memberstack.service';

@Controller('/api/memberstack')
export class MemberstackController {
  constructor(private readonly service: MemberstackService) {}

  @Get()
  async getAll(@Res() response: Response) {
    response.send(await this.service.getAll());
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return this.service.find(id);
  }

  @Post()
  async create(@Body() member: CreateMemberDto) {
    return this.service.create(member);
  }
}
