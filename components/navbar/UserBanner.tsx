import { User } from 'next-auth';
import Image from 'next/image';

export const UserBanner = ({ user }: { user: User }) => {
    return (
        <div className="flex gap-2 justify-center items-center">
            <div>
                <Image src={'/no-avatar.png'} alt="" width={28} height={28} className="rounded-full" />
            </div>
            <p className="font-semibold text-sm">{user.name?.split(' ').shift()}</p>
        </div>
    );
};
