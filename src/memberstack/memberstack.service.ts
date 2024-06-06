import admin from '@memberstack/admin';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {CreateMemberDto} from './memberstack.dto';

const memberstack = admin.init(process.env.MEMBERSTACK_TEST_SECRET_KEY);

@Injectable()
export class MemberstackService {
  getAll() {
    return memberstack.members.list();
  }

  async find(id: string) {
    const {data: member} = await memberstack.members.retrieve({id});
    if (!member) throw new NotFoundException();

    return member;
  }

  async create(member: CreateMemberDto) {
    const {data: foundMember} = await memberstack.members.retrieve({
      id: member.email,
    });

    if (foundMember) throw new BadRequestException('Email already taken');

    return memberstack.members.create({
      email: member.email,
      password: member.password,
    });
  }
}
