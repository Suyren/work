import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import { createPinia } from "pinia";
import "./index.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faChevronLeft, 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChevronLeft);

const pinia = createPinia();
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia).mount("#app");
