import { useEffect } from 'react';

import { LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';

type UserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    user: User;
};

export const UserModal = ({ isOpen, onClose, user }: UserModalProps) => {
    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm"
            onClick={onBackdropClick}
        >
            <div className="bg-white mx-8 p-8 w-full md:w-2/4 lg:w-1/3 max-w-[460px] rounded shadow-sm flex flex-col items-center">
                <div className="w-40 h-40 relative">
                    <Image src={user.image || '/no-avatar.png'} alt="" fill className="rounded-md shadow p-2" />
                </div>
                <p className="font-semibold">{user.name}</p>
                <div>
                    <button className="flex gap-1 items-center">
                        <Settings />
                        <span className="text-sm font-semibold">Настройки</span>
                    </button>
                </div>
                <div>
                    <button className="flex gap-1 items-center" onClick={() => signOut({ callbackUrl: '/' })}>
                        <LogOut />
                        <span className="text-sm font-semibold">Изход</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
