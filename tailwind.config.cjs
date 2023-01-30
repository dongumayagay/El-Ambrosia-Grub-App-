/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'brand-red': '#a80103',
				'brand-maroon': '#4b200b',
				'brand-tan': '#f7dd9d'
			}
		}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
