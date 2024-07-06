import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    '50': '#f0f9ff', // Light sky blue
                    '100': '#e0f2fe', // Light sky blue
                    '200': '#bae6fd', // Light sky blue
                    '300': '#7dd3fc', // Light sky blue
                    '400': '#38bdf8', // Light sky blue
                    '500': '#0ea5e9', // Sky blue
                    '600': '#0284c7', // Sky blue
                    '700': '#0369a1', // Darker sky blue
                    '800': '#075985', // Darker sky blue
                    '900': '#0c4a6e', // Dark sky blue
                    '950': '#082f49', // Very dark sky blue
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
export default config;
