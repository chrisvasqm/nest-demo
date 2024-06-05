import {Injectable} from '@nestjs/common';
import admin from '@memberstack/admin';
import {CreateMemberDto} from './memberstack.dto';

const memberstack = admin.init(process.env.MEMBERSTACK_TEST_SECRET_KEY);

@Injectable()
export class MemberstackService {
  getAll() {
    return memberstack.members.list();
  }

  find(id: string) {
    return memberstack.members.retrieve({id});
  }

  create(member: CreateMemberDto) {
    return memberstack.members.create({
      email: member.email,
      password: member.password,
    });
  }
}
