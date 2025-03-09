import { NextRequest, NextResponse } from 'next/server';

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: ['/preview/:path*'],
};

export function middleware(req: NextRequest) {
  if (
    process.env.NODE_ENV === 'development' ||
    !process.env.BASIC_ID ||
    !process.env.BASIC_PWD
  ) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('Authorization');

  if (!basicAuth) {
    return NextResponse.json(
      { error: 'Please enter credentials' },
      {
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
        status: 401,
      },
    );
  }

  const authValue = basicAuth.split(' ')[1];
  const [user, password] = atob(authValue).split(':');

  if (user === process.env.BASIC_ID && password === process.env.BASIC_PWD) {
    return NextResponse.next();
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    {
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      status: 401,
    },
  );
}
