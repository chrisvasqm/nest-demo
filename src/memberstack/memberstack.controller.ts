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
  async find(@Param('id') id: string, @Res() response: Response) {
    const {data: member} = await this.service.find(id);
    if (!member) response.status(404).send('Member not found');

    response.send(member);
  }

  @Post()
  async create(@Res() response: Response, @Body() member: CreateMemberDto) {
    const {data: existingMember} = await this.service.find(member.email);
    if (existingMember) return response.status(400).send('Email already taken');

    const createdMember = await this.service.create(member);

    response.status(201).send(createdMember);
  }
}
