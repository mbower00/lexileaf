import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// using code from https://stackoverflow.com/questions/39438094/best-way-to-have-global-css-in-vuejs
import "./assets/css/main.css";

createApp(App).use(router).mount("#app");
