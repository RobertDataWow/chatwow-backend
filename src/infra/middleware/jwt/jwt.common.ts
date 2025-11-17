import type { ExecutionContext } from '@nestjs/common';
import { SetMetadata, createParamDecorator } from '@nestjs/common';

export const USER_CONTEXT = 'user';

export type UserJwtEncoded = {
  id: string;
};

export type UserClaims = {
  id: string;
};

export const IS_PUBLIC_KEY = 'isPublic';
export const UsePublic = () => SetMetadata(IS_PUBLIC_KEY, true);

export const UserClaims = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserClaims => {
    const req = ctx.switchToHttp().getRequest();
    const userCtx: UserJwtEncoded = req[USER_CONTEXT];

    return {
      id: userCtx.id,
    };
  },
);
