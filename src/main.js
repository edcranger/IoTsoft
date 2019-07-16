import Vue from "vue";

import './plugins/fontawesome'
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import { fb } from "./firebase";

Vue.config.productionTip = false;

let app = "";

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
