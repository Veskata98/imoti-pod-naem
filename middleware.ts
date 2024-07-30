// import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// Limit the middleware to paths starting with `/api/`
export const config = {
    matcher: '/',
};

// export default auth;

export function middleware(request: NextRequest) {
    const session = request.cookies.get('authjs.session-token');

    if (!session) {
        return NextResponse.redirect(new URL('/auth', request.nextUrl));
    }
}
