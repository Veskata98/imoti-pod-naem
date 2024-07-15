'use client';

import Image from 'next/image';
import { User } from 'next-auth';
import { useEffect, useRef, useState } from 'react';
import { UserModal } from './UserModal';

export const UserButton = ({ user }: { user: User }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const onClose = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={buttonRef}>
            <button onClick={() => setIsModalOpen(true)} className="flex gap-2 justify-center items-center">
                <div>
                    <Image src={user.image || '/no-avatar.png'} alt="" width={28} height={28} className="rounded-md" />
                </div>
                <p className="font-semibold text-sm">{user.name?.split(' ').shift()}</p>
            </button>
            <UserModal isOpen={isModalOpen} onClose={onClose} />
        </div>
    );
};
