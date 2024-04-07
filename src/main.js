import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { PiniaUndo } from "pinia-undo";

import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

pinia.use(PiniaUndo);

app.use(pinia);

app.mount("#app");
