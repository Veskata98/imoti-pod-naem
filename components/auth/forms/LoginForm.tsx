import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';
import Spinner from '@/components/Spinner';

export const LoginForm = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setButtonDisabled(true);
        const result = await signIn('credentials', {
            username: formData.get('username'),
            password: formData.get('password'),
            redirect: false,
        });
        setButtonDisabled(false);

        if (result?.error) {
            setError(true);
        } else {
            router.replace('/');
            router.refresh();
        }
    };

    return (
        <form className="flex flex-col gap-4 text-sm" onSubmit={(e) => handleSubmit(e)}>
            {/* Show message if there is server error */}
            {error && <p className="font-semibold text-xs mb-1 text-rose-500">Грешни данни за вход</p>}

            {/* Input field for username/email */}
            <input
                type="text"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                placeholder="Имейл/Потребителско Име"
                required
            />
            <div className="relative">
                {/* Input field for password */}
                <input
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                        setShowEyeIcon(!!e.target.value.length);
                    }}
                    name="password"
                    placeholder="Парола"
                    className={`bg-gray-50 border border-gray-300 text-gray-900
                            rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5 focus:outline-none`}
                    required
                />

                {/* Toggle password visibility button */}
                <button
                    type="button"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className={`absolute right-0 top-[13px] flex items-center px-2 focus:outline-none ${
                        !showEyeIcon && 'hidden'
                    }`}
                >
                    {showPassword ? (
                        <Eye className="w-5 h-5 text-[#22c55e]" />
                    ) : (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                </button>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={buttonDisabled}
                className={cn(
                    `w-full text-black bg-primary-500
                hover:bg-primary-600 focus:ring-4
                focus:outline-none focus:ring-primary-300
                font-medium rounded-lg text-sm px-5 py-2.5
                text-center`,
                    buttonDisabled &&
                        `bg-zinc-200 hover:bg-zinc-200
                    focus:ring-0`
                )}
            >
                {buttonDisabled ? <Spinner /> : 'Влизане'}
            </button>
        </form>
    );
};
