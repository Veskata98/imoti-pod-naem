'use client';

import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export const UserBanner = ({ user }: { user: User }) => {
    return (
        <button onClick={() => signOut({ callbackUrl: '/' })} className="flex gap-2 justify-center items-center">
            <div>
                <Image src={user.image || '/no-avatar.png'} alt="" width={28} height={28} className="rounded-full" />
            </div>
            <p className="font-semibold text-sm">{user.name?.split(' ').shift()}</p>
        </button>
    );
};
