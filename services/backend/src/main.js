import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import VueStarRating from 'vue-star-rating'


import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;

Vue.use(Buefy)
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('star-rating', VueStarRating);

Vue.use(Vuex);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
