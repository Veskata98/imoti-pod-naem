import { useEffect } from 'react';
import { User } from 'next-auth';
import { LogOut, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';

type UserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const UserModal = ({ isOpen, onClose }: UserModalProps) => {
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
            className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white p-6 rounded-md shadow-md w-80 flex justify-between items-center"
            onClick={(e) => e.stopPropagation()}
        >
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
    );
};
