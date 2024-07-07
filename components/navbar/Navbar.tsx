import Link from 'next/link';
import { auth } from '@/lib/auth';

import { UserBanner } from './UserBanner';

import { LoginRedirectBtn } from './LoginRedirectBtn';

export const Navbar = async () => {
    const session = await auth();

    console.log(session?.user);

    return (
        <nav className="h-[56px] bg-primary-300 px-8">
            <div className="w-full lg:w-2/3 mx-auto h-full">
                <div className="flex justify-between items-center h-full">
                    <Link href="/" className="font-semibold text-xl">
                        RentHome
                    </Link>

                    {session?.user ? <UserBanner user={session.user} /> : <LoginRedirectBtn />}
                </div>
            </div>
        </nav>
    );
};
