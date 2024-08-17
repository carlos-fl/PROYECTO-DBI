import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Cookies from 'js-cookie'

router.beforeEach((to, from, next) => {
  const jwt = Cookies.get('access_token'); // Get the JWT from cookies
  if (to.meta.requiresAuth && !jwt) {
    // If route requires auth and JWT is not present, redirect to login
    next('/gerente/login');
  } else {
    // Otherwise, proceed as normal
    next();
  }
});

const app = createApp(App)
app.use(router)
app.mount('#app')
