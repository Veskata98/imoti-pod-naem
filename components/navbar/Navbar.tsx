import Link from 'next/link';
import { LoginBtn } from './LoginBtn';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { UserBanner } from './UserBanner';

export const Navbar = async () => {
    const session = await auth();

    return (
        <nav className="py-4 px-8 bg-sky-300">
            <div className="w-full lg:w-2/3 mx-auto">
                <div className="flex justify-between items-center">
                    <Link href="/" className="font-semibold text-xl">
                        RentHome
                    </Link>

                    {session?.user ? <UserBanner user={session.user} /> : <LoginBtn />}
                </div>
            </div>
        </nav>
    );
};
