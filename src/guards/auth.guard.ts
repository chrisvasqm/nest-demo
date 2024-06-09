import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { MemberstackService } from 'src/memberstack/memberstack.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private readonly service: MemberstackService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization)
      throw new UnauthorizedException('Authorization header missing');

    const token = authorization.split(' ')[1];

    if (!token)
      throw new UnauthorizedException('Invalid authorization header format');

    return this.service.verify(token)
  }
}
