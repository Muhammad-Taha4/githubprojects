/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2ea4d5',
                'primary-dark': '#1a9cc9',
                'primary-darker': '#1a3356',
                navy: '#1a3356',
                'navy-light': '#1e3a5f',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
