import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="h-full relative w-7/12">
                <Image src="/not-found.svg" alt="Not Found" className="mx-auto" fill />
            </div>
        </div>
    );
}
