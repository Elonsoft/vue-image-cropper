import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
