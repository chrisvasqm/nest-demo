import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMemberDto, UpdateMemberDto } from './memberstack.dto';
import { MemberstackService } from './memberstack.service';

@ApiTags('Memberstack')
@Controller('/api/memberstack')
export class MemberstackController {
  constructor(private readonly service: MemberstackService) { }

  @Get()
  @ApiOperation({ summary: 'Get all Members' })
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a Member by their id' })
  async find(@Param('id') id: string) {
    return this.service.find(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Member' })
  async create(@Body() member: CreateMemberDto) {
    return this.service.create(member);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Member by their id' })
  update(@Param('id') id: string, @Body() member: UpdateMemberDto) {
    this.service.find(id);

    return this.service.update(id, member);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Member by their id' })
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Post('/decode')
  @ApiOperation({ summary: `Decode a Member's token` })
  decode(@Body('token') token: string) {
    return this.service.decode(token);
  }
}
