import Vue from "vue";
import Vuetify from "vuetify";
import ElementUI from "element-ui";
import VModal from "vue-js-modal";

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "vuetify/dist/vuetify.min.css";
import './element-ui-custom-theme/index.css'
import "@fortawesome/fontawesome-free/css/brands.min.css";

Vue.use(Vuetify, {
  iconfont: "fa"
});
Vue.use(ElementUI);
Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
