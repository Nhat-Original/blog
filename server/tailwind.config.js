/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

module.exports = {
	content: ['./src/views/**/*.ejs'],
	theme: {
		extend: {
			colors: {
				primary: colors.neutral[300],
			},
		},
	},
	plugins: [
		{
			tailwindcss: {},
			autoprefixer: {},
		},
	],
};
