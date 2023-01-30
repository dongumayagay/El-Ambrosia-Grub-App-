/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'brand-red': '#a90003',
				'brand-maroon': '#4b200b',
				'brand-tan': '#f7dd9d'
			}
		}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#A90003',
					secondary: '#4b200b',
					accent: '#f7dd9d',
					neutral: '#000000',
					'base-100': '#FFFFFF',
					info: '#0070F3',
					success: '#21CC51',
					warning: '#FF6154',
					error: '#DE1C8D'
				}
			}
		]
	},

	plugins: [require('daisyui'), require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
