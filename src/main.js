import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import styles from "./global-styles.css";
import routes from "./routes.js";
import appStore from "./store.js";
import App from "./App.vue";
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({ routes });
const store = new Vuex.Store(appStore);

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
