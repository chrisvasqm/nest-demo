import admin from '@memberstack/admin';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMemberDto, UpdateMemberDto } from './memberstack.dto';

const memberstack = admin.init(process.env.MEMBERSTACK_TEST_SECRET_KEY);

@Injectable()
export class MemberstackService {
  getAll() {
    return memberstack.members.list();
  }

  async find(id: string) {
    const { data: member } = await memberstack.members.retrieve({ id });
    if (!member) throw new NotFoundException();

    return member;
  }

  async create(member: CreateMemberDto) {
    const { data: foundMember } = await memberstack.members.retrieve({
      id: member.email,
    });

    if (foundMember) throw new BadRequestException('Email already taken');

    const { data: createdMember } = await memberstack.members.create({
      email: member.email,
      password: member.password,
    });

    return createdMember;
  }

  async update(id: string, member: UpdateMemberDto) {
    const { data: updatedMember } = await memberstack.members.update({
      id: id,
      data: member,
    });

    return updatedMember;
  }

  async delete(id: string) {
    const { data: member } = await memberstack.members.delete({ id });

    return member;
  }

  async decode(token: string): Promise<any> {
    if (!token) throw new BadRequestException('token is required');

    try {
      const decoded = await memberstack.verifyToken({ token: token });
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export interface DecodedMember {
  id: string,
  planConnections: DecodedPlan[]
}

interface DecodedPlan {
  id: string,
  active: boolean,
  planName: string
}