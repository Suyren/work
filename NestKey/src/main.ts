import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlus);
library.add(faMinus);


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");
