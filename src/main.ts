import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { initDirective } from "@/directive";

import "./index.css";

const pinia = createPinia();
const app = createApp(App);
initDirective(app);
app.use(pinia).use(router).mount("#app");
