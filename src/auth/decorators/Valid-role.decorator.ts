import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ValidRole = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;
  if (user.role === data) {
    return true;
  }

  throw new UnauthorizedException(
    'No tiene permisos para realizar esta acción!',
  );
});
