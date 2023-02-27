import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { initDirective } from "@/directive";
import "./index.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faGripHorizontal,
  faList,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGripHorizontal);
library.add(faList);
library.add(faTimes);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faAngleDoubleLeft);
library.add(faAngleDoubleRight);
library.add(faHeart);


const pinia = createPinia();
const app = createApp(App);
initDirective(app);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia).use(router).mount("#app");
