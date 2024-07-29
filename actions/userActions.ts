'use server';

import prisma from '@/lib/db';
import { User } from 'next-auth';
import bcrypt from 'bcrypt';

import { z } from 'zod';

export const createDBUserFromOAuth = async (user: User) => {
    const existingUser = await prisma.user.findFirst({ where: { email: user.email || '' } });

    if (existingUser) {
        return;
    }

    await prisma.user.create({
        data: {
            email: user.email!,
            image: user?.image,
            name: user.name,
        },
    });
};

export const registerWithCredentials = async (formData: FormData) => {
    try {
        const email = (formData.get('email') as string).toLowerCase();
        const username = (formData.get('username') as string).toLowerCase();
        const password = formData.get('password') as string;
        const confirm_password = formData.get('confirm_password') as string;

        const RegisterSchema = z.object({
            email: z.string().email('Невалиден имейл адрес'),
            username: z.string().min(5, 'Потребителското име трябва да съдържа поне 5 символа'),
            password: z.string().min(8, 'Паролата трябва да съдържа поне 8 символа'),
            confirm_password: z.string().min(8, 'Паролата трябва да съдържа поне 8 символа'),
        });

        const zodResult = RegisterSchema.safeParse({ email, username, password, confirm_password });

        if (!zodResult.success) {
            const errorsObj: { [x: string]: string } = {};
            zodResult.error.errors.map((error) => (errorsObj[error.path[0]] = error.message));
            return { success: false, errors: errorsObj };
        }

        if (password !== confirm_password) {
            return { success: false, errors: { ['confirm_password']: 'Паролите не съвпадат' } };
        }

        const alreadyRegistered = await prisma.user.findFirst({
            where: {
                OR: [{ email: email }, { name: username }],
            },
            select: {
                email: true,
                name: true,
            },
        });

        if (alreadyRegistered) {
            if (alreadyRegistered.email === email) {
                return { success: false, errors: { email: 'Този имейл вече съществува' } };
            } else if (alreadyRegistered.name === username) {
                return { success: false, errors: { username: 'Това потребителско име вече съществува' } };
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({ data: { email, name: username, password: hashedPassword } });
        return { success: true, errors: null };
    } catch (error) {
        console.log('[REGISTER_USER]Server Error');
        return { success: false, errors: { server: 'Something went wrong' } };
    }
};
