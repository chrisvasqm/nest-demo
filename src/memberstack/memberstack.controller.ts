import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CreateMemberDto, UpdateMemberDto} from './memberstack.dto';
import {MemberstackService} from './memberstack.service';

@Controller('/api/memberstack')
export class MemberstackController {
  constructor(private readonly service: MemberstackService) {}

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return this.service.find(id);
  }

  @Post()
  async create(@Body() member: CreateMemberDto) {
    return this.service.create(member);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() member: UpdateMemberDto) {
    this.service.find(id);

    return this.service.update(id, member);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
