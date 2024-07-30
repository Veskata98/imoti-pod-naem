import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

import { createDBUserFromOAuth } from '@/actions/userActions';
import prisma from './db';

export const {
    auth,
    handlers: { GET, POST },
} = NextAuth({
    session: { strategy: 'jwt', maxAge: 60 },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
        credentials({
            credentials: {
                email: {},
                username: {},
                password: {},
            },
            async authorize(credentials, req) {
                const username =
                    (credentials.username as string)?.toLowerCase() || (credentials.email as string)?.toLowerCase();
                const password = credentials.password as string;

                const user = await prisma.user.findFirst({
                    where: { OR: [{ email: username }, { name: username }] },
                });

                const comparePassword = await bcrypt.compare(password, user?.password || '');

                if (comparePassword) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                }

                //Return null in case user not exist or credentials are incorrect
                return null;
            },
        }),
    ],
    callbacks: {
        // async redirect({ url, baseUrl }) {
        //     // Allows relative callback URLs
        //     if (url.startsWith('/')) return `${baseUrl}${url}`;
        //     // Allows callback URLs on the same origin
        //     else if (new URL(url).origin === baseUrl) return url;
        //     return baseUrl;
        // },
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                await createDBUserFromOAuth(user);
            }

            return true;
        },
        async authorized({ request, auth }) {
            const url = request.nextUrl;
            console.log(url, auth);

            return true;
        },
    },
});
