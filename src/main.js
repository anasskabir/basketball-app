import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faMapLocation,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

library.add(faMapLocation, faLocationDot);

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component("FaIcon", FontAwesomeIcon);
app.mount("#app");
