import { tokenService } from 'resources/token';

import { COOKIES } from 'app-constants';
import { AppKoaContext } from 'types';

import cookieHelper from './auth.helper';

const setUserId = async (ctx: AppKoaContext, userId: string) => {
  cookieHelper.setCookies({
    ctx,
    field: COOKIES.USER_ID,
    value: userId,
  });
};

const setTokens = async (ctx: AppKoaContext, userId: string, isShadow?: boolean) => {
  const { accessToken } = await tokenService.createAuthTokens({ userId, isShadow });

  if (accessToken) {
    cookieHelper.setCookies({
      ctx,
      field: COOKIES.ACCESS_TOKEN,
      value: accessToken,
    });
  }
};

const unsetTokens = async (ctx: AppKoaContext) => {
  await tokenService.removeAuthTokens(ctx.state.accessToken);

  cookieHelper.unsetCookies({ ctx, field: COOKIES.ACCESS_TOKEN });
};

const unsetUserId = async (ctx: AppKoaContext) => {
  cookieHelper.unsetCookies({ ctx, field: COOKIES.USER_ID });
};

export default {
  setTokens,
  unsetTokens,
  setUserId,
  unsetUserId,
};
