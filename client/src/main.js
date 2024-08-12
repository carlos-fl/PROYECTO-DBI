import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

/* 
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    next("/gerente/login");
  } else {
    next();
  }
});
 */
const app = createApp(App)
app.use(router)
app.mount('#app')