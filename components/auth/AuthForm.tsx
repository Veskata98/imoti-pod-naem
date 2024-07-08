'use client';

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { GoogleBtn } from './GoogleBtn';

export const AuthForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showEyeIcon, setShowEyeIcon] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const toggleAuthMode = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
    };

    return (
        <section className="flex-1 w-full h-full">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-6 sm:p-8">
                        <div className="flex justify-center mb-8">
                            <div className="relative w-full">
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className={`flex-1 py-2 ${isLogin ? 'font-bold' : ''}`}
                                        onClick={toggleAuthMode}
                                    >
                                        Влизане
                                    </button>
                                    <button
                                        type="button"
                                        className={`flex-1 py-2 ${!isLogin ? 'font-bold' : ''}`}
                                        onClick={toggleAuthMode}
                                    >
                                        Регистрация
                                    </button>
                                </div>
                                <div
                                    className={`absolute top-full mt-1 h-1 bg-primary-500 transition-transform duration-300 ${
                                        isLogin ? 'translate-x-0' : 'translate-x-full'
                                    }`}
                                    style={{ width: '50%' }}
                                />
                            </div>
                        </div>
                        <form className="space-y-4 md:space-y-6">
                            {!isLogin && (
                                <input
                                    type="text"
                                    name="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                                    placeholder="Потребителско Име"
                                    required
                                />
                            )}

                            <input
                                type="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                                placeholder="Имейл/Потребителско Име"
                                required
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setShowEyeIcon(!!e.target.value.length)}
                                    name="password"
                                    placeholder="Парола"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prevState) => !prevState)}
                                    className={`absolute right-0 top-10 flex items-center px-2 focus:outline-none ${
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
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                {isLogin ? 'Влизане' : 'Регистрация'}
                            </button>
                        </form>
                        <div className="flex justify-center">
                            <GoogleBtn />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
