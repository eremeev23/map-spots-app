import Vue from "vue";
import Toast from "vue-toastification";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import yandexMap from "./plugins/yandex-map";
import "./assets/styles/index.scss";
import "vue-toastification/dist/index.css";

Vue.use(Toast);

Vue.config.productionTip = false;

new Vue({
  yandexMap,
  router,
  store,
  vuetify,
  Toast,
  render: (h) => h(App),
}).$mount("#app");
