import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { DecodedMember, MemberstackService } from 'src/memberstack/memberstack.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly service: MemberstackService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'] as string;

    if (!authorization)
      throw new UnauthorizedException('Authorization header missing');

    const token = authorization.split(' ')[1];
    if (!token)
      throw new UnauthorizedException('Invalid authorization header format');

    const user = await this.service.decode(token) as DecodedMember;
    if (!user)
      throw new UnauthorizedException('Invalid token');

    request.user = await this.service.find(user.id);

    return true;
  }
}

