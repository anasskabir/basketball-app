// Importing the main CSS file for global styles.
import "./assets/main.css";

// Importing core Vue functionality and Pinia for state management.
import { createApp } from "vue";
import { createPinia } from "pinia";

// Importing the main App component and the Vue router.
import App from "./App.vue";
import router from "./router";

// FontAwesome imports for SVG icons.
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Import specific FontAwesome icons to be used across the application.
import {
  faMapLocation,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

// Adding the imported icons to the FontAwesome library.
library.add(faMapLocation, faLocationDot);

// Creating the Vue application instance with the App component.
const app = createApp(App);

// Creating a Pinia instance for state management.
const pinia = createPinia();

// Registering Pinia and router as plugins to be used with the Vue app.
app.use(pinia);
app.use(router);

// Registering FontAwesomeIcon as a global component, which can be used in any Vue component.
app.component("FaIcon", FontAwesomeIcon);

// Mounting the Vue app to the DOM element with the id 'app'.
app.mount("#app");
