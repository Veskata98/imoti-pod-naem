'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowRightToLine } from 'lucide-react';

export const LoginRedirectBtn = () => {
    const [showArrow, setShowArrow] = useState(false);

    return (
        <Link
            href="/auth"
            className="flex gap-1 items-center relative font-semibold"
            onMouseEnter={() => setShowArrow(true)}
            onMouseLeave={() => setShowArrow(false)}
        >
            Вход
            <span
                className={`hidden lg:block absolute -right-5 transition-opacity duration-300 ${
                    showArrow ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <ArrowRightToLine className="w-4 h-4" />
            </span>
        </Link>
    );
};
