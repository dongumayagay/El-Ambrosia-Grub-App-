/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'brand-red': '#a90003',
				'brand-maroon': '#4b200b',
				'brand-tan': '#f7dd9d'
			},
			animation: {
				side2side: 'side2side 1s infinite'
			},
			keyframes: {
				side2side: {
					'0%, 100%': {
						transform: 'translateX(20%)',
						animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
					},
					'50%': {
						transform: 'translateX(0%)',
						animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
					}
				}
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
