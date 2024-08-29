import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				navBackground: 'var(--background-nav-light)',
				brandBlue: 'var(--brand-blue)'
			},
			spacing: {
        'nav-height': 'var(--nav-height)',
      },
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
