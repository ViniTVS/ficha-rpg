import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		dark: true,
		themes: {
			options: {
				customProperties: true
			},
			light: {
				primary: colors.deepPurple.accent2,
				secondary: '#b0bec5',
				accent: '#8c9eff',
				error: '#b71c1c',
				background: '#ffffff',
				realce: colors.green.darken1
			},
			dark: {
				primary: colors.deepPurple.darken1,
				secondary: '#b0bec5',
				accent: '#8c9eff',
				error: '#b71c1c',
				background: '#222',
				realce: colors.green.darken1
			},
		},
	},

})