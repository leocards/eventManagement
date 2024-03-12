import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                open: ['Open Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'medium-blue': 'var(--medium-slate-blue)',
                'lavender-web': 'var(--lavender-web)',
                'ultra-violet': 'var(--ultra-violet)',
                'white-smoke': 'var(--white-smoke)',
                'timberwolf': 'var(--timberwolf)',
                'platinum': 'var(--platinum)',
                'ghost-white': 'var(--ghost-white)',
            },
            screens: {
                'min-md': {'min': '940px'},
                'max-md': {'max': '1023px'},
                'mm-md': {'min': '940px', 'max': '1023px'},
                'min-lg': '1200px',//{'min':'1200px'},
            }
        },
    },

    plugins: [],
};
