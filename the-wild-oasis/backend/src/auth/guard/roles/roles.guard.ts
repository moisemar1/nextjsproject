import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enums/role.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const user = context.switchToHttp().getRequest().user;
    //console.log({ user });
    //console.log({ requiredRoles });
    const hasRequiredRoles = requiredRoles.some(
      (role) => user.userType === role,
    );
    return hasRequiredRoles;
  }
}
