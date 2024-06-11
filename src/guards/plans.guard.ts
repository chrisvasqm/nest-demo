import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { DecodedMember } from 'src/memberstack/memberstack.service';
import { Plans } from '../enums/plans.enum';

@Injectable()
export class PlansGuard implements CanActivate {
  constructor(private readonly validPlans: Plans[]) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as DecodedMember;
    if (!user)
      throw new UnauthorizedException('Access denied');

    const activePlans = user.planConnections.filter(plan => plan.active);
    const hasValidPlan = activePlans.some(plan => this.validPlans.includes(plan.planName as Plans));
    if (!hasValidPlan)
      throw new UnauthorizedException('Access denied');

    return true;
  }
}
