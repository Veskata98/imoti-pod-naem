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
                    '50': '#fdfdf0', // Very light yellow
                    '100': '#fcfcd9', // Light yellow
                    '200': '#fafab3', // Light yellow
                    '300': '#f7f78d', // Light yellow
                    '400': '#f5f568', // Yellow
                    '500': '#f0f0d0', // Base yellow (original color)
                    '600': '#d3d3a3', // Slightly darker yellow
                    '700': '#b7b778', // Darker yellow
                    '800': '#9b9b50', // Dark yellow
                    '900': '#7f7f2d', // Very dark yellow
                    '950': '#666619', // Extremely dark yellow
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
