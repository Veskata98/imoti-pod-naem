import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState(false);

    const [password, setPassword] = useState('');

    const [error, setError] = useState<boolean>(false);

    return (
        <form
            className="flex flex-col gap-4"
            action={async (formData: FormData) => {
                const result = await signIn('credentials', {
                    username: formData.get('username'),
                    password: formData.get('password'),
                    redirect: false,
                });

                if (result?.error) {
                    setError(true);
                } else {
                    router.replace('/');
                    router.refresh();
                }
            }}
        >
            {error && <p className="font-semibold text-xs mb-1 text-rose-500">Грешни данни за вход</p>}
            <input
                type="text"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                placeholder="Имейл/Потребителско Име"
                required
            />
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                        setShowEyeIcon(!!e.target.value.length);
                        setPassword(e.target.value);
                    }}
                    name="password"
                    value={password}
                    placeholder="Парола"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                            rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5 focus:outline-none`}
                    required
                />

                {/* Show password button */}
                <button
                    type="button"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className={`absolute right-0 top-3 flex items-center px-2 focus:outline-none ${
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
                className="w-full text-black bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Влизане
            </button>
        </form>
    );
};
