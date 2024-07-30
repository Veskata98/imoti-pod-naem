'use client';

import Image from 'next/image';
import { User } from 'next-auth';
import { useRef, useState } from 'react';
import { UserModal } from './UserModal';

export const UserButton = ({ user }: { user: User }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const onClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative" ref={buttonRef}>
            <button onClick={() => setIsModalOpen(true)} className="flex gap-2 justify-center items-center">
                <div>
                    <Image src={user.image || '/no-avatar.png'} alt="" width={32} height={32} className="rounded-md" />
                </div>
                <p className="font-semibold text-sm hidden md:block">{user.name?.split(' ').shift()}</p>
            </button>
            <UserModal isOpen={isModalOpen} onClose={onClose} user={user} />
        </div>
    );
};
