import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import BoleteriaView from '../views/BoleteriaView.vue';
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView 
   // redirect: '/login'
  },
  {
    path: '/gerente/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/:name/:id',
    name: 'Proyeccion'
  },
  {
    path: '/boleteria',
    name: 'Boleteria',
    component: BoleteriaView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
