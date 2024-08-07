'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export const GoogleBtn = () => {
    return (
        <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="flex gap-2 items-center hover:bg-primary-50 py-2 px-4 rounded"
        >
            <Image src="/google.png" alt="" width={32} height={32} className="rounded-full" />
            <p className="">Влез с Google</p>
        </button>
    );
};
