import { AuthForm } from '@/components/auth/AuthForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthPage() {
    const session = await auth();

    if (session) {
        redirect('/');
    }

    return <AuthForm />;
}
