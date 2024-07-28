import { registerWithCredentials } from '@/actions/userActions';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState(false);

    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState<{ [x: string]: string } | void>();

    return (
        <form
            className="flex flex-col gap-4"
            action={async (formData: FormData) => {
                const result = await registerWithCredentials(formData);
                setErrors(result);
            }}
        >
            <div>
                <input
                    type="email"
                    name="email"
                    className={cn(
                        'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none',
                        errors?.email && 'border-rose-500'
                    )}
                    placeholder="Имейл"
                    required
                />
                {errors?.email && <p className="font-semibold text-xs mt-1 text-rose-500">{errors.email}</p>}
            </div>
            <div>
                <input
                    type="text"
                    name="username"
                    className={cn(
                        '"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"',
                        errors?.email && 'border-rose-500'
                    )}
                    placeholder="Потребителско Име"
                    required
                />
                {errors?.username && <p className="font-semibold text-xs mt-1 text-rose-500">{errors.username}</p>}
            </div>
            <div className="relative">
                <div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => {
                            setShowEyeIcon(!!e.target.value.length);
                            setPassword(e.target.value);
                        }}
                        name="password"
                        value={password}
                        placeholder="Парола"
                        className={cn(
                            '"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"',
                            errors?.email && 'border-rose-500'
                        )}
                        required
                    />
                    {errors?.password && <p className="font-semibold text-xs mt-1 text-rose-500">{errors.password}</p>}
                </div>
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

            <div className="relative">
                <div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setShowEyeIcon(!!e.target.value.length)}
                        name="confirm_password"
                        placeholder="Повтори паролата"
                        className={cn(
                            '"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"',
                            errors?.email && 'border-rose-500'
                        )}
                        required
                    />
                    {errors?.confirm_password && (
                        <p className="font-semibold text-xs mt-1 text-rose-500">{errors.confirm_password}</p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="w-full text-black bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Регистрация
            </button>
        </form>
    );
};
