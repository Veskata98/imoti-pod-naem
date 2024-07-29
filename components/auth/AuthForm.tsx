'use client';

import { useState } from 'react';

import { GoogleBtn } from './GoogleBtn';

import { LoginForm } from './forms/LoginForm';
import { RegisterForm } from './forms/RegisterForm';

export const AuthForm = () => {
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
                                    className={`absolute top-full mt-1 h-1 bg-primary-600 transition-transform duration-300 ${
                                        isLogin ? 'translate-x-0' : 'translate-x-full'
                                    }`}
                                    style={{ width: '50%' }}
                                />
                            </div>
                        </div>

                        {isLogin ? <LoginForm /> : <RegisterForm />}

                        <div className="flex justify-center">
                            <GoogleBtn />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
