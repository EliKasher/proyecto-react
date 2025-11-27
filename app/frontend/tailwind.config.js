export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        function({ addBase }) {
        addBase({
            'button:focus': {
            outline: 'none',
            boxShadow: 'none',
            },
            'button:focus-visible': {
            outline: '2px solid #3b82f6',
            outlineOffset: '2px',
            },
        })
        },
        require('tailwind-scrollbar')({ nocompatible: true }),
    ],
    }