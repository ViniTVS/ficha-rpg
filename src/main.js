import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import firebase from "firebase";
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDctS1yKuoATlqNI_aK1WNr1kfrSZxpCgE",
	authDomain: "ficha-rpg-791e9.firebaseapp.com",
	projectId: "ficha-rpg-791e9",
	storageBucket: "ficha-rpg-791e9.appspot.com",
	messagingSenderId: "955667387266",
	appId: "1:955667387266:web:f362bf298085f59fe4359b",
	measurementId: "G-YJMRHH7QHN"
  };


firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false;
Vue.prototype.$teste = 'My App';

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
