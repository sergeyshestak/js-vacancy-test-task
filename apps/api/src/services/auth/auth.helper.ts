import psl from 'psl';
import url from 'url';

import config from 'config';

import { TOKEN_SECURITY_EXPIRES_IN } from 'app-constants';
import { AppKoaContext } from 'types';

export const setCookies = ({
  ctx,
  field,
  value,
  expires = new Date(Date.now() + TOKEN_SECURITY_EXPIRES_IN * 1000),
}: {
  ctx: AppKoaContext;
  field: string;
  value: string;
  expires?: Date;
}) => {
  const parsedUrl = url.parse(config.WEB_URL);

  if (!parsedUrl.hostname) {
    return;
  }

  const parsed = psl.parse(parsedUrl.hostname) as psl.ParsedDomain;
  const cookiesDomain = parsed.domain || undefined;

  ctx.cookies.set(field, value, {
    httpOnly: true,
    domain: cookiesDomain,
    expires,
  });
};

export const unsetCookies = ({ ctx, field }: { ctx: AppKoaContext; field: string }) => {
  ctx.cookies.set(field, null);
};

export default {
  setCookies,
  unsetCookies,
};
