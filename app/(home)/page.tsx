import { auth } from '@/lib/auth';

export default async function Home() {
    const session = await auth();

    return (
        <main className="flex min-h-full flex-col items-center justify-between">
            <div>{JSON.stringify(session, null, 2)}</div>
        </main>
    );
}
