/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const url = req.url;
  const token = req.cookies.get('token')?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));

  if (url.includes('/admin') && !verifiedToken) {
    return NextResponse.redirect(new URL('/login', url));
  }

  if (url.includes('/login')) {
    if (verifiedToken) {
      console.log('login page ttt');
      return NextResponse.redirect(new URL('/admin/add-job-and-task', url));
    }
  }
}
